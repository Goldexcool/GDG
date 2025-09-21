'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  Apple, 
  ArrowLeft,
  Filter,
  Search,
  Trash2,
  Edit3,
  Target
} from 'lucide-react';
import EditMealModal from '@/components/modals/EditMealModal';
import DeleteConfirmModal from '@/components/modals/DeleteConfirmModal';

interface MealActivity {
  _id: string;
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
  pointsEarned: number;
  date: string;
  type: string;
}

export default function MealLogs() {
  const { isLoaded, isSignedIn } = useUser();
  const [activities, setActivities] = useState<MealActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  
  // Edit and Delete modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<MealActivity | null>(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/sign-in');
      return;
    }
    
    if (isLoaded && isSignedIn) {
      fetchMeals();
    }
  }, [isLoaded, isSignedIn]);

  const fetchMeals = async () => {
    try {
      const response = await fetch('/api/activities?type=meal&limit=100');
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  // Edit and Delete handlers
  const handleEdit = (activity: MealActivity) => {
    setSelectedActivity(activity);
    setEditModalOpen(true);
  };

  const handleDelete = (activity: MealActivity) => {
    setSelectedActivity(activity);
    setDeleteModalOpen(true);
  };

  const handleSaveEdit = async (updatedData: Omit<MealActivity, 'pointsEarned' | 'date'>) => {
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
        throw new Error('Failed to update meal');
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
      toast.success('Meal updated successfully!');
    } catch (error) {
      console.error('Error updating meal:', error);
      toast.error('Failed to update meal. Please try again.');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedActivity) return;

    try {
      const response = await fetch(`/api/activities?id=${selectedActivity._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete meal');
      }

      setActivities(prevActivities => 
        prevActivities.filter(activity => activity._id !== selectedActivity._id)
      );

      setDeleteModalOpen(false);
      setSelectedActivity(null);
      toast.success('Meal deleted successfully!');
    } catch (error) {
      console.error('Error deleting meal:', error);
      toast.error('Failed to delete meal. Please try again.');
    }
  };

  const mealTypeIcons: Record<string, string> = {
    breakfast: '🌅',
    lunch: '☀️',
    dinner: '🌙',
    snack: '🍎'
  };

  const mealTypeColors: Record<string, string> = {
    breakfast: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    lunch: 'bg-orange-100 text-orange-800 border-orange-200',
    dinner: 'bg-purple-100 text-purple-800 border-purple-200',
    snack: 'bg-green-100 text-green-800 border-green-200'
  };

  const filteredActivities = activities
    .filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.mealType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || activity.mealType === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'calories':
          return (b.calories || 0) - (a.calories || 0);
        case 'points':
          return b.pointsEarned - a.pointsEarned;
        default:
          return 0;
      }
    });

  const uniqueMealTypes = Array.from(new Set(activities.map(a => a.mealType)));

  const totalCalories = activities.reduce((sum, meal) => sum + (meal.calories || 0), 0);
  const totalNutrition = activities.reduce((acc, meal) => {
    if (meal.nutrition) {
      acc.protein += meal.nutrition.protein || 0;
      acc.carbs += meal.nutrition.carbs || 0;
      acc.fat += meal.nutrition.fat || 0;
      acc.fiber += meal.nutrition.fiber || 0;
    }
    return acc;
  }, { protein: 0, carbs: 0, fat: 0, fiber: 0 });

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
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
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Apple className="w-4 h-4 text-orange-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Meal Logs</h1>
                  </div>
                  <p className="mt-2 text-gray-600">
                    {activities.length} meals logged • {totalCalories.toLocaleString()} total calories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nutrition Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{totalCalories.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round(totalNutrition.protein)}g</div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{Math.round(totalNutrition.carbs)}g</div>
              <div className="text-sm text-gray-600">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{Math.round(totalNutrition.fat)}g</div>
              <div className="text-sm text-gray-600">Fat</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{Math.round(totalNutrition.fiber)}g</div>
              <div className="text-sm text-gray-600">Fiber</div>
            </div>
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
                placeholder="Search meals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
              />
            </div>

            {/* Filter by Type */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 appearance-none"
              >
                <option value="all">All Meals</option>
                {uniqueMealTypes.map(type => (
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
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
            >
              <option value="date">Sort by Date</option>
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

        {/* Meal List */}
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
              <Apple className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No meals found</h3>
              <p className="text-gray-600">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Start logging your meals to see them here'
                }
              </p>
            </div>
          ) : (
            filteredActivities.map((meal) => (
              <div key={meal._id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {/* Meal Type Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${mealTypeColors[meal.mealType]}`}>
                      <span className="text-xl">
                        {mealTypeIcons[meal.mealType] || '🍽️'}
                      </span>
                    </div>

                    {/* Meal Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{meal.title}</h3>
                          <p className="text-sm text-gray-600 capitalize">{meal.mealType}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            {new Date(meal.date).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(meal.date).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      {/* Meal Stats */}
                      <div className="flex items-center space-x-4 mb-3">
                        {meal.calories && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Target className="w-4 h-4 mr-1" />
                            {meal.calories} cal
                          </div>
                        )}
                        <div className="text-sm font-medium text-orange-600">
                          +{meal.pointsEarned} points
                        </div>
                      </div>

                      {/* Nutrition Info */}
                      {meal.nutrition && (meal.nutrition.protein || meal.nutrition.carbs || meal.nutrition.fat || meal.nutrition.fiber) && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <div className="text-xs font-medium text-gray-700 mb-2">Nutrition</div>
                          <div className="grid grid-cols-4 gap-2 text-xs">
                            {meal.nutrition.protein && (
                              <div>
                                <span className="text-blue-600 font-medium">{meal.nutrition.protein}g</span>
                                <div className="text-gray-500">Protein</div>
                              </div>
                            )}
                            {meal.nutrition.carbs && (
                              <div>
                                <span className="text-green-600 font-medium">{meal.nutrition.carbs}g</span>
                                <div className="text-gray-500">Carbs</div>
                              </div>
                            )}
                            {meal.nutrition.fat && (
                              <div>
                                <span className="text-yellow-600 font-medium">{meal.nutrition.fat}g</span>
                                <div className="text-gray-500">Fat</div>
                              </div>
                            )}
                            {meal.nutrition.fiber && (
                              <div>
                                <span className="text-purple-600 font-medium">{meal.nutrition.fiber}g</span>
                                <div className="text-gray-500">Fiber</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Notes */}
                      {meal.notes && (
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mt-3">
                          {meal.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      onClick={() => handleEdit(meal)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(meal)}
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
      <EditMealModal
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
        activityType="Meal"
      />
    </div>
  );
}
