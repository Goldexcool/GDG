import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Activity from '@/models/Activity';
import { getCurrentUser } from '@/lib/jwt';

export async function GET() {
  try {
    // Check authentication
    const currentUserData = await getCurrentUser();
    if (!currentUserData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Get user data
    const user = await User.findById(currentUserData.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's activities to calculate stats
    const todayActivities = await Activity.find({
      userId: currentUserData.userId,
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    });

    // Calculate today's stats
    const workoutsToday = todayActivities.filter(a => a.type === 'workout').length;
    const mealsToday = todayActivities.filter(a => a.type === 'meal').length;
    const mindfulnessToday = todayActivities.filter(a => a.type === 'mindfulness');
    const mindfulnessMinutes = mindfulnessToday.reduce((total, activity) => total + (activity.duration || 0), 0);
    const pointsToday = todayActivities.reduce((total, activity) => total + (activity.pointsEarned || 0), 0);

    // Simple goals calculation (basic daily targets)
    const dailyGoals = {
      workouts: 1,
      meals: 3,
      mindfulness: 10, // minutes
    };

    let goalsCompleted = 0;
    const totalGoals = 3;

    if (workoutsToday >= dailyGoals.workouts) goalsCompleted++;
    if (mealsToday >= dailyGoals.meals) goalsCompleted++;
    if (mindfulnessMinutes >= dailyGoals.mindfulness) goalsCompleted++;

    // Calculate streak (simplified)
    let currentStreak = 0;
    const lastSevenDays = 7;
    
    for (let i = 0; i < lastSevenDays; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const nextDay = new Date(checkDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      const dayActivities = await Activity.find({
        userId: currentUserData.userId,
        createdAt: {
          $gte: checkDate,
          $lt: nextDay
        }
      });
      
      if (dayActivities.length > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Update user's current streak and longest streak
    if (currentStreak > user.currentStreak) {
      user.currentStreak = currentStreak;
      if (currentStreak > user.longestStreak) {
        user.longestStreak = currentStreak;
      }
      await user.save();
    }

    const stats = {
      user: {
        totalPoints: user.totalPoints || 0,
        currentStreak: user.currentStreak || 0,
        longestStreak: user.longestStreak || 0,
        level: user.level || 1,
      },
      today: {
        goalsCompleted: goalsCompleted,
        totalGoals: totalGoals,
        workoutsCompleted: workoutsToday,
        mealsLogged: mealsToday,
        mindfulnessMinutes: mindfulnessMinutes,
        waterGlasses: 0, // Can be added later
        pointsEarned: pointsToday,
      }
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
