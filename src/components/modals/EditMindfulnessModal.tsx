'use client';

import { useState, useEffect } from 'react';
import { X, Brain } from 'lucide-react';

interface EditableMindfulnessData {
  _id: string;
  title: string;
  meditationType: string;
  duration: number;
  mood?: number;
  notes?: string;
  type: string;
}

interface MindfulnessActivity extends EditableMindfulnessData {
  pointsEarned: number;
  date: string;
}

interface EditMindfulnessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditableMindfulnessData) => void;
  activity: MindfulnessActivity | null;
}

const meditationTypes = [
  { value: 'breathing', label: 'Breathing', icon: '🫁' },
  { value: 'mindfulness', label: 'Mindfulness', icon: '🧘' },
  { value: 'body_scan', label: 'Body Scan', icon: '🛌' },
  { value: 'loving_kindness', label: 'Loving Kindness', icon: '💕' },
  { value: 'visualization', label: 'Visualization', icon: '👁️' },
  { value: 'walking', label: 'Walking Meditation', icon: '🚶' },
];

const moodEmojis = [
  { value: 1, emoji: '😔', label: 'Very Low' },
  { value: 2, emoji: '😕', label: 'Low' },
  { value: 3, emoji: '😐', label: 'Neutral' },
  { value: 4, emoji: '😊', label: 'Good' },
  { value: 5, emoji: '😄', label: 'Excellent' },
];

const EditMindfulnessModal: React.FC<EditMindfulnessModalProps> = ({
  isOpen,
  onClose,
  onSave,
  activity
}) => {
  const [formData, setFormData] = useState({
    title: '',
    meditationType: 'breathing',
    duration: '',
    mood: '',
    notes: ''
  });

  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title || '',
        meditationType: activity.meditationType || 'breathing',
        duration: activity.duration?.toString() || '',
        mood: activity.mood?.toString() || '',
        notes: activity.notes || ''
      });
    }
  }, [activity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.duration) return;

    const mindfulnessData: EditableMindfulnessData = {
      _id: activity?._id || '',
      title: formData.title.trim(),
      meditationType: formData.meditationType,
      duration: parseInt(formData.duration),
      type: 'mindfulness',
      ...(formData.mood && { mood: parseInt(formData.mood) }),
      ...(formData.notes && { notes: formData.notes })
    };

    onSave(mindfulnessData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Brain className="h-5 w-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Edit Mindfulness Session</h2>
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
              Session Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Morning Meditation"
              required
            />
          </div>

          {/* Meditation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meditation Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {meditationTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, meditationType: type.value })}
                  className={`p-3 rounded-md border text-sm font-medium transition-colors ${
                    formData.meditationType === type.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span>{type.icon}</span>
                    <span className="text-xs">{type.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes) *
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., 15"
              min="1"
              max="180"
              required
            />
          </div>

          {/* Mood */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post-Session Mood (optional)
            </label>
            <div className="flex justify-between gap-2">
              {moodEmojis.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, mood: mood.value.toString() })}
                  className={`flex-1 p-3 rounded-md border text-center transition-colors ${
                    formData.mood === mood.value.toString()
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">{mood.emoji}</span>
                    <span className="text-xs text-gray-600">{mood.label}</span>
                  </div>
                </button>
              ))}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              placeholder="How did the session go? Any insights or reflections..."
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
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMindfulnessModal;
