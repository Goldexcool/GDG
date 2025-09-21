'use client';

import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Heart, 
  Target, 
  Zap, 
  TrendingUp, 
  Plus,
  Award,
  Activity,
  Apple,
  Brain,
  Droplets,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import WorkoutModal from '@/components/modals/WorkoutModal';
import MealModal from '@/components/modals/MealModal';
import MindfulnessModal from '@/components/modals/MindfulnessModal';

// Type definitions for modal data
interface WorkoutData {
  title: string;
  workoutType: string;
  duration: number;
  intensity: string;
  calories?: number;
  notes?: string;
  type?: string;
}

interface MealData {
  title: string;
  mealType: string;
  calories?: number;
  nutrition?: {
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
  };
  notes?: string;
  type?: string;
}

interface MindfulnessData {
  title: string;
  meditationType: string;
  duration: number;
  mood?: number;
  notes?: string;
  type?: string;
}

interface WellnessStats {
  user: {
    totalPoints: number;
    currentStreak: number;
    longestStreak: number;
    level: number;
  };
  today: {
    goalsCompleted: number;
    totalGoals: number;
    workoutsCompleted: number;
    mealsLogged: number;
    mindfulnessMinutes: number;
    waterGlasses: number;
    pointsEarned: number;
  };
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState<WellnessStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  
  // Modal states
  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);
  const [mealModalOpen, setMealModalOpen] = useState(false);
  const [mindfulnessModalOpen, setMindfulnessModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      redirect('/login');
      return;
    }
    
    if (!loading && user) {
      fetchStats();
    }
  }, [loading, user]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Validate data structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data received from API');
      }
      
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      
      // Set default stats on error
      setStats({
        user: {
          totalPoints: 0,
          currentStreak: 0,
          longestStreak: 0,
          level: 1,
        },
        today: {
          goalsCompleted: 0,
          totalGoals: 3,
          workoutsCompleted: 0,
          mealsLogged: 0,
          mindfulnessMinutes: 0,
          waterGlasses: 0,
          pointsEarned: 0,
        }
      });
      
      toast.error('Unable to load stats. Using default values.', {
        duration: 3000,
      });
    } finally {
      setStatsLoading(false);
    }
  };

  const handleActivitySubmit = async (activityData: WorkoutData | MealData | MindfulnessData) => {
    toast.loading('Saving your activity...', { id: 'activity-submit' });
    
    try {
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
      });

      if (response.ok) {
        // Close modals
        setWorkoutModalOpen(false);
        setMealModalOpen(false);
        setMindfulnessModalOpen(false);
        
        // Show success toast
        toast.success('Activity logged successfully! 🎉', { 
          id: 'activity-submit',
          duration: 3000,
        });
        
        // Refresh stats after successful submission
        fetchStats();
      } else {
        throw new Error('Failed to save activity');
      }
    } catch (error) {
      console.error('Error submitting activity:', error);
      toast.error('Failed to save activity. Please try again.', { 
        id: 'activity-submit',
        duration: 4000,
      });
    }
  };

  if (loading || statsLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-[#285E67] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your wellness dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // This will be handled by the redirect in useEffect
  }

  const progressPercentage = (stats?.today.totalGoals ?? 0) > 0 
    ? ((stats?.today.goalsCompleted ?? 0) / (stats?.today.totalGoals ?? 1)) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#333',
            border: '1px solid #ddd',
            borderRadius: '8px',
          },
          success: {
            style: {
              background: '#285E67',
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#fff',
            },
          },
        }}
      />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
              <p className="text-gray-600 mt-1">Ready to continue your wellness journey?</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Points</p>
                <p className="text-2xl font-bold text-[#285E67]">{stats?.user.totalPoints || 0}</p>
              </div>
              <div className="w-12 h-12 bg-[#285E67] rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Daily Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#285E67] rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-[#285E67] bg-[#285E67]/10 px-2 py-1 rounded-full">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Daily Goals</h3>
            <p className="text-2xl font-bold text-gray-900">
              {stats?.today.goalsCompleted || 0}/{stats?.today.totalGoals || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Complete</p>
          </div>

          {/* Current Streak */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Current Streak</h3>
            <p className="text-2xl font-bold text-gray-900">{stats?.user.currentStreak || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Days</p>
          </div>

          {/* Level */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                Level {stats?.user.level || 1}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Wellness Level</h3>
            <p className="text-2xl font-bold text-gray-900">{stats?.user.level || 1}</p>
            <p className="text-sm text-gray-500 mt-1">Keep growing!</p>
          </div>

          {/* Today's Points */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B35] to-[#FF007F] rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <Plus className="w-5 h-5 text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Today&apos;s Points</h3>
            <p className="text-2xl font-bold text-gray-900">{stats?.today.pointsEarned || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Earned</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Today&apos;s Activities</h2>
                <Link
                  href="/logs"
                  className="text-[#285E67] hover:text-[#285E67]/80 font-medium text-sm flex items-center px-3 py-1.5 bg-[#285E67]/10 rounded-lg transition-colors"
                >
                  View All Logs <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-[#285E67]/10 to-[#285E67]/20 rounded-xl">
                  <Activity className="w-8 h-8 text-[#285E67] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#285E67]">{stats?.today.workoutsCompleted || 0}</p>
                  <p className="text-sm text-[#285E67]/70">Workouts</p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <Apple className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-900">{stats?.today.mealsLogged || 0}</p>
                  <p className="text-sm text-orange-700">Meals</p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
                  <Brain className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-pink-900">{stats?.today.mindfulnessMinutes || 0}</p>
                  <p className="text-sm text-pink-700">Mindful min</p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-[#285E67]/10 to-[#285E67]/20 rounded-xl">
                  <Droplets className="w-8 h-8 text-[#285E67] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#285E67]">{stats?.today.waterGlasses || 0}</p>
                  <p className="text-sm text-[#285E67]/70">Water</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <QuickActionButton
                  icon={<Activity className="w-5 h-5" />}
                  title="Log Workout"
                  description="Track your exercise"
                  color="primary"
                  onClick={() => setWorkoutModalOpen(true)}
                />
                <QuickActionButton
                  icon={<Apple className="w-5 h-5" />}
                  title="Log Meal"
                  description="Record nutrition"
                  color="orange"
                  onClick={() => setMealModalOpen(true)}
                />
                <QuickActionButton
                  icon={<Brain className="w-5 h-5" />}
                  title="Mindfulness"
                  description="Start meditation"
                  color="pink"
                  onClick={() => setMindfulnessModalOpen(true)}
                />
              </div>
            </div>

            {/* View Logs */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">View Activity Logs</h2>
              <div className="space-y-3">
                <Link
                  href="/logs/workouts"
                  className="flex items-center p-3 rounded-xl bg-[#285E67]/10 hover:bg-[#285E67]/20 transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#285E67] rounded-lg flex items-center justify-center mr-3">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Workout History</p>
                    <p className="text-sm text-gray-600">View all workouts</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#285E67] transition-colors" />
                </Link>

                <Link
                  href="/logs/meals"
                  className="flex items-center p-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors group"
                >
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <Apple className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Meal History</p>
                    <p className="text-sm text-gray-600">View nutrition logs</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </Link>

                <Link
                  href="/logs/mindfulness"
                  className="flex items-center p-3 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors group"
                >
                  <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Mindfulness History</p>
                    <p className="text-sm text-gray-600">View meditation logs</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <WorkoutModal
        isOpen={workoutModalOpen}
        onClose={() => setWorkoutModalOpen(false)}
        onSubmit={handleActivitySubmit}
      />
      <MealModal
        isOpen={mealModalOpen}
        onClose={() => setMealModalOpen(false)}
        onSubmit={handleActivitySubmit}
      />
      <MindfulnessModal
        isOpen={mindfulnessModalOpen}
        onClose={() => setMindfulnessModalOpen(false)}
        onSubmit={handleActivitySubmit}
      />
    </div>
  );
}

interface QuickActionButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'primary' | 'orange' | 'pink';
  onClick: () => void;
}

function QuickActionButton({ icon, title, description, color, onClick }: QuickActionButtonProps) {
  const colorClasses = {
    primary: 'bg-[#285E67]/10 hover:bg-[#285E67]/20 text-[#285E67] border-[#285E67]/20',
    orange: 'bg-orange-50 hover:bg-orange-100 text-orange-900 border-orange-200',
    pink: 'bg-pink-50 hover:bg-pink-100 text-pink-900 border-pink-200',
  };

  const iconClasses = {
    primary: 'bg-[#285E67]/20 text-[#285E67]',
    orange: 'bg-orange-100 text-orange-600',
    pink: 'bg-pink-100 text-pink-600',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl transition-all duration-200 border ${colorClasses[color]} hover:shadow-md`}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconClasses[color]}`}>
          {icon}
        </div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm opacity-75">{description}</div>
        </div>
      </div>
    </button>
  );
}
