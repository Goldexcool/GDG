import mongoose from 'mongoose';

const DailyStatsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'UserProfile',
  },
  date: {
    type: Date,
    required: true,
  },
  // Activity counts
  workoutsCompleted: {
    type: Number,
    default: 0,
  },
  mealsLogged: {
    type: Number,
    default: 0,
  },
  mindfulnessMinutes: {
    type: Number,
    default: 0,
  },
  sleepHours: {
    type: Number,
    default: 0,
  },
  waterGlasses: {
    type: Number,
    default: 0,
  },
  // Nutrition totals
  totalCalories: {
    type: Number,
    default: 0,
  },
  totalProtein: {
    type: Number,
    default: 0,
  },
  totalCarbs: {
    type: Number,
    default: 0,
  },
  totalFat: {
    type: Number,
    default: 0,
  },
  // Goals
  goalsCompleted: {
    type: Number,
    default: 0,
  },
  totalGoals: {
    type: Number,
    default: 0,
  },
  // Points and achievements
  pointsEarned: {
    type: Number,
    default: 0,
  },
  streakMaintained: {
    type: Boolean,
    default: false,
  },
  // Overall mood and energy
  averageMood: {
    type: Number,
    min: 1,
    max: 5,
  },
  energyLevel: {
    type: Number,
    min: 1,
    max: 5,
  },
}, {
  timestamps: true,
});

// Create compound index for efficient querying
DailyStatsSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.models.DailyStats || mongoose.model('DailyStats', DailyStatsSchema);
