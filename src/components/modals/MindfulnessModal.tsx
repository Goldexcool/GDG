'use client';

import { useState } from 'react';
import { X, Brain, Clock, Play } from 'lucide-react';

interface MindfulnessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MindfulnessData) => void;
}

interface MindfulnessData {
  title: string;
  meditationType: string;
  duration: number;
  mood?: number;
  notes?: string;
  type?: string;
}

const meditationTypes = [
  { value: 'breathing', label: 'Breathing', icon: '🌬️', description: 'Focus on breath' },
  { value: 'guided', label: 'Guided', icon: '🎧', description: 'With audio guide' },
  { value: 'body-scan', label: 'Body Scan', icon: '🧘', description: 'Progressive relaxation' },
  { value: 'loving-kindness', label: 'Loving Kindness', icon: '❤️', description: 'Compassion practice' },
  { value: 'movement', label: 'Movement', icon: '🕺', description: 'Mindful movement' },
];

const moodOptions = [
  { value: 1, label: 'Stressed', emoji: '😰' },
  { value: 2, label: 'Tense', emoji: '😟' },
  { value: 3, label: 'Neutral', emoji: '😐' },
  { value: 4, label: 'Calm', emoji: '😌' },
  { value: 5, label: 'Peaceful', emoji: '😇' },
];

export default function MindfulnessModal({ isOpen, onClose, onSubmit }: MindfulnessModalProps) {
  const [formData, setFormData] = useState<MindfulnessData>({
    title: '',
    meditationType: '',
    duration: 10,
    mood: undefined,
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.meditationType) {
      onSubmit({
        ...formData,
        type: 'mindfulness',
      });
      setFormData({
        title: '',
        meditationType: '',
        duration: 10,
        mood: undefined,
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
            <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-pink-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Log Mindfulness</h2>
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
              {/* Session Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Morning meditation, Stress relief"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  required
                />
              </div>

              {/* Duration */}
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
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900"
                    min="1"
                    max="120"
                  />
                </div>
              </div>

              {/* Mood Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How are you feeling? (optional)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, mood: mood.value })}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${
                        formData.mood === mood.value
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{mood.emoji}</div>
                      <div className="text-xs font-medium text-gray-900">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Meditation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Meditation Type
                </label>
                <div className="space-y-3">
                  {meditationTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, meditationType: type.value })}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        formData.meditationType === type.value
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{type.icon}</div>
                        <div>
                          <div className="font-medium text-gray-900">{type.label}</div>
                          <div className="text-sm text-gray-500">{type.description}</div>
                        </div>
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
                  placeholder="How was your session? Any insights or reflections?"
                  rows={6}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-4 rounded-xl font-medium hover:from-pink-600 hover:to-pink-700 transition-all flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Log Session</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}