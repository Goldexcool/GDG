import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'UserProfile',
  },
  type: {
    type: String,
    enum: ['workout', 'meal', 'mindfulness', 'sleep', 'hydration', 'weight-log'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  duration: Number, // in minutes
  calories: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  // Workout specific
  workoutType: {
    type: String,
    enum: ['cardio', 'strength', 'yoga', 'sports', 'walking', 'running', 'cycling', 'swimming'],
  },
  intensity: {
    type: String,
    enum: ['low', 'medium', 'high'],
  },
  // Meal specific
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
  },
  nutrition: {
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,
  },
  // Mindfulness specific
  meditationType: {
    type: String,
    enum: ['breathing', 'guided', 'body-scan', 'loving-kindness', 'movement'],
  },
  // Sleep specific
  sleepQuality: {
    type: Number,
    min: 1,
    max: 5,
  },
  // General
  mood: {
    type: Number,
    min: 1,
    max: 5,
  },
  notes: String,
  pointsEarned: {
    type: Number,
    default: 0,
  },
  tags: [String],
}, {
  timestamps: true,
});

export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
