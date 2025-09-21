import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profileImage: String,
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  // Wellness Profile
  currentWeight: Number,
  targetWeight: Number,
  height: Number,
  dateOfBirth: Date,
  activityLevel: {
    type: String,
    enum: ['sedentary', 'light', 'moderate', 'active', 'very-active'],
    default: 'moderate',
  },
  // Gamification
  totalPoints: {
    type: Number,
    default: 0,
  },
  currentStreak: {
    type: Number,
    default: 0,
  },
  longestStreak: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  // Preferences
  notificationsEnabled: {
    type: Boolean,
    default: true,
  },
  preferredWorkoutTime: String,
  timezone: String,
}, {
  timestamps: true,
});

export default mongoose.models.UserProfile || mongoose.model('UserProfile', UserProfileSchema);
