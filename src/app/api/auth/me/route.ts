import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { getCurrentUser } from '@/lib/jwt';

export async function GET() {
  try {
    await connectToDatabase();

    // Get current user from token
    const tokenPayload = await getCurrentUser();
    if (!tokenPayload) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get full user data
    const user = await User.findById(tokenPayload.userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
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
          lastLogin: user.lastLogin,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
