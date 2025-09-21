'use client';

import { useState } from 'react';
import { X, Apple, Clock } from 'lucide-react';

interface MealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MealData) => void;
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

const mealTypes = [
  { value: 'breakfast', label: 'Breakfast', icon: '🌅', color: 'bg-yellow-50 border-yellow-200' },
  { value: 'lunch', label: 'Lunch', icon: '☀️', color: 'bg-orange-50 border-orange-200' },
  { value: 'dinner', label: 'Dinner', icon: '🌙', color: 'bg-purple-50 border-purple-200' },
  { value: 'snack', label: 'Snack', icon: '🍎', color: 'bg-green-50 border-green-200' },
];

export default function MealModal({ isOpen, onClose, onSubmit }: MealModalProps) {
  const [formData, setFormData] = useState<MealData>({
    title: '',
    mealType: '',
    calories: undefined,
    nutrition: {
      protein: undefined,
      carbs: undefined,
      fat: undefined,
      fiber: undefined,
    },
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.mealType) {
      onSubmit({
        ...formData,
        type: 'meal',
      });
      setFormData({
        title: '',
        mealType: '',
        calories: undefined,
        nutrition: {
          protein: undefined,
          carbs: undefined,
          fat: undefined,
          fiber: undefined,
        },
        notes: '',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Apple className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Log Meal</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Meal Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meal Description
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Greek salad with chicken, Oatmeal with berries"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  required
                />
              </div>

              {/* Calories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calories (optional)
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.calories || ''}
                    onChange={(e) => setFormData({ ...formData, calories: parseInt(e.target.value) || undefined })}
                    placeholder="e.g., 350"
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    min="1"
                  />
                </div>
              </div>

              {/* Nutrition (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Nutrition (optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Protein (g)</label>
                    <input
                      type="number"
                      value={formData.nutrition?.protein || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        nutrition: { 
                          ...formData.nutrition, 
                          protein: parseInt(e.target.value) || undefined 
                        }
                      })}
                      placeholder="25"
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Carbs (g)</label>
                    <input
                      type="number"
                      value={formData.nutrition?.carbs || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        nutrition: { 
                          ...formData.nutrition, 
                          carbs: parseInt(e.target.value) || undefined 
                        }
                      })}
                      placeholder="45"
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Fat (g)</label>
                    <input
                      type="number"
                      value={formData.nutrition?.fat || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        nutrition: { 
                          ...formData.nutrition, 
                          fat: parseInt(e.target.value) || undefined 
                        }
                      })}
                      placeholder="12"
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Fiber (g)</label>
                    <input
                      type="number"
                      value={formData.nutrition?.fiber || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        nutrition: { 
                          ...formData.nutrition, 
                          fiber: parseInt(e.target.value) || undefined 
                        }
                      })}
                      placeholder="8"
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Meal Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Meal Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {mealTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, mealType: type.value })}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.mealType === type.value
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center text-2xl`}>
                          {type.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{type.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="How did it taste? How did you feel after?"
                  rows={8}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              Log Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
