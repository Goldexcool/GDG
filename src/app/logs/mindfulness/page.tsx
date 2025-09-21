'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  Brain, 
  Clock, 
  ArrowLeft,
  Filter,
  Search,
  Trash2,
  Edit3,
  Heart
} from 'lucide-react';
import EditMindfulnessModal from '@/components/modals/EditMindfulnessModal';
import DeleteConfirmModal from '@/components/modals/DeleteConfirmModal';

interface MindfulnessActivity {
  _id: string;
  title: string;
  meditationType: string;
  duration: number;
  mood?: number;
  notes?: string;
  pointsEarned: number;
  date: string;
  type: string;
}

export default function MindfulnessLogs() {
  const { isLoaded, isSignedIn } = useUser();
  const [activities, setActivities] = useState<MindfulnessActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  
  // Edit and Delete modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<MindfulnessActivity | null>(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/sign-in');
      return;
    }
    
    if (isLoaded && isSignedIn) {
      fetchMindfulness();
    }
  }, [isLoaded, isSignedIn]);

  const fetchMindfulness = async () => {
    try {
      const response = await fetch('/api/activities?type=mindfulness&limit=100');
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      }
    } catch (error) {
      console.error('Error fetching mindfulness activities:', error);
    } finally {
      setLoading(false);
    }
  };

  // Edit and Delete handlers
  const handleEdit = (activity: MindfulnessActivity) => {
    setSelectedActivity(activity);
    setEditModalOpen(true);
  };

  const handleDelete = (activity: MindfulnessActivity) => {
    setSelectedActivity(activity);
    setDeleteModalOpen(true);
  };

  const handleSaveEdit = async (updatedData: Omit<MindfulnessActivity, 'pointsEarned' | 'date'>) => {
    if (!selectedActivity) return;

    try {
      const updatePayload = {
        ...updatedData,
        pointsEarned: selectedActivity.pointsEarned,
        date: selectedActivity.date,
      };

      const response = await fetch(`/api/activities?id=${selectedActivity._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {
        throw new Error('Failed to update mindfulness session');
      }

      setActivities(prevActivities => 
        prevActivities.map(activity => 
          activity._id === selectedActivity._id 
            ? { ...activity, ...updatePayload }
            : activity
        )
      );

      setEditModalOpen(false);
      setSelectedActivity(null);
      toast.success('Mindfulness session updated successfully!');
    } catch (error) {
      console.error('Error updating mindfulness session:', error);
      toast.error('Failed to update session. Please try again.');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedActivity) return;

    try {
      const response = await fetch(`/api/activities?id=${selectedActivity._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete mindfulness session');
      }

      setActivities(prevActivities => 
        prevActivities.filter(activity => activity._id !== selectedActivity._id)
      );

      setDeleteModalOpen(false);
      setSelectedActivity(null);
      toast.success('Mindfulness session deleted successfully!');
    } catch (error) {
      console.error('Error deleting mindfulness session:', error);
      toast.error('Failed to delete session. Please try again.');
    }
  };

  const meditationTypeIcons: Record<string, string> = {
    breathing: '🌬️',
    guided: '🎧',
    'body-scan': '🧘',
    'loving-kindness': '❤️',
    movement: '🕺'
  };

  const moodEmojis: Record<number, string> = {
    1: '😰',
    2: '😟',
    3: '😐',
    4: '😌',
    5: '😇'
  };

  const moodLabels: Record<number, string> = {
    1: 'Stressed',
    2: 'Tense',
    3: 'Neutral',
    4: 'Calm',
    5: 'Peaceful'
  };

  const filteredActivities = activities
    .filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.meditationType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || activity.meditationType === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'duration':
          return b.duration - a.duration;
        case 'mood':
          return (b.mood || 0) - (a.mood || 0);
        case 'points':
          return b.pointsEarned - a.pointsEarned;
        default:
          return 0;
      }
    });

  const uniqueMeditationTypes = Array.from(new Set(activities.map(a => a.meditationType)));

  const totalMinutes = activities.reduce((sum, activity) => sum + activity.duration, 0);
  const averageMood = activities.filter(a => a.mood).length > 0 
    ? activities.filter(a => a.mood).reduce((sum, a) => sum + (a.mood || 0), 0) / activities.filter(a => a.mood).length
    : 0;

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
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
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Brain className="w-4 h-4 text-pink-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Mindfulness Logs</h1>
                  </div>
                  <p className="mt-2 text-gray-600">
                    {activities.length} sessions logged • {totalMinutes} total minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mindfulness Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Mindfulness Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{totalMinutes}</div>
              <div className="text-sm text-gray-600">Total Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{activities.length}</div>
              <div className="text-sm text-gray-600">Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round(totalMinutes / Math.max(activities.length, 1))}</div>
              <div className="text-sm text-gray-600">Avg. Duration</div>
            </div>
            {averageMood > 0 && (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-2xl">{moodEmojis[Math.round(averageMood)]}</span>
                  <span className="text-lg font-bold text-gray-900">{averageMood.toFixed(1)}</span>
                </div>
                <div className="text-sm text-gray-600">Avg. Mood</div>
              </div>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900"
              />
            </div>

            {/* Filter by Type */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 appearance-none"
              >
                <option value="all">All Types</option>
                {uniqueMeditationTypes.map(type => (
                  <option key={type} value={type}>
                    {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900"
            >
              <option value="date">Sort by Date</option>
              <option value="duration">Sort by Duration</option>
              <option value="mood">Sort by Mood</option>
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

        {/* Mindfulness List */}
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
              <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No mindfulness sessions found</h3>
              <p className="text-gray-600">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Start logging your mindfulness sessions to see them here'
                }
              </p>
            </div>
          ) : (
            filteredActivities.map((session) => (
              <div key={session._id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {/* Session Type Icon */}
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <span className="text-xl">
                        {meditationTypeIcons[session.meditationType] || '🧘'}
                      </span>
                    </div>

                    {/* Session Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                          <p className="text-sm text-gray-600 capitalize">
                            {session.meditationType.split('-').join(' ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            {new Date(session.date).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(session.date).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      {/* Session Stats */}
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {session.duration} min
                        </div>
                        {session.mood && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Heart className="w-4 h-4 mr-1" />
                            <span className="mr-1">{moodEmojis[session.mood]}</span>
                            {moodLabels[session.mood]}
                          </div>
                        )}
                        <div className="text-sm font-medium text-pink-600">
                          +{session.pointsEarned} points
                        </div>
                      </div>

                      {/* Notes */}
                      {session.notes && (
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mt-3">
                          {session.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      onClick={() => handleEdit(session)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(session)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
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
      <EditMindfulnessModal
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
        activityType="Mindfulness Session"
      />
    </div>
  );
}
