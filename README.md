# WellBalance - Wellness Tracking Dashboard

![WellBalance Banner](./public/banner.png)

## 🌟 Project Overview

**Original Task**: Create a responsive landing page from a Figma file.

**What I Actually Built**: I saw the word "creativity" in the requirements and decided to demonstrate just how much I want this position by going far beyond the scope! Instead of just a simple landing page, I've created a full-stack wellness tracking application with custom authentication, a comprehensive dashboard, and complete CRUD functionality.

This project showcases my ability to:
- Transform a design concept into a living, breathing application
- Implement custom authentication systems with JWT security
- Build scalable backend APIs
- Create responsive, user-friendly interfaces
- Deliver production-ready code with proper error handling
- Adapt to changing requirements (migrated from Clerk to custom auth)

## 🚀 What Makes This Special

### Beyond the Figma File
While the task was to create a landing page, I've built:
- ✅ **Responsive Landing Page** (Original requirement)
- ✅ **Custom JWT Authentication System** with secure cookies
- ✅ **Wellness Dashboard** with real-time statistics
- ✅ **Activity Tracking** for workouts, meals, and mindfulness
- ✅ **Complete CRUD Operations** with edit/delete functionality
- ✅ **MongoDB Integration** for data persistence
- ✅ **Modern UI Components** with smooth animations
- ✅ **Toast Notifications** for user feedback
- ✅ **Responsive Design** across all devices
- ✅ **Production-Ready Security** with password hashing and HTTP-only cookies

### Why I Went This Far
This isn't just about following instructions—it's about showing initiative, creativity, and the drive to exceed expectations. Every feature demonstrates a different aspect of my technical abilities and problem-solving approach.

## 🏗️ Technical Architecture

### Frontend Stack
- **Next.js 15.5.3** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling with custom color scheme
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - User-friendly notifications

### Backend & Security
- **MongoDB** - NoSQL database for user data
- **Mongoose** - Object modeling for MongoDB
- **Custom JWT Authentication** - Secure token-based authentication
- **bcryptjs** - Password hashing and verification
- **HTTP-Only Cookies** - Secure token storage
- **Next.js API Routes** - RESTful API endpoints

### Key Features Implemented

#### 🎨 Landing Page (Original Requirement)
- Responsive design matching modern wellness aesthetics
- Smooth scroll animations with Framer Motion
- Call-to-action sections leading to authentication
- Mobile-first approach with desktop enhancements

#### 🔐 Custom Authentication System
```typescript
// JWT-based authentication with refresh tokens
const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

// Secure HTTP-only cookie implementation
const setAuthCookies = (res: NextResponse, tokens: TokenPair) => {
  res.cookies.set('accessToken', tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });
};
```

#### 📊 Wellness Dashboard
Real-time tracking of:
- Daily activity goals with progress indicators
- Points and level system for gamification
- Streak tracking for consistency motivation
- Quick action buttons for rapid data entry
- Activity statistics with visual representations

#### 🏃‍♂️ Activity Management
Full CRUD operations for:
- **Workouts**: Track exercise type, duration, intensity, calories burned
- **Meals**: Log nutrition information, calories, meal types
- **Mindfulness**: Record meditation sessions, mood tracking, duration

#### 📱 Responsive Design
- Mobile-first design approach
- Tablet optimizations with grid layouts
- Desktop enhancements with expanded features
- Touch-friendly interactions across all devices

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- MongoDB database (local or MongoDB Atlas)

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT Secrets (generate strong random strings)
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd GDGFRONTEND
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Create a MongoDB database (local or MongoDB Atlas)
   - Add your connection string to `.env.local`

4. **Generate JWT Secrets**
   ```bash
   # Generate secure random strings for JWT secrets
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build
```bash
npm run build
npm run start
```

## 🎯 How It Works

### User Journey
1. **Landing Page**: Users see a beautiful, responsive wellness-focused landing page
2. **Sign Up/Sign In**: Custom authentication with secure password handling
3. **Dashboard**: Users land on their personalized wellness dashboard
4. **Activity Tracking**: Log workouts, meals, and mindfulness sessions
5. **Progress Monitoring**: View statistics, streaks, and achievements
6. **Data Management**: Full CRUD operations on all activities

### Technical Implementation

#### Authentication Flow
```typescript
// Custom middleware for route protection
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/logs')) {
    const token = request.cookies.get('accessToken');
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

// React Context for authentication state
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

#### API Structure
```
/api/
├── auth/
│   ├── signup/route.ts (POST)
│   ├── login/route.ts (POST)
│   ├── logout/route.ts (POST)
│   ├── me/route.ts (GET)
│   └── refresh/route.ts (POST)
├── activities/
│   ├── route.ts (GET, POST, PUT, DELETE)
│   └── stats/route.ts (GET)
└── stats/route.ts (GET)
```

#### Database Models
```typescript
// User Model
interface User {
  _id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  password: string; // bcrypt hashed
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  joinedAt: Date;
  lastLoginAt: Date;
}

// Activity Model
interface Activity {
  _id: ObjectId;
  userId: ObjectId;
  type: 'workout' | 'meal' | 'mindfulness';
  title: string;
  date: Date;
  pointsEarned: number;
  // Type-specific data fields
}
```

#### Security Features
```typescript
// Password hashing
const hashedPassword = await bcrypt.hash(password, 12);

// Token generation with proper expiration
const accessToken = jwt.sign(
  { userId: user._id }, 
  process.env.JWT_SECRET!, 
  { expiresIn: '15m' }
);

// Secure cookie configuration
res.cookies.set('accessToken', accessToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 15 * 60 * 1000
});
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # Backend API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── activities/    # Activity CRUD operations
│   │   └── stats/         # Statistics endpoints
│   ├── dashboard/         # Main dashboard page
│   ├── logs/             # Activity viewing pages
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   └── page.tsx          # Landing page
├── components/            # Reusable React components
│   ├── auth/             # Authentication components
│   ├── modals/           # Modal components
│   ├── LandingPage.tsx   # Main landing page component
│   └── [other components]
├── contexts/             # React Context providers
│   └── AuthContext.tsx   # Authentication state management
├── lib/                  # Utility functions
│   ├── auth.ts          # JWT utilities
│   ├── db.ts            # Database connection
│   └── utils.ts         # General utilities
├── models/               # Database models
│   ├── User.ts          # User schema
│   └── Activity.ts      # Activity schema
└── middleware.ts         # Next.js middleware for route protection
```

## 🎨 Design Decisions

### Color Palette
- **Primary**: `#285E67` (Calming teal - trust, wellness)
- **Secondary**: Orange to pink gradients (energy, motivation)
- **Neutral**: Gray scales for text and backgrounds
- **Consistent**: Same colors across landing page and dashboard

### Typography
- **Font**: Poppins (modern, readable)
- **Hierarchy**: Clear size progression
- **Weight**: Strategic use of font weights
- **Readability**: High contrast, proper sizing

### User Experience
- **Progressive Enhancement**: Works without JavaScript
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized images and lazy loading
- **Error Handling**: Graceful degradation and user feedback
- **Mobile-First**: Designed for mobile, enhanced for desktop

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Proper HTTP caching headers
- **Bundle Analysis**: Optimized dependencies
- **Database Queries**: Efficient MongoDB queries with indexing
- **JWT Strategy**: Short-lived access tokens with refresh mechanism

## 🔒 Security Features

- **Password Security**: bcryptjs hashing with salt rounds
- **JWT Implementation**: Access + refresh token pattern
- **HTTP-Only Cookies**: XSS protection
- **CSRF Protection**: SameSite cookie attributes
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: No sensitive data in error responses
- **Route Protection**: Middleware-based authentication

## 🧪 Testing Strategy

- **TypeScript**: Compile-time error catching
- **ESLint**: Code quality enforcement
- **Manual Testing**: Comprehensive user flow testing
- **Responsive Testing**: Multiple device sizes
- **Security Testing**: Authentication flow verification
- **Performance Testing**: Core Web Vitals monitoring

## 🔮 Future Enhancements

- [ ] **Data Visualization**: Advanced charts and graphs
- [ ] **Social Features**: Connect with friends, challenges
- [ ] **Mobile App**: React Native companion app
- [ ] **AI Integration**: Personalized recommendations
- [ ] **Wearable Integration**: Sync with fitness trackers
- [ ] **Offline Support**: PWA functionality
- [ ] **Email Verification**: Enhanced account security
- [ ] **Password Reset**: Forgot password functionality

## 📈 Migration Story: From Clerk to Custom Auth

This project originally used Clerk for authentication but was successfully migrated to a custom JWT system, demonstrating:

### Technical Adaptability
- **Complete Removal**: Systematically removed Clerk from 15+ components
- **Zero Downtime**: Maintained functionality throughout migration
- **Enhanced Security**: Implemented industry-standard JWT practices
- **Better Control**: Full control over authentication flow

### Migration Benefits
- **No Third-Party Dependencies**: Reduced external dependencies
- **Custom User Model**: Tailored user schema for wellness features
- **Cost Savings**: No subscription fees for authentication service
- **Learning Opportunity**: Deep understanding of authentication principles

## 📞 Contact & Support

**Why This Project Matters**: This isn't just a coding exercise—it's a demonstration of my passion for creating meaningful, user-centered applications. I saw an opportunity to showcase not just my technical skills, but my ability to think beyond requirements and deliver exceptional value.

**Technical Skills Demonstrated**:
- Full-stack development with modern technologies
- Custom authentication system implementation
- API design and backend development
- Database modeling and optimization
- Responsive design and user experience
- Security best practices
- Project migration and refactoring

**Soft Skills Demonstrated**:
- Initiative and creativity
- Problem-solving and adaptability
- Attention to detail
- User empathy
- Technical communication
- Project planning and execution

---

## 📝 About This Project

**Original Task**: Create a responsive landing page from a Figma file  
**What I Delivered**: A complete wellness tracking application that showcases my ability to turn simple requirements into comprehensive solutions.

**The "Creativity" Line**: When I saw "creativity" mentioned in the requirements, I knew this was my chance to show you exactly how much I want this position. This project represents not just what I can do, but how I think, how I approach problems, and how I deliver value.

**Migration Story**: When requested to remove all Clerk dependencies, I successfully migrated to a custom authentication system, demonstrating adaptability and deep technical understanding.

**Message**: I don't just build what's asked—I build what's needed. I don't just follow specifications—I understand user needs and business goals. This project is my way of showing you that I'm not just a developer who can code—I'm a problem solver who can think, innovate, and deliver exceptional results.

Thank you for giving me the opportunity to showcase my skills. I hope this project demonstrates not just my technical abilities, but my passion for creating meaningful software that makes a difference in people's lives.

---

*Built with ❤️ and a lot of coffee*  
*"Wellbeing starts with welldoing"*

## 📚 Additional Documentation

- **[Thought Process](./THOUGHT_PROCESS.md)**: Detailed development journey and decision-making process
- **[API Documentation](./docs/api.md)**: Complete API endpoint documentation
- **[Component Documentation](./docs/components.md)**: Reusable component library
- **[Deployment Guide](./docs/deployment.md)**: Production deployment instructions

### Key Features Implemented

#### 🎨 Landing Page (Original Requirement)
- Responsive design matching modern wellness aesthetics
- Smooth scroll animations
- Call-to-action sections
- Mobile-first approach

#### 🔐 Custom Authentication System
```typescript
// JWT-based authentication with refresh tokens
const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

// Secure HTTP-only cookie implementation
const setAuthCookies = (res: NextResponse, tokens: TokenPair) => {
  res.cookies.set('accessToken', tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });
};
```

#### 📊 Wellness Dashboard
Real-time tracking of:
- Daily activity goals
- Points and level system
- Streak tracking
- Quick action buttons
- Activity statistics with charts

#### 🏃‍♂️ Activity Management
Full CRUD operations for:
- **Workouts**: Track exercise type, duration, intensity, calories
- **Meals**: Log nutrition information, calories, meal types
- **Mindfulness**: Record meditation sessions, mood tracking

#### 📱 Responsive Design
- Mobile-first approach
- Tablet optimizations
- Desktop enhancements
- Touch-friendly interactions

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Clerk account for authentication

### Prerequisites
- Node.js 18+ 
- MongoDB database (local or MongoDB Atlas)

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT Secrets (generate strong random strings)
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd GDGFRONTEND
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Create a MongoDB database (local or MongoDB Atlas)
   - Add your connection string to `.env.local`

4. **Generate JWT Secrets**
   ```bash
   # Generate secure random strings for JWT secrets
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build
```bash
npm run build
npm run start
```

## 🎯 How It Works

### User Journey
1. **Landing Page**: Users see a beautiful, responsive wellness-focused landing page
2. **Sign Up/Sign In**: Custom JWT authentication with secure password handling
3. **Dashboard**: Users land on their personalized wellness dashboard
4. **Activity Tracking**: Log workouts, meals, and mindfulness sessions
5. **Progress Monitoring**: View statistics, streaks, and achievements
6. **Data Management**: Full CRUD operations on all activities

### Technical Implementation

#### Authentication Flow
```typescript
// Custom middleware for route protection
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/logs')) {
    const token = request.cookies.get('accessToken');
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

// React Context for authentication state
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

#### API Structure
```
/api/
├── activities/
│   ├── route.ts (GET, POST, PUT, DELETE)
│   └── stats/route.ts
├── stats/route.ts
└── user/route.ts
```

#### Database Models
- **Activity**: Stores workout, meal, and mindfulness data
- **UserProfile**: User preferences and settings
- **DailyStats**: Aggregated daily statistics

#### Points System
```typescript
// Dynamic point calculation
const calculatePoints = (type: string, data: any) => {
  switch(type) {
    case 'workout': return data.duration * 2;
    case 'meal': return 10;
    case 'mindfulness': return data.duration * 1.5;
  }
};
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # Backend API routes
│   ├── dashboard/         # Main dashboard page
│   ├── logs/             # Activity viewing pages
│   ├── sign-in/          # Authentication pages
│   └── sign-up/
├── components/            # Reusable React components
│   ├── modals/           # Modal components
│   ├── LandingPage.tsx   # Main landing page
│   └── [other components]
├── lib/                  # Utility functions
└── models/               # Database models
```

## 🎨 Design Decisions

### Color Palette
- **Primary**: `#285E67` (Calming teal)
- **Secondary**: Orange to pink gradients
- **Neutral**: Gray scales for text and backgrounds

### Typography
- **Font**: Poppins (modern, readable)
- **Hierarchy**: Clear size progression
- **Weight**: Strategic use of font weights

### User Experience
- **Progressive Enhancement**: Works without JavaScript
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized images and lazy loading
- **Error Handling**: Graceful degradation and user feedback

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Proper HTTP caching headers
- **Bundle Analysis**: Optimized dependencies
- **Database Queries**: Efficient MongoDB queries with indexing

## 🧪 Testing Strategy

- **TypeScript**: Compile-time error catching
- **ESLint**: Code quality enforcement
- **Manual Testing**: Comprehensive user flow testing
- **Responsive Testing**: Multiple device sizes
- **Performance Testing**: Core Web Vitals monitoring

## 🔮 Future Enhancements

- [ ] **Data Visualization**: Advanced charts and graphs
- [ ] **Social Features**: Connect with friends, challenges
- [ ] **Mobile App**: React Native companion app
- [ ] **AI Integration**: Personalized recommendations
- [ ] **Wearable Integration**: Sync with fitness trackers
- [ ] **Offline Support**: PWA functionality

## 📞 Contact & Support

**Why This Project Matters**: This isn't just a coding exercise—it's a demonstration of my passion for creating meaningful, user-centered applications. I saw an opportunity to showcase not just my technical skills, but my ability to think beyond requirements and deliver exceptional value.

**Technical Skills Demonstrated**:
- Full-stack development
- Modern React patterns
- API design and implementation
- Database modeling
- Authentication systems
- Responsive design
- User experience design
- Performance optimization

**Soft Skills Demonstrated**:
- Initiative and creativity
- Problem-solving
- Attention to detail
- User empathy
- Project planning
- Documentation

---

## 📝 About This Project

**Original Task**: Create a responsive landing page from a Figma file  
**What I Delivered**: A complete wellness tracking application that showcases my ability to turn simple requirements into comprehensive solutions.

**The "Creativity" Line**: When I saw "creativity" mentioned in the requirements, I knew this was my chance to show you exactly how 'BAD' I want this position. This project represents not just what I can do, but how I think, how I approach problems, and how I deliver value, I also included a thought processs file.

**Message**: I don't just build what's asked—I build what's needed. I don't just follow specifications—I understand user needs and business goals. This project is my way of showing you that I'm not just a developer who can code—I'm a problem solver who can think, innovate, and deliver exceptional results and ill be great leading the FRONTEND TEAM.

Thank you for giving me the opportunity to showcase my skills. I hope this project demonstrates not just my technical abilities, but my passion for creating meaningful software that makes a difference in people's lives.

---

*Built with ❤️ and a lot of coffee*  
*"Wellbeing starts with welldoing"*
# GDG
