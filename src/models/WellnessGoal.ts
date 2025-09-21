import mongoose from 'mongoose';

const WellnessGoalSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'UserProfile',
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    enum: ['fitness', 'nutrition', 'mindfulness', 'sleep', 'hydration', 'weight'],
    required: true,
  },
  targetValue: {
    type: Number,
    required: true,
  },
  currentValue: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    required: true, // e.g., 'kg', 'minutes', 'glasses', 'hours'
  },
  targetDate: Date,
  status: {
    type: String,
    enum: ['active', 'completed', 'paused', 'cancelled'],
    default: 'active',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  isDaily: {
    type: Boolean,
    default: false,
  },
  progress: [{
    date: {
      type: Date,
      default: Date.now,
    },
    value: Number,
    notes: String,
  }],
}, {
  timestamps: true,
});

export default mongoose.models.WellnessGoal || mongoose.model('WellnessGoal', WellnessGoalSchema);
