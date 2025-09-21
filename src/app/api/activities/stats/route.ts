import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Activity from '@/models/Activity';
import { getCurrentUser } from '@/lib/jwt';

export async function GET() {
  try {
    const currentUserData = await getCurrentUser();
    
    if (!currentUserData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Get activity counts and stats for each type
    const activityTypes = ['workout', 'meal', 'mindfulness'];
    const stats = [];

    for (const type of activityTypes) {
      const activities = await Activity.find({ userId: currentUserData.userId, type }).sort({ date: -1 });
      
      const lastActivity = activities.length > 0 ? activities[0].date : null;
      const totalPoints = activities.reduce((sum, activity) => sum + (activity.pointsEarned || 0), 0);

      stats.push({
        type,
        count: activities.length,
        lastActivity,
        totalPoints,
      });
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching activity stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
