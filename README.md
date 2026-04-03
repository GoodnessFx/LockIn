# LockIn

LockIn is a high-performance cross-platform mobile application that transforms how individuals commit to and complete long-term learning goals. 
Built around a 97-day structured commitment model, the platform combines AI-driven curriculum generation, real-time accountability, and community pressure to create an environment where quitting becomes harder than succeeding.

The system is intentionally opinionated: users pick a niche, commit to a journey, and the app holds them to it — tracking battery-level health, daily streaks, missed sessions, and milestones. LockIn is not a passive learning tool. It is an active accountability engine.

Core Features
97-Day Commitment Engine
Users lock into a structured 97-day program from day one. A Commitment Battery (0–100%) tracks their overall adherence health. Missing days drains the battery; completing tasks charges it. The system tracks streaks, missed days, and task completion with persistent state across sessions — even offline

AI Curriculum Generation (LAI)
The LAI (LockIn AI) tab provides an embedded AI assistant powered by a backend AI service with offline fallback. LAI generates personalized curricula across six core disciplines — web development, mobile development, data science, design, marketing, and business — and adapts tasks to the user's niche, goal, and current day in the program. It also delivers motivational guidance, task explanations, and recovery plans for missed sessions.

Lockmate — Social Accountability Feed
A real-time community layer where users share progress updates, post wins, and engage with peers on the same journey. Posts, likes, comments, shares, and discovery are powered by a Supabase backend with live subscriptions. Users can filter by streak, online status, and mutual connections.

Team Feed with Role-Based Access
A dedicated Team tab — visible only to team_member and admin roles — provides an internal activity stream for team-based cohorts. Activity types include code pushes, design updates, video edits, writing updates, ideas, and meeting logs. New activities are written to Supabase and synced in real time via Postgres changes. Offline queuing ensures no activity is lost when connectivity drops.

Onboarding Flow
A four-step onboarding sequence — Profile Setup → Niche Selection → Goal Setting → Social Links — captures the context needed to personalise the curriculum and AI experience from session one. Progress is persisted to the global store immediately.

Progress Dashboard
Visual tracking of the user's journey: current day, overall percentage, week-over-week progress, curriculum completion, streak count, and battery level. Data is surfaced from the persisted Zustand store and updated in real time as tasks are completed.

Offline-First Architecture
All critical user state — authentication tokens, profile data, curriculum, progress, AI conversation history, and queued team activities — is persisted to AsyncStorage via Zustand middleware. Network status is monitored via @react-native-community/netinfo. When offline, team activity logs are queued locally and flushed automatically on reconnection.

Tech Stack
LayerTechnologyFrameworkReact Native 0.81.5 + Expo SDK 54LanguageTypeScript (strict mode)RoutingExpo Router v6 (file-based)State ManagementZustand v5 with AsyncStorage persistenceBackend / AuthSupabase (Postgres, Realtime, Storage, Auth)AI ServiceCustom REST API (locked-in.up.railway.app) with offline fallbackNetworking@react-native-community/netinfoAnimationsReact Native Reanimated v4 + AnimatableUI PrimitivesReact Native Paper, RN Elements, Expo Linear GradientMediaExpo Camera, Image Picker, Image Manipulator, AV, Media LibraryCI / CDEAS Build (development, preview, production profiles)TestingJest

lockin-mobile/
|
+-- src/
|   |
|   +-- app/                            # File-based routing (Expo Router)
|   |   +-- (tabs)/
|   |   |   +-- dashboard.tsx           # Main commitment dashboard
|   |   |   +-- lai.tsx                 # LockIn AI assistant
|   |   |   +-- lockmate.tsx            # Social feed
|   |   |   +-- team.tsx                # Team activity feed (role-gated)
|   |   |   +-- progress.tsx            # Progress analytics
|   |   |   +-- profile.tsx             # User profile & settings
|   |   |   +-- _layout.tsx             # Tab navigator + RBAC
|   |   +-- sign-in.tsx
|   |   +-- sign-up.tsx
|   |   +-- onboarding.tsx
|   |   +-- _layout.tsx                 # Root layout + global providers
|   |
|   +-- components/
|   |   +-- BatteryProgressIndicator.tsx
|   |   +-- CountdownTimer.tsx
|   |   +-- LiveClock.tsx
|   |   +-- ErrorBoundary.tsx
|   |   +-- lockmate/                   # Social feed components
|   |   +-- onboarding/                 # Onboarding step components
|   |
|   +-- services/
|   |   +-- ai/
|   |   |   +-- aiService.ts            # AI chat, curriculum gen, motivation
|   |   |   +-- curriculum.ts           # Local curriculum templates + generators
|   |   +-- api/
|   |   |   +-- api.ts                  # Centralized HTTP client
|   |   |   +-- aiAdapter.ts            # AI response adapter
|   |   +-- supabase/
|   |   |   +-- client.ts               # Supabase singleton
|   |   +-- teamService.ts              # Team CRUD + Realtime + Storage
|   |   +-- auth.ts                     # Auth helpers
|   |   +-- background/tasks.ts         # Background task registration
|   |
|   +-- store/
|   |   +-- appStore.ts                 # Global state (auth, profile, progress, AI)
|   |   +-- teamStore.ts                # Team activities + offline queue
|   |
|   +-- theme/
|   |   +-- theme.ts                    # Centralized design tokens
|   |
|   +-- types/
|   |   +-- team.ts
|   |   +-- social.ts
|   |
|   +-- hooks/
|   |   +-- ThemeProvider.tsx
|   |
|   +-- config/
|   |   +-- constants.ts                # API config, app config, theme config
|   |
|   +-- data/                           # Static seed data
|   +-- utils/auth/                     # Auth utilities + useAuth hook
|
+-- android/                            # Native Android project
+-- assets/images/                      # App icons, splash, adaptive icon
+-- tests/                              # Jest test suites
+-- patches/                            # Dependency patches
+-- app.config.ts                       # Expo dynamic config
+-- eas.json                            # EAS Build profiles
+-- babel.config.js
Getting Started
Prerequisites

Node.js v20+ (LTS)
npm or yarn
Expo CLI — npm install -g expo-cli
EAS CLI — npm install -g eas-cli (for production builds)
iOS Simulator (macOS only) or Android Emulator via Android Studio
Expo Go on a physical device for quick development

Environment Variables
Create a .env file at the project root:
envSUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
These are injected at build time via app.config.ts and accessed through expo-constants.
Installation
bashgit clone https://github.com/LockInAppHq/LockIn.git
cd LockIn
npm install
Development
bash# Start the Metro bundler
npx expo start

# Platform shortcuts (in Metro terminal)
# i → iOS Simulator
# a → Android Emulator
# w → Web
# r → Reload
# m → Developer Menu

Building for Production
LockIn uses EAS Build with three configured profiles.
bash# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure project (first time only)
eas build:configure

# Development build (internal distribution)
eas build --platform all --profile development

# Preview build (APK for Android, internal for iOS)
eas build --platform all --profile preview

# Production build (auto-increments version)
eas build --platform all --profile production

# Submit to stores
eas submit --platform ios --profile production
eas submit --platform android --profile production
App identifiers:
PlatformIdentifieriOScom.lockin.appAndroidcom.lockin.app

Data Model Highlights
User Profile
tsinterface UserProfile {
  id: string;
  name: string;
  username?: string;
  email: string;
  niche: string;
  goal: string;
  preferredSchedule: string;
  voicePreference: 'enabled' | 'disabled';
  timezone: string;
  role?: 'user' | 'team_member' | 'admin';
  teamId?: string;
  avatarUrl?: string | null;
}
Progress Tracking
tsinterface ProgressData {
  currentDay: number;          // Day in the 97-day journey
  totalDays: number;           // 97
  streak: number;              // Consecutive active days
  batteryLevel: number;        // 0–100 commitment health
  completedTasks: string[];    // Task IDs
  missedDays: number[];        // Day numbers with no activity
  notes: Note[];               // Daily journal entries
  isLocked?: boolean;          // Lock state (post-commitment)
}
Curriculum Item Types
learning | practice | milestone
Team Activity Types
code_push | design_update | video_edit | writing_update | idea | meeting

Code Standards

TypeScript strict mode enforced across all source files. No any unless explicitly justified.
Functional components only. No class components.
Zustand for global state. Local useState for transient UI state only.
Theme tokens always. No hardcoded color values or magic numbers — use theme.ts.
useMemo / useCallback on all expensive computations and callbacks passed as props.
Error boundaries at the screen level to prevent full-app crashes.
Offline-first by default. Any write operation that touches the network must have a queue or fallback.


Testing
bash# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
Test suites are located in /tests. Current coverage includes the countdown timer logic and curriculum generation utilities.

Troubleshooting
Offline banner appearing in simulator
The offline detection is handled by @react-native-community/netinfo. Ensure your simulator has an active network connection or toggle it in the device settings.
Metro bundler cache issues
bashnpx expo start -c
Supabase connection errors
Verify your .env values match the project's API URL and anon key from the Supabase dashboard. Ensure Row Level Security policies allow the expected operations.
Patch conflicts after npm install
The project maintains several patches in /patches. These are applied automatically via patch-package on install. If a patch fails, check for version mismatches in package.json.

Roadmap

 Voice-enabled AI interactions via LAI
 Push notifications for streak reminders and milestone alerts
 Deep analytics dashboard (weekly/monthly cohort comparisons)
 Expanded niche library (blockchain, AI/ML, content creation, fitness)
 Team leaderboards and competitive commitments
 Subscription billing integration (Free / Pro / Enterprise)
 Apple Watch and Wear OS companion app


License
Copyright © 2026 LockIn Inc. All rights reserved.
This software and its source code are proprietary and confidential. Unauthorized copying, distribution, modification, or use of this software, in whole or in part, is strictly prohibited without the express written consent of LockIn Inc.

<div align="center">
Built for the ones who don't quit.
lockin.app · support@lockin.app · GitHub
</div>
