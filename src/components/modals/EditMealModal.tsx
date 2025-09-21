'use client';

import { useState, useEffect } from 'react';
import { X, Apple } from 'lucide-react';

interface EditableMealData {
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
  type: string;
}

interface MealActivity extends EditableMealData {
  pointsEarned: number;
  date: string;
}

interface EditMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditableMealData) => void;
  activity: MealActivity | null;
}

const mealTypes = [
  { value: 'breakfast', label: 'Breakfast', icon: '🌅' },
  { value: 'lunch', label: 'Lunch', icon: '☀️' },
  { value: 'dinner', label: 'Dinner', icon: '🌙' },
  { value: 'snack', label: 'Snack', icon: '🍎' },
];

const EditMealModal: React.FC<EditMealModalProps> = ({
  isOpen,
  onClose,
  onSave,
  activity
}) => {
  const [formData, setFormData] = useState({
    title: '',
    mealType: 'breakfast',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    notes: ''
  });

  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title || '',
        mealType: activity.mealType || 'breakfast',
        calories: activity.calories?.toString() || '',
        protein: activity.nutrition?.protein?.toString() || '',
        carbs: activity.nutrition?.carbs?.toString() || '',
        fat: activity.nutrition?.fat?.toString() || '',
        fiber: activity.nutrition?.fiber?.toString() || '',
        notes: activity.notes || ''
      });
    }
  }, [activity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    const mealData: EditableMealData = {
      _id: activity?._id || '',
      title: formData.title.trim(),
      mealType: formData.mealType,
      type: 'meal',
      ...(formData.calories && { calories: parseInt(formData.calories) }),
      ...(formData.notes && { notes: formData.notes }),
      nutrition: {}
    };

    // Add nutrition data if provided
    if (formData.protein || formData.carbs || formData.fat || formData.fiber) {
      mealData.nutrition = {
        ...(formData.protein && { protein: parseFloat(formData.protein) }),
        ...(formData.carbs && { carbs: parseFloat(formData.carbs) }),
        ...(formData.fat && { fat: parseFloat(formData.fat) }),
        ...(formData.fiber && { fiber: parseFloat(formData.fiber) })
      };
    }

    onSave(mealData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Apple className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Edit Meal</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meal Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Grilled Chicken Salad"
              required
            />
          </div>

          {/* Meal Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meal Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {mealTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, mealType: type.value })}
                  className={`p-3 rounded-md border text-sm font-medium transition-colors ${
                    formData.mealType === type.value
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>{type.icon}</span>
                    <span>{type.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Calories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calories (optional)
            </label>
            <input
              type="number"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 450"
              min="0"
            />
          </div>

          {/* Nutrition Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nutrition Info (optional)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.protein}
                  onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Protein (g)"
                  min="0"
                />
              </div>
              <div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.carbs}
                  onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Carbs (g)"
                  min="0"
                />
              </div>
              <div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.fat}
                  onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Fat (g)"
                  min="0"
                />
              </div>
              <div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.fiber}
                  onChange={(e) => setFormData({ ...formData, fiber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Fiber (g)"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={3}
              placeholder="Any additional notes about this meal..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMealModal;
