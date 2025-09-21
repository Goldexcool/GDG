import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  getRefreshTokenFromCookies,
  TOKEN_EXPIRY,
} from '@/lib/jwt';

export async function POST() {
  try {
    await connectToDatabase();

    // Get refresh token from cookies
    const refreshToken = await getRefreshTokenFromCookies();
    if (!refreshToken) {
      return NextResponse.json(
        { message: 'Refresh token not found' },
        { status: 401 }
      );
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json(
        { message: 'Invalid refresh token' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: 'user',
    });

    const newRefreshToken = generateRefreshToken({
      userId: user._id.toString(),
      tokenVersion: payload.tokenVersion + 1, // Increment version
    });

    // Create response
    const response = NextResponse.json(
      {
        message: 'Tokens refreshed successfully',
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.getFullName(),
          totalPoints: user.totalPoints,
          level: user.level,
          currentStreak: user.currentStreak,
          longestStreak: user.longestStreak,
          isEmailVerified: user.isEmailVerified,
        },
      },
      { status: 200 }
    );

    // Set new HTTP-only cookies
    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: TOKEN_EXPIRY.ACCESS_TOKEN / 1000,
      path: '/',
    });

    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: TOKEN_EXPIRY.REFRESH_TOKEN / 1000,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
