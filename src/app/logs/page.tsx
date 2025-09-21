'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Apple, 
  Brain, 
  ArrowRight,
  TrendingUp,
  Target,
  Clock
} from 'lucide-react';

interface ActivityStats {
  type: string;
  count: number;
  lastActivity: string;
  totalPoints: number;
}

export default function LogsOverview() {
  const { isLoaded, isSignedIn } = useUser();
  const [stats, setStats] = useState<ActivityStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/sign-in');
      return;
    }
    
    if (isLoaded && isSignedIn) {
      fetchActivityStats();
    }
  }, [isLoaded, isSignedIn]);

  const fetchActivityStats = async () => {
    try {
      const response = await fetch('/api/activities/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching activity stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#285E67]"></div>
      </div>
    );
  }

  const activityTypes = [
    {
      type: 'workout',
      title: 'Workouts',
      description: 'View all your workout sessions',
      icon: Activity,
      color: 'bg-[#285E67]',
      lightColor: 'bg-[#285E67]/10',
      href: '/logs/workouts'
    },
    {
      type: 'meal',
      title: 'Meals',
      description: 'Track your nutrition logs',
      icon: Apple,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      href: '/logs/meals'
    },
    {
      type: 'mindfulness',
      title: 'Mindfulness',
      description: 'Review meditation sessions',
      icon: Brain,
      color: 'bg-pink-500',
      lightColor: 'bg-pink-50',
      href: '/logs/mindfulness'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
                <p className="mt-2 text-gray-600">View and manage all your wellness activities</p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {activityTypes.map((activity) => {
            const stat = stats.find(s => s.type === activity.type);
            const Icon = activity.icon;
            
            return (
              <div key={activity.type} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${activity.lightColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${activity.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{stat?.count || 0}</div>
                    <div className="text-sm text-gray-500">Total Logs</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{activity.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{activity.description}</p>
                
                {stat?.lastActivity && (
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    Last: {new Date(stat.lastActivity).toLocaleDateString()}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="w-4 h-4 mr-1" />
                    {stat?.totalPoints || 0} points
                  </div>
                  <Link
                    href={activity.href}
                    className={`inline-flex items-center px-3 py-1.5 ${activity.color} text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Activity Overview</h2>
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              Last 30 days
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activityTypes.map((activity) => {
              const stat = stats.find(s => s.type === activity.type);
              const Icon = activity.icon;
              
              return (
                <Link
                  key={activity.type}
                  href={activity.href}
                  className="group p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all hover:shadow-sm"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 ${activity.lightColor} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <Icon className={`w-5 h-5 ${activity.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {stat?.count || 0} entries logged
                      </p>
                      {stat?.totalPoints && (
                        <p className="text-xs text-gray-400 mt-1">
                          {stat.totalPoints} points earned
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
