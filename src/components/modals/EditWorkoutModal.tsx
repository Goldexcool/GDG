'use client';

import { useState, useEffect } from 'react';
import { X, Activity, Clock, Zap } from 'lucide-react';

interface EditableWorkoutData {
  _id: string;
  title: string;
  workoutType: string;
  duration: number;
  intensity: string;
  calories?: number;
  notes?: string;
  type: string;
}

interface WorkoutActivity extends EditableWorkoutData {
  pointsEarned: number;
  date: string;
}

interface EditWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditableWorkoutData) => void;
  activity: WorkoutActivity | null;
}

const workoutTypes = [
  { value: 'cardio', label: 'Cardio', icon: '🏃' },
  { value: 'strength', label: 'Strength Training', icon: '💪' },
  { value: 'yoga', label: 'Yoga', icon: '🧘' },
  { value: 'sports', label: 'Sports', icon: '⚽' },
  { value: 'walking', label: 'Walking', icon: '🚶' },
  { value: 'cycling', label: 'Cycling', icon: '🚴' },
  { value: 'swimming', label: 'Swimming', icon: '🏊' },
];

const intensityLevels = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' },
];

export default function EditWorkoutModal({ isOpen, onClose, onSave, activity }: EditWorkoutModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    workoutType: '',
    duration: 30,
    intensity: 'medium',
    calories: undefined as number | undefined,
    notes: '',
  });

  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title || '',
        workoutType: activity.workoutType || '',
        duration: activity.duration || 30,
        intensity: activity.intensity || 'medium',
        calories: activity.calories,
        notes: activity.notes || '',
      });
    }
  }, [activity]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.workoutType && activity) {
      onSave({
        _id: activity._id,
        ...formData,
        type: 'workout',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#285E67]/20 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#285E67]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Edit Workout</h2>
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
              {/* Workout Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Workout Name
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Morning Run, Push Day, Yoga Flow"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#285E67] focus:border-transparent text-gray-900 placeholder-gray-500"
                  required
                />
              </div>

              {/* Duration and Intensity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#285E67] focus:border-transparent text-gray-900"
                      min="1"
                      max="300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intensity
                  </label>
                  <div className="space-y-2">
                    {intensityLevels.map((level) => (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, intensity: level.value })}
                        className={`w-full p-2 rounded-lg text-sm font-medium transition-all ${
                          formData.intensity === level.value
                            ? level.color
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calories Burned (optional)
                </label>
                <div className="relative">
                  <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.calories || ''}
                    onChange={(e) => setFormData({ ...formData, calories: parseInt(e.target.value) || undefined })}
                    placeholder="e.g., 300"
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#285E67] focus:border-transparent text-gray-900 placeholder-gray-500"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Workout Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Workout Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {workoutTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, workoutType: type.value })}
                      className={`p-3 rounded-xl border-2 transition-all text-left ${
                        formData.workoutType === type.value
                          ? 'border-[#285E67] bg-[#285E67]/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{type.icon}</span>
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
                  placeholder="How did it feel? Any achievements or observations?"
                  rows={6}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#285E67] focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#285E67] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#285E67]/90 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
