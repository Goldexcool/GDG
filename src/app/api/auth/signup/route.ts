import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { generateAccessToken, generateRefreshToken, TOKEN_EXPIRY } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { email, password, firstName, lastName } = await request.json();

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = new User({
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
    });

    await user.save();

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: 'user',
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      tokenVersion: 1,
    });

    // Create response
    const response = NextResponse.json(
      {
        message: 'Account created successfully',
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
      { status: 201 }
    );

    // Set HTTP-only cookies
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: TOKEN_EXPIRY.ACCESS_TOKEN / 1000, // Convert to seconds
      path: '/',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: TOKEN_EXPIRY.REFRESH_TOKEN / 1000, // Convert to seconds
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    
    if (error instanceof Error) {
      // Handle validation errors
      if (error.message.includes('validation failed')) {
        return NextResponse.json(
          { message: 'Invalid input data' },
          { status: 400 }
        );
      }
      
      // Handle duplicate key error
      if (error.message.includes('duplicate key')) {
        return NextResponse.json(
          { message: 'User with this email already exists' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
