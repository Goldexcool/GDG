import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    let userProfile = await UserProfile.findOne({ clerkUserId: userId });
    
    if (!userProfile) {
      // Get user data from Clerk
      const clerkUser = await currentUser();
      
      // Create default profile if it doesn't exist
      userProfile = new UserProfile({
        clerkUserId: userId,
        email: clerkUser?.emailAddresses?.[0]?.emailAddress || 'user@example.com',
        firstName: clerkUser?.firstName || 'User',
        lastName: clerkUser?.lastName || 'Name',
        profileImage: clerkUser?.imageUrl,
        totalPoints: 0,
        currentStreak: 0,
        longestStreak: 0,
        level: 1,
      });
      await userProfile.save();
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    await connectToDatabase();
    
    const userProfile = await UserProfile.findOneAndUpdate(
      { clerkUserId: userId },
      { ...body, clerkUserId: userId },
      { new: true, upsert: true }
    );

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
