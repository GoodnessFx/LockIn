# LockIn Mobile App — Comprehensive Technical Documentation

## Overview

LockIn is a React Native (Expo) application that guides users through a structured multi‑day learning journey with an AI assistant (LAI), daily progress tracking, and a personalized curriculum. The app integrates API services, local storage, background tasks, and a global state store to deliver a cohesive experience.

## Tech Stack

- Framework: Expo (React Native)
- State: `zustand` + hydration via `AsyncStorage`
- Storage: `@react-native-async-storage/async-storage` + `expo-secure-store`
- Networking: `axios`
- Routing: `expo-router` (`Stack` + `Tabs`)
- SVG/Graphics: `react-native-svg`

## Project Structure (mobile)

```
_/apps/mobile/
  src/
    app/
      _layout.jsx                 # Root stack layout
      (tabs)/_layout.jsx          # Tab layout (LockIn, LAI, Lockmate, Progress, Profile)
      dashboard.jsx               # Dashboard screen
      lai.jsx                     # LAI assistant screen (overview/curriculum/mentor)
      profile.jsx                 # Profile screen
      progress.jsx                # Progress wrapper
      onboarding.jsx              # Multi-step onboarding flow
      +not-found.tsx              # 404-like screen
    components/
      BatteryProgressIndicator.tsx
      LiveClock.tsx
      ProgressTracker.jsx
    services/
      api/api.ts                  # ApiService (axios + interceptors)
      ai/aiService.ts             # AIService (chat + offline responses + recovery)
      ai/curriculum.ts            # Curriculum templates + generation + progress calc
      background/tasks.ts         # Inactivity detection + recovery suggestions
      notifications.js            # Basic notification service
      progress.js                 # Progress service (AsyncStorage-backed)
      storage.js                  # Generic storage service
    store/
      appStore.ts                 # Global state (zustand) + hydration
    utils/
      auth/useAuth.js             # Simple token-based auth hook (mocked)
      auth/useUser.js             # Simple user data hook (mocked)
      auth/store.js               # Secure auth store + auth modal
    config/
      constants.ts                # API_CONFIG, APP_CONFIG, theme
    errors/
      ErrorBoundary.tsx           # React error boundary
  README.md (root)
```

## Routing

- Root layout: `src/app/_layout.jsx` defines the `Stack` screens for `index`, `onboarding`, `(tabs)`, and `+not-found`.
- Tabs: `src/app/(tabs)/_layout.jsx` defines five primary tabs with `Ionicons` and custom styling:
  - `LockIn` (Dashboard)
  - `LAI` (Assistant)
  - `Lockmate` (Companion)
  - `Progress`
  - `Profile`
- Hidden routes: Some non-tab routes like `index` and `topic/[id]` are accessible via navigation but hidden from the tab bar.

## Global State — appStore.ts

- Built with `zustand` and hydrated from `AsyncStorage` using `hydrateAppStore`.
- Key slices:
  - `userProfile`: name, username, bio, avatar
  - `progress`: `currentDay`, `totalDays`, `streak`, `completedTasks`, `batteryLevel`
  - `curriculum`: array of `CurriculumItem` and `updateCurriculumItem`
  - `aiAssistant`: visibility, mute, lastMessage, suggestions
  - UI settings: theme, onboarding status
- Actions: manage onboarding completion, theme toggle, profile update, `markTaskComplete`, curriculum updates, AI assistant settings.

## Services

### ApiService — `src/services/api/api.ts`

- Configures `axios` instance with `API_CONFIG` from `config/constants.ts`.
- Token management: request/response interceptors attach and refresh tokens.
- Endpoints (examples):
  - Auth: `login`, `logout`, `refreshToken`
  - User: `getProfile`, `updateProfile`
  - Progress: `getProgress`, `updateProgress`, `markTaskComplete`
  - Curriculum: `getCurriculum`, `saveCurriculum`
  - AI: `askAI` (chat), `generateCurriculum`
  - Notifications: `subscribe`, `unsubscribe`

### AIService — `src/services/ai/aiService.ts`

- Interacts with `apiService` for online chat and curriculum generation.
- Provides offline fallback responses for motivation and task explanations.
- `getRecoverySuggestions(context)`: builds a personalized recovery plan using user profile and progress.
- `AIContext` / `AIResponse` interfaces ensure structured inputs/outputs.

### Curriculum — `src/services/ai/curriculum.ts`

- `CURRICULUM_TEMPLATES` for niches: `web-dev`, `mobile-dev`, `data-science`, `design`, `marketing`, `business`.
- `generateCurriculum(niche, days)`: expands templates to N-day plan (default 97 days).
- `getCurriculumProgress(items)`: computes overall and weekly progress.

### Storage — `src/services/storage.js`

- `StorageService`: generic `get`, `set`, `remove`, `clear` using `AsyncStorage`.
- Keys: `user_profile`, `app_settings`, `onboarding_status` helpers.

### Progress — `src/services/progress.js`

- Stores and updates: `currentDay`, `totalDays`, `streak`, `completedTasks`, `lastActiveDate`, `batteryLevel`.
- Methods: `getProgress`, `updateProgress`, `markTaskComplete`, `getStreak`, `updateBatteryLevel`.

### Notifications — `src/services/notifications.js`

- Alert-based notifications: milestones, focus reminders, daily progress.
- `scheduleReminder`, `cancelReminder` are placeholders for push scheduling.

### Background Tasks — `src/services/background/tasks.ts`

- Inactivity job `LOCKIN_INACTIVITY`:
  - Detects inactivity from last active date.
  - Generates recovery suggestions via `aiService`.
  - Schedules recommendations/notifications.

## Authentication

- `useAuth.js`: simple token-based check via `AsyncStorage` (`auth_token`), with mock `signIn` and `signOut`.
- `useUser.js`: mock fetch and update of a `mockUser` when `auth_token` exists.
- `utils/auth/store.js`:
  - `useAuthStore`: stores full `auth` object into `expo-secure-store` under `authKey` (`${EXPO_PUBLIC_PROJECT_GROUP_ID}-jwt`).
  - `useAuthModal`: manages modal open/close and mode (`signup`/`login`).

## Key Screens

### Onboarding — `src/app/onboarding.jsx`

- Steps: Niche selection, Goal setting, Social links, Profile setup.
- Persists choices to `appStore` and `StorageService`.
- Navigates to dashboard after save.

### Dashboard — `src/app/dashboard.jsx`

- Shows 97-day countdown, focus timer, progress snapshot.
- Integrates `BatteryProgressIndicator`, `LiveClock`, and `ProgressService`.

### LAI (Assistant) — `src/app/lai.jsx`

- Tabs: `overview`, `curriculum`, `mentor`.
- Features:
  - Chat-like prompt interface and mentor messages (persisted via `AsyncStorage`).
  - Dynamic 97-day curriculum generation based on user niche.
  - Progress notes and completion gating via task modal.
  - Developer editor to tweak curriculum items.

### Profile — `src/app/profile.jsx`

- Displays stats: level, XP, streak, goals, focus hours, achievements.
- Settings: notifications, security, sign out.

### Progress — `src/app/progress.jsx` and `components/ProgressTracker.jsx`

- Progress tracker UI: main card, stats grid, milestones, weekly chart.

## UI Components

- `BatteryProgressIndicator.tsx`: gradient fill battery visual tied to `batteryLevel`.
- `LiveClock.tsx`: 12/24h, date/seconds, configurable size/color.
- `ErrorBoundary.tsx`: catches UI errors with refresh action.

## Configuration — `src/config/constants.ts`

- `theme`: colors, spacing, typography.
- `API_CONFIG`:
  - `BASE_URL`, `AI_PROXY_URL`, `TIMEOUT`
  - `ENDPOINTS`: `auth`, `user`, `progress`, `curriculum`, `ai.chat`, `notifications`
- `APP_CONFIG`:
  - `COMMITMENT_DAYS` (97), `CURRICULUM_DAYS`, `INACTIVITY_THRESHOLD_HOURS`, `NOTIFICATION_INTERVALS`

## Data Flow

1. User signs in → token stored in `AsyncStorage` (`auth_token`) and/or `expo-secure-store` via `useAuthStore`.
2. `hydrateAppStore` loads profile/progress/curriculum/assistant from `AsyncStorage` on app start.
3. Screens read/write through `appStore` actions and specialized services (`ProgressService`, `StorageService`).
4. API interactions go through `ApiService`, AI interactions through `AIService` with offline fallback.
5. Background tasks trigger AI recovery suggestions on inactivity.

## Storage Keys

- `auth_token` (AsyncStorage, mock)
- `user_profile`, `app_settings`, `onboarding_status` (StorageService)
- Progress-related: may include `currentDay`, `streak`, `batteryLevel` keys via `ProgressService` implementation.
- `authKey` for `expo-secure-store`: `${EXPO_PUBLIC_PROJECT_GROUP_ID}-jwt`.

## Environment Variables

- `EXPO_PUBLIC_PROJECT_GROUP_ID` (used in secure auth key derivation)
- API base/proxy URLs can be parameterized via `constants.ts` or additional `EXPO_PUBLIC_*` vars as needed.

## Development & Run Instructions

- Prerequisites: Node 18+, `npm` or `pnpm`, Expo CLI (`npx expo` works without global install).
- Install dependencies:
  - Navigate to `_/apps/mobile`
  - Run: `npm install`
- Start development server:
  - Correct directory: `c:\Users\Admin\Desktop\LockIn\_\apps\mobile`
  - Command: `npx expo start`
- Open with Expo Go (on device) or run iOS/Android simulators via CLI prompts.

## API Notes

- Endpoints defined in `constants.ts` and implemented in `api.ts`.
- `askAI`: primary AI chat API route.
- Implement actual backend integration by replacing mock auth/user calls in `useAuth.js`/`useUser.js` with real `ApiService` methods.

## Security Considerations

- Use `expo-secure-store` for sensitive tokens (`useAuthStore`).
- Avoid storing secrets in plain `AsyncStorage`.
- Ensure `axios` interceptors handle 401/refresh flows robustly.

## Future Enhancements

- Replace mock hooks with real API calls.
- Push notifications via `expo-notifications`.
- Formalize background tasks using `expo-task-manager`.
- Add unit/integration tests for `appStore` and services.

---

## Feature-by-Feature Guide (Non‑Technical)

This section walks through the app from the first time you open it (the onboarding screens) all the way to the main features you’ll use daily. It’s designed for everyone — no technical background required. Think of it as your friendly tour guide for LockIn.

### What You See First

- Splash screen: When the app starts, you see the LockIn logo for a few seconds while the app gets ready. It also pulls in anything you’ve saved before, like your profile and progress.
- Then you go straight to onboarding. If you’ve already completed onboarding in the past, you may be taken to the dashboard depending on your saved status.

### Onboarding: Setting Up Your Experience

Onboarding helps the app tailor your learning journey. It’s broken into simple steps.

1) Niche Selection

- What it is: You choose your focus area (your “niche”), such as Web Development, Mobile Development, Data Science, Design, Marketing, or Business.
- Why it matters: Your chosen niche shapes the 97‑day curriculum — the lessons, tasks, and goals that the app builds for you.
- What you do: Tap on the niche that best matches your interests or goals. You can switch later if your preferences change.
- What’s saved: The app stores your selection so your curriculum and suggestions match your niche.
- Where it shows up: The LAI screen and the curriculum generator use this choice to create your learning plan.

2) Goal Setting

- What it is: You set simple, motivational goals, like how much time you want to study each day or what milestone you want to reach.
- Why it matters: Goals help the app track your progress and give you nudges to stay on track.
- What you do: Pick goals that feel achievable — small daily steps add up.
- What’s saved: Your goals are recorded so reminders and progress views reflect them.

3) Social Links (Optional)

- What it is: You can add links to professional or project profiles, like GitHub or LinkedIn.
- Why it matters: Social links help your mentor and AI assistant tailor guidance that fits the type of work or community you care about.
- What you do: Paste your links if you want; skip if you prefer not to share.
- Privacy note: The app does not collect passwords or sensitive data through these links.

4) Profile Setup

- What it is: Your basic profile — first name, last name, username, and an optional short bio.
- Add a photo: You can take a picture or pick one from your gallery. The app will ask for permission to use the camera and access photos.
- Why it matters: Your profile makes the app feel personal and helps the assistant address you by name.
- What’s saved: Your profile is stored so it appears on your dashboard and profile screen.

Completing Onboarding

- After finishing these steps, tap to save. The app stores your choices and takes you to the main dashboard.
- Behind the scenes, the app also loads your saved state (profile, progress, and preferences) so everything is ready.

### Main App Tour

Once onboarding is done, you’ll spend most of your time in five areas available on the tab bar at the bottom: LockIn (Dashboard), LAI (Assistant), Lockmate (Companion), Progress, and Profile.

#### Dashboard (LockIn)

Your home base. It gives you a quick overview of your commitment and your day.

- 97‑Day Commitment Countdown: Shows how many days are left in your journey. It’s a simple motivator that keeps you focused on the finish line.
- Focus Timer: A built‑in timer to help you study or work in focused intervals (like 25 minutes on, 5 minutes off). Use it to build a routine.
- Battery Level Indicator: A visual “battery” representing your engagement and consistency. High battery means you’ve been active; low battery suggests it’s time to recharge your habits.
- Live Clock: Displays the current time (and optionally the date). Handy for time‑boxing tasks.
- Welcome Message: Personalized greeting using your profile name. It’s small, but it helps the app feel yours.
- Progress Snapshot: A quick look at your current day in the curriculum, streak (how many days in a row you’ve stayed active), and tasks completed.

How progress updates here

- When you complete tasks from your curriculum, the dashboard reflects that in your progress snapshot and battery indicator.
- If you’ve been inactive for a while, the battery may drop, and the app may suggest ways to get back on track.

Tips for using the dashboard well

- Start your day by checking the countdown and your planned tasks.
- Use the focus timer to avoid distraction and work in productive blocks.
- Keep an eye on your streak — it’s a great motivator.

#### LAI (Assistant)

Your smart coach and mentor. LAI is split into three tabs to make help more accessible.

1) Overview Tab

- Personal Messages: LAI greets you with guidance based on your profile and recent activity. Think of it like a daily check‑in.
- Smart Suggestions: Small, actionable tips — example: “Try a 25‑minute focus block now” or “Review yesterday’s notes.”
- How to talk to LAI: Use the prompt box to ask questions (e.g., “What should I study today?” or “Explain REST APIs like I’m new to programming”). You’ll get clear responses aimed at your level.
- Offline support: If you’re offline, LAI can still provide motivational advice and simple explanations from built‑in knowledge.

2) Curriculum Tab

- Your 97‑Day Plan: LAI builds a day‑by‑day curriculum based on your niche. Each day has tasks with descriptions, difficulty, and sometimes resources.
- Task Details Modal: Tap a task to see details, mark it complete, or get guidance. Some tasks gate progress so you’re encouraged to finish one before moving to the next.
- Developer Editor (for advanced users): A simple editor lets you tweak tasks. If you like customizing your learning plan, this is for you.
- Change Niche: If your interests change, you can regenerate the curriculum for a different niche.
- Progress Notes: Capture thoughts about your learning — what went well, what was tough — to build reflection habits.

3) Mentor Tab

- Chat Interface: A focused, chat‑style experience where you can ask deeper questions and get mentor‑like advice.
- Saved Messages: Your mentor conversations are stored, so you can revisit guidance at any time.
- Recovery Suggestions: If you’ve been inactive, LAI offers gentle, tailored ways to restart — like a short “warm‑up” task or a motivational tip.
- Example prompts: “Help me understand recursion,” “What should I build to practice CSS?” “How can I prepare a data portfolio?”

How to get the most out of LAI

- Ask specific questions: “Explain X,” “Set me a challenge,” “Review my plan for today.”
- Use the curriculum tab daily: Check off tasks and glance at upcoming ones to prepare.
- Lean on recovery suggestions after a break — small wins matter.

#### Lockmate (Companion)

Lockmate is designed to be your supportive companion space.

- What to expect: Micro‑challenges, focus boosters, and friendly nudges. Depending on your app version, this tab may show simple tips, placeholder content, or social‑style features.
- Role in the app: Complement LAI’s guidance with lighter, motivational interactions — short prompts you can act on immediately.
- If you don’t see much here yet: It’s okay — Lockmate is set up for future enhancements. You can keep using LAI and the dashboard for your core workflow.

#### Progress

Visualize how far you’ve come.

- Main Progress Card: A summary of your learning journey — tasks done, days active, and overall momentum.
- Stats Grid: Quick stats such as hours studied, tasks completed, and your current streak.
- Today’s Progress: A simple view of what you’ve achieved today.
- Milestones List: Highlights major points in your journey — hitting a streak target or completing a set of tasks.
- Weekly Bar Chart: See your weekly activity at a glance. Great for spotting patterns like “I’m most active mid‑week.”

How to read it

- Big numbers tell the story of consistency; small numbers show areas to grow.
- Use the weekly chart to plan your heavier study days around your schedule.

#### Profile

Your identity in the app.

- Avatar and Bio: Put a face to your profile and write a short bio.
- User Stats: Level, XP, streak, goals, focus hours, achievements — these make progress tangible.
- Notification Settings: Choose what reminders you want to receive.
- Security Settings: Manage sign‑in and sign‑out.
- Sign Out: If you need a break or switch accounts, sign out safely.

Tips for Profile

- Keep your bio and avatar up to date — it’s fun and helps personalize the experience.
- Review your goals from time to time; adjust them to match your schedule.

### Notifications and Reminders

LockIn uses simple, friendly notifications.

- Milestones: Celebrate big steps (like completing a week or hitting a streak).
- Focus Reminders: Gentle nudges to start a focus block or return after a break.
- Daily Progress: Recap of what you did today.
- Customization: In settings, choose which reminders feel right for you.

Note: Depending on your device and the app version, some reminders may be simple alerts rather than push notifications.

### Inactivity and Recovery Suggestions

Life happens — when you’re inactive for a while, the app helps you restart.

- Detection: The app notices when you haven’t been active for a set number of hours.
- Suggestions: LAI offers a personalized recovery plan — small steps to get moving again.
- Scheduling: The app can schedule these suggestions so they show up at helpful times.

Why it works

- Restarting is about momentum, not perfection. A short, easy task is often the best way to break a pause.

### Data and Privacy

We respect your privacy and keep things transparent.

- Where your data lives: Your profile, progress, and settings are saved locally on your device so the app can load quickly and work smoothly.
- Secure storage: Sensitive information (like tokens used to sign in) is stored in a more secure way.
- Cloud calls: When the app needs online features (like AI chat), it talks to safe servers. If offline, it falls back to helpful built‑in content.
- Control: You can sign out or clear data if you want to start fresh.

### Tips for Success

- Build a routine: Use the focus timer and do one or two tasks daily.
- Ask LAI for help: If a topic feels hard, ask for a simpler explanation or a practice challenge.
- Celebrate small wins: Mark tasks complete — it feels good and keeps your momentum.
- Reflect: Write quick notes in your progress view. Reflection helps learning stick.

### Frequently Asked Questions (FAQ)

- Can I change my niche later? Yes. You can regenerate your curriculum for another niche whenever you like.
- What if I’m offline? LAI still provides motivational and simple instructional content. Online gives you richer responses, but you’re never stuck.
- Where do I find my tasks? In the LAI screen under the Curriculum tab — it’s your daily list.
- How do I improve my streak? A streak grows when you’re active every day. Even small actions count.
- Is my photo safe? The app uses the device’s standard permissions and storage. Photos are handled responsibly and used only to personalize your profile.

### Troubleshooting

- I can’t start the app: Make sure you’re in the correct folder — `c:\Users\Admin\Desktop\LockIn\_\apps\mobile` — and run `npm install` followed by `npx expo start`.
- Expo Go doesn’t connect: Check that your phone and computer are on the same Wi‑Fi network. Some networks block connections; try hotspot or another network.
- Permissions: If the camera or gallery doesn’t open, check your device permissions in settings and allow the app to use them.
- Stuck on onboarding: If you encounter a glitch, you can restart the app. Your choices are saved so you won’t lose progress.
- Signed in but data looks old: Use the refresh option on relevant screens or sign out and back in.

### Glossary

- Streak: How many days in a row you’ve stayed active.
- Battery Level: A visual meter for consistency and engagement.
- Curriculum: Your 97‑day plan tailored to your niche.
- Mentor: The chat experience where you ask in‑depth questions.
- Recovery Suggestions: Friendly, tailored steps to restart after a pause.

---

## Final Notes

LockIn is designed to be welcoming and practical. You don’t need to be technical to use it — just curious and committed to small, steady progress. Choose a niche, set modest goals, show up daily (even briefly), and let LAI guide you. Celebrate your wins, learn from your pauses, and keep moving forward.