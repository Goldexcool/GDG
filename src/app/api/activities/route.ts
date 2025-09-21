import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Activity from '@/models/Activity';
import UserProfile from '@/models/UserProfile';
import DailyStats from '@/models/DailyStats';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const type = searchParams.get('type');

    await connectToDatabase();

    const query: { userId: string; type?: string } = { userId };
    if (type) {
      query.type = type;
    }

    const activities = await Activity.find(query)
      .sort({ date: -1 })
      .limit(limit);

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    await connectToDatabase();

    // Calculate points based on activity type
    let pointsEarned = 0;
    switch (body.type) {
      case 'workout':
        pointsEarned = Math.min(body.duration || 0, 60) * 2; // 2 points per minute, max 120
        break;
      case 'meal':
        pointsEarned = 10; // 10 points per meal logged
        break;
      case 'mindfulness':
        pointsEarned = (body.duration || 0) * 3; // 3 points per minute
        break;
      case 'sleep':
        pointsEarned = 20; // 20 points for logging sleep
        break;
      case 'hydration':
        pointsEarned = 5; // 5 points per glass
        break;
      default:
        pointsEarned = 5;
    }

    // Create activity
    const activity = new Activity({
      ...body,
      userId,
      pointsEarned,
    });
    await activity.save();

    // Update user points
    await UserProfile.findOneAndUpdate(
      { clerkUserId: userId },
      { $inc: { totalPoints: pointsEarned } }
    );

    // Update daily stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const updateData: {
      $inc: {
        pointsEarned: number;
        workoutsCompleted?: number;
        mealsLogged?: number;
        totalCalories?: number;
        totalProtein?: number;
        totalCarbs?: number;
        totalFat?: number;
        mindfulnessMinutes?: number;
        sleepHours?: number;
        waterGlasses?: number;
      }
    } = {
      $inc: { pointsEarned }
    };

    switch (body.type) {
      case 'workout':
        updateData.$inc.workoutsCompleted = 1;
        break;
      case 'meal':
        updateData.$inc.mealsLogged = 1;
        if (body.calories) updateData.$inc.totalCalories = body.calories;
        if (body.nutrition) {
          updateData.$inc.totalProtein = body.nutrition.protein || 0;
          updateData.$inc.totalCarbs = body.nutrition.carbs || 0;
          updateData.$inc.totalFat = body.nutrition.fat || 0;
        }
        break;
      case 'mindfulness':
        updateData.$inc.mindfulnessMinutes = body.duration || 0;
        break;
      case 'sleep':
        updateData.$inc.sleepHours = body.duration || 0;
        break;
      case 'hydration':
        updateData.$inc.waterGlasses = 1;
        break;
    }

    await DailyStats.findOneAndUpdate(
      { userId, date: today },
      updateData,
      { upsert: true }
    );

    return NextResponse.json(activity);
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ error: 'Activity ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    // Find the existing activity to get the old points
    const existingActivity = await Activity.findOne({ _id, userId });
    if (!existingActivity) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }

    // Calculate new points based on activity type
    let newPointsEarned = 0;
    switch (updateData.type || existingActivity.type) {
      case 'workout':
        newPointsEarned = Math.min(updateData.duration || existingActivity.duration || 0, 60) * 2;
        break;
      case 'meal':
        newPointsEarned = 10;
        break;
      case 'mindfulness':
        newPointsEarned = (updateData.duration || existingActivity.duration || 0) * 3;
        break;
      case 'sleep':
        newPointsEarned = 20;
        break;
      case 'hydration':
        newPointsEarned = 5;
        break;
      default:
        newPointsEarned = 5;
    }

    // Calculate point difference
    const pointsDifference = newPointsEarned - existingActivity.pointsEarned;

    // Update the activity
    const updatedActivity = await Activity.findOneAndUpdate(
      { _id, userId },
      { ...updateData, pointsEarned: newPointsEarned },
      { new: true }
    );

    // Update user points if there's a difference
    if (pointsDifference !== 0) {
      await UserProfile.findOneAndUpdate(
        { clerkUserId: userId },
        { $inc: { totalPoints: pointsDifference } }
      );
    }

    // Update daily stats if needed (this is a simplified approach)
    const activityDate = new Date(existingActivity.date);
    activityDate.setHours(0, 0, 0, 0);
    
    if (pointsDifference !== 0) {
      await DailyStats.findOneAndUpdate(
        { userId, date: activityDate },
        { $inc: { pointsEarned: pointsDifference } }
      );
    }

    return NextResponse.json(updatedActivity);
  } catch (error) {
    console.error('Error updating activity:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const activityId = searchParams.get('id');

    if (!activityId) {
      return NextResponse.json({ error: 'Activity ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    // Find the activity to get its details before deletion
    const activity = await Activity.findOne({ _id: activityId, userId });
    if (!activity) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }

    // Delete the activity
    await Activity.deleteOne({ _id: activityId, userId });

    // Update user points (subtract the points)
    await UserProfile.findOneAndUpdate(
      { clerkUserId: userId },
      { $inc: { totalPoints: -activity.pointsEarned } }
    );

    // Update daily stats
    const activityDate = new Date(activity.date);
    activityDate.setHours(0, 0, 0, 0);
    
    const updateData: {
      $inc: {
        pointsEarned: number;
        workoutsCompleted?: number;
        mealsLogged?: number;
        totalCalories?: number;
        totalProtein?: number;
        totalCarbs?: number;
        totalFat?: number;
        mindfulnessMinutes?: number;
        sleepHours?: number;
        waterGlasses?: number;
      }
    } = {
      $inc: { pointsEarned: -activity.pointsEarned }
    };

    switch (activity.type) {
      case 'workout':
        updateData.$inc.workoutsCompleted = -1;
        break;
      case 'meal':
        updateData.$inc.mealsLogged = -1;
        if (activity.calories) updateData.$inc.totalCalories = -activity.calories;
        if (activity.nutrition) {
          updateData.$inc.totalProtein = -(activity.nutrition.protein || 0);
          updateData.$inc.totalCarbs = -(activity.nutrition.carbs || 0);
          updateData.$inc.totalFat = -(activity.nutrition.fat || 0);
        }
        break;
      case 'mindfulness':
        updateData.$inc.mindfulnessMinutes = -(activity.duration || 0);
        break;
      case 'sleep':
        updateData.$inc.sleepHours = -(activity.duration || 0);
        break;
      case 'hydration':
        updateData.$inc.waterGlasses = -1;
        break;
    }

    await DailyStats.findOneAndUpdate(
      { userId, date: activityDate },
      updateData
    );

    return NextResponse.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
