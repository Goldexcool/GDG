import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import DailyStats from '@/models/DailyStats';
import UserProfile from '@/models/UserProfile';
import WellnessGoal from '@/models/WellnessGoal';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');

    await connectToDatabase();

    // Get user profile for basic stats
    const userProfile = await UserProfile.findOne({ clerkUserId: userId });
    
    // Get recent daily stats
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    
    const dailyStats = await DailyStats.find({
      userId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    // Get active goals
    const activeGoals = await WellnessGoal.find({
      userId,
      status: 'active'
    });

    // Calculate today's progress
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayStats = await DailyStats.findOne({ userId, date: today });
    
    // Calculate goals completed today
    let goalsCompletedToday = 0;
    const totalActiveGoals = activeGoals.length;
    
    for (const goal of activeGoals) {
      if (goal.isDaily) {
        const todayProgress = todayStats ? getTodayProgressForGoal(goal, todayStats) : 0;
        if (todayProgress >= goal.targetValue) {
          goalsCompletedToday++;
        }
      }
    }

    // Calculate current streak
    let currentStreak = 0;
    const sortedStats = dailyStats.sort((a, b) => b.date.getTime() - a.date.getTime());
    
    for (let i = 0; i < sortedStats.length; i++) {
      if (sortedStats[i].goalsCompleted > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    const stats = {
      user: {
        totalPoints: userProfile?.totalPoints || 0,
        currentStreak: currentStreak,
        longestStreak: userProfile?.longestStreak || 0,
        level: userProfile?.level || 1,
      },
      today: {
        goalsCompleted: goalsCompletedToday,
        totalGoals: totalActiveGoals,
        workoutsCompleted: todayStats?.workoutsCompleted || 0,
        mealsLogged: todayStats?.mealsLogged || 0,
        mindfulnessMinutes: todayStats?.mindfulnessMinutes || 0,
        waterGlasses: todayStats?.waterGlasses || 0,
        pointsEarned: todayStats?.pointsEarned || 0,
      },
      trends: dailyStats.map(stat => ({
        date: stat.date,
        pointsEarned: stat.pointsEarned,
        goalsCompleted: stat.goalsCompleted,
        workoutsCompleted: stat.workoutsCompleted,
        mealsLogged: stat.mealsLogged,
        mindfulnessMinutes: stat.mindfulnessMinutes,
      })),
      goals: activeGoals.map(goal => ({
        ...goal.toObject(),
        todayProgress: todayStats ? getTodayProgressForGoal(goal, todayStats) : 0,
      })),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

interface WellnessGoalType {
  category: 'fitness' | 'nutrition' | 'mindfulness' | 'sleep' | 'hydration' | 'weight';
}

interface DailyStatsType {
  workoutsCompleted?: number;
  mealsLogged?: number;
  mindfulnessMinutes?: number;
  waterGlasses?: number;
  sleepHours?: number;
}

function getTodayProgressForGoal(goal: WellnessGoalType, todayStats: DailyStatsType): number {
  switch (goal.category) {
    case 'fitness':
      return todayStats.workoutsCompleted || 0;
    case 'nutrition':
      return todayStats.mealsLogged || 0;
    case 'mindfulness':
      return todayStats.mindfulnessMinutes || 0;
    case 'hydration':
      return todayStats.waterGlasses || 0;
    case 'sleep':
      return todayStats.sleepHours || 0;
    default:
      return 0;
  }
}
