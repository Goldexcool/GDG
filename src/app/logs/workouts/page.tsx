'use client';

import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  Activity, 
  Clock, 
  Zap, 
  ArrowLeft,
  Filter,
  Search,
  Trash2,
  Edit3
} from 'lucide-react';
import EditWorkoutModal from '@/components/modals/EditWorkoutModal';
import DeleteConfirmModal from '@/components/modals/DeleteConfirmModal';

interface WorkoutActivity {
  _id: string;
  title: string;
  workoutType: string;
  duration: number;
  intensity: string;
  calories?: number;
  notes?: string;
  pointsEarned: number;
  date: string;
  type: string;
}

export default function WorkoutLogs() {
  const { user, loading } = useAuth();
  const [activities, setActivities] = useState<WorkoutActivity[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<WorkoutActivity | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      redirect('/login');
      return;
    }
    
    if (!loading && user) {
      fetchWorkouts();
    }
  }, [loading, user]);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch('/api/activities?type=workout&limit=100');
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      }
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setActivitiesLoading(false);
    }
  };

  const handleEdit = (activity: WorkoutActivity) => {
    setSelectedActivity(activity);
    setEditModalOpen(true);
  };

  const handleDelete = (activity: WorkoutActivity) => {
    setSelectedActivity(activity);
    setDeleteModalOpen(true);
  };

    const handleSaveEdit = async (updatedData: Omit<WorkoutActivity, 'pointsEarned' | 'date'>) => {
    if (!selectedActivity) return;

    try {
      // Create the update payload with the required fields
      const updatePayload = {
        ...updatedData,
        pointsEarned: selectedActivity.pointsEarned, // Keep existing points
        date: selectedActivity.date, // Keep existing date
      };

      const response = await fetch(`/api/activities?id=${selectedActivity._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {
        throw new Error('Failed to update activity');
      }

      // Update the activities list
      setActivities(prevActivities => 
        prevActivities.map(activity => 
          activity._id === selectedActivity._id 
            ? { ...activity, ...updatePayload }
            : activity
        )
      );

      setEditModalOpen(false);
      setSelectedActivity(null);
      toast.success('Workout updated successfully!');
    } catch (error) {
      console.error('Error updating activity:', error);
      toast.error('Failed to update workout. Please try again.');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedActivity) return;
    
    toast.loading('Deleting workout...', { id: 'delete-workout' });
    try {
      const response = await fetch(`/api/activities?id=${selectedActivity._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Workout deleted successfully!', { id: 'delete-workout' });
        setDeleteModalOpen(false);
        setSelectedActivity(null);
        fetchWorkouts(); // Refresh the list
      } else {
        toast.error('Failed to delete workout', { id: 'delete-workout' });
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
      toast.error('Failed to delete workout', { id: 'delete-workout' });
    }
  };

  const workoutTypeIcons: Record<string, string> = {
    cardio: '🏃',
    strength: '💪',
    yoga: '🧘',
    sports: '⚽',
    walking: '🚶',
    cycling: '🚴',
    swimming: '🏊'
  };

  const intensityColors: Record<string, string> = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const filteredActivities = activities
    .filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.workoutType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || activity.workoutType === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'duration':
          return b.duration - a.duration;
        case 'calories':
          return (b.calories || 0) - (a.calories || 0);
        case 'points':
          return b.pointsEarned - a.pointsEarned;
        default:
          return 0;
      }
    });

  const uniqueWorkoutTypes = Array.from(new Set(activities.map(a => a.workoutType)));

  if (loading || activitiesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#285E67]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href="/logs"
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Link>
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#285E67]/20 rounded-lg flex items-center justify-center">
                      <Activity className="w-4 h-4 text-[#285E67]" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Workout Logs</h1>
                  </div>
                  <p className="mt-2 text-gray-600">
                    {activities.length} workouts logged • {activities.reduce((sum, a) => sum + a.pointsEarned, 0)} total points
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search workouts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#285E67] focus:border-transparent text-gray-900"
              />
            </div>

            {/* Filter by Type */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#285E67] focus:border-transparent text-gray-900 appearance-none"
              >
                <option value="all">All Types</option>
                {uniqueWorkoutTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#285E67] focus:border-transparent text-gray-900"
            >
              <option value="date">Sort by Date</option>
              <option value="duration">Sort by Duration</option>
              <option value="calories">Sort by Calories</option>
              <option value="points">Sort by Points</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-center px-3 py-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">
                {filteredActivities.length} results
              </span>
            </div>
          </div>
        </div>

        {/* Workout List */}
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts found</h3>
              <p className="text-gray-600">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Start logging your workouts to see them here'
                }
              </p>
            </div>
          ) : (
            filteredActivities.map((workout) => (
              <div key={workout._id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {/* Workout Type Icon */}
                    <div className="w-12 h-12 bg-[#285E67]/20 rounded-xl flex items-center justify-center">
                      <span className="text-xl">
                        {workoutTypeIcons[workout.workoutType] || '🏃'}
                      </span>
                    </div>

                    {/* Workout Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{workout.title}</h3>
                          <p className="text-sm text-gray-600 capitalize">{workout.workoutType}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            {new Date(workout.date).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(workout.date).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      {/* Workout Stats */}
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {workout.duration} min
                        </div>
                        {workout.calories && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Zap className="w-4 h-4 mr-1" />
                            {workout.calories} cal
                          </div>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${intensityColors[workout.intensity]}`}>
                          {workout.intensity}
                        </span>
                        <div className="text-sm font-medium text-[#285E67]">
                          +{workout.pointsEarned} points
                        </div>
                      </div>

                      {/* Notes */}
                      {workout.notes && (
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mt-3">
                          {workout.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      onClick={() => handleEdit(workout)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Edit workout"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(workout)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete workout"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditWorkoutModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedActivity(null);
        }}
        onSave={handleSaveEdit}
        activity={selectedActivity}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedActivity(null);
        }}
        onConfirm={handleConfirmDelete}
        activityTitle={selectedActivity?.title || ''}
        activityType="Workout"
      />
    </div>
  );
}
