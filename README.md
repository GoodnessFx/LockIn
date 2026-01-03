# LockIn

LockIn is a high-performance, cross-platform mobile application designed to facilitate structured learning, habit tracking, and community engagement. Built with React Native and Expo, it leverages a modern, scalable architecture to support millions of users with reliable offline capabilities and a fluid user experience.

## Features

- **Structured Curriculum**: Personalized learning paths with progress tracking.
- **Habit Formation**: Streak tracking, commitment batteries, and daily goals.
- **AI Mentorship**: Integrated assistant for guidance and feedback.
- **Community Engagement**: Social feeds, peer support, and shared achievements.
- **Offline-First**: Robust state management ensuring data availability without connectivity.
- **Performance**: Optimized for smooth 60fps animations and minimal battery impact.

## Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) (v0.81.5) with [Expo](https://expo.dev/) (v52.0)
- **Language**: TypeScript (Strict Mode)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (v4.0)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with Persist Middleware
- **Networking**: @react-native-community/netinfo for connectivity status
- **Styling**: React Native StyleSheet with centralized theme tokens
- **Storage**: @react-native-async-storage/async-storage

## Directory Structure

```
src/
├── app/                # Expo Router pages and layouts (file-based routing)
│   ├── (tabs)/         # Main tab navigation
│   └── _layout.tsx     # Root layout and global providers
├── components/         # Reusable, atomic UI components
├── services/           # External API integrations and business logic
├── store/              # Global state management (Zustand)
├── theme/              # Centralized design system (colors, typography)
├── types/              # Shared TypeScript definitions
└── utils/              # Pure helper functions and utilities
```

## Getting Started

### Prerequisites

- **Node.js**: LTS version (v20+ recommended)
- **Package Manager**: npm or yarn
- **Expo CLI**: `npm install -g expo-cli`
- **Mobile Environment**:
  - iOS Simulator (macOS only)
  - Android Emulator (Android Studio)
  - Physical Device with Expo Go app

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/lockin-mobile.git
    cd lockin-mobile
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npx expo start
    ```

## Development Workflow

- **Run on iOS:** Press `i` in the terminal.
- **Run on Android:** Press `a` in the terminal.
- **Run on Web:** Press `w` in the terminal (if supported).
- **Reload App:** Press `r`.
- **Open Developer Menu:** Press `m`.

## Building for Production

### iOS & Android (EAS Build)

1.  **Install EAS CLI:**
    ```bash
    npm install -g eas-cli
    ```

2.  **Configure Build:**
    ```bash
    eas build:configure
    ```

3.  **Run Build:**
    ```bash
    eas build --platform all --profile production
    ```

## Code Quality & Standards

- **Type Safety**: All new code must be strictly typed. Avoid `any`.
- **Components**: Use functional components with hooks. Keep components small and focused.
- **State**: Use local state for UI interactions and global store (Zustand) for shared data.
- **Styling**: Use the centralized theme object. Avoid hardcoded colors or magic numbers.
- **Performance**: Memoize expensive computations and callbacks (`useMemo`, `useCallback`).

## Troubleshooting

- **"Internet connection appears to be offline"**: The app includes an offline banner. Ensure your device or simulator has active network connectivity.
- **Metro Bundler Issues**: Clear cache with `npx expo start -c`.

## License

Copyright © 2024 LockIn Inc. All rights reserved.
