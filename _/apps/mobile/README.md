# LockIn - 97-Day Commitment App

A production-ready React Native app built with Expo that helps users commit to a 97-day transformation journey with AI-powered coaching, progress tracking, and community features.

## 🚀 Features

### Core Features
- **97-Day Commitment Flow**: Onboarding, countdown timer, and recovery suggestions
- **Battery-Style Progress Indicator**: Visual progress tracking with animated SVG
- **AI-Powered Coach**: Code explanations, growth feedback, TTS narration, and context-aware guidance
- **LAI Tab**: Dynamic curriculum generation for selected niches with persistent AI sidebar
- **Background Job**: Inactivity detection, missed day summaries, and recovery actions
- **Community Features**: Connect users to gigs, projects, and collaborators
- **Dark Minimal Theme**: Professional UI with smooth animations and transitions

### Technical Features
- **TypeScript**: Full type safety throughout the codebase
- **Modular Architecture**: Clean separation of concerns with layered architecture
- **State Management**: Zustand for efficient state management
- **Navigation**: Expo Router with tab and stack navigation
- **Animations**: React Native Reanimated and Moti for smooth animations
- **Notifications**: Expo Notifications with rich payloads and deep linking
- **Background Tasks**: Expo Task Manager and Background Fetch
- **TTS**: Expo Speech for voice narration
- **Storage**: AsyncStorage with optional MMKV support

## 📱 Screens

- **SplashScreen**: Animated professional design with LockIn branding
- **Onboarding**: Collects niche, goal, schedule, and voice preferences
- **Dashboard**: Countdown timer, battery progress, live clock, streaks, quick actions
- **Progress Tracking**: Day-by-day log, missed days, recovery plans
- **LAI (Learn)**: Dynamic curriculum with persistent AI assistant sidebar
- **Profile**: Settings, data export, subscription status
- **Lockmate**: Community features (coming soon)

## 🛠 Tech Stack

- **Framework**: Expo SDK 54 (managed workflow)
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State**: Zustand
- **Styling**: React Native StyleSheet with theme system
- **Storage**: @react-native-async-storage/async-storage
- **AI**: OpenAI with server proxy pattern
- **TTS**: Expo Speech
- **Notifications**: Expo Notifications
- **Background**: Expo Task Manager & Background Fetch
- **Animations**: React Native Reanimated, Moti
- **SVG**: React Native SVG
- **HTTP**: Axios
- **Testing**: Jest, @testing-library/react-native
- **Linting**: ESLint, Prettier, Husky

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone and navigate to the project:**
```bash
git clone <your-repo-url>
cd LockIn/_/apps/mobile
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables:**
```bash
cp config/env.example .env
```

Edit `.env` with your configuration:
```env
# API Configuration
EXPO_PUBLIC_API_URL=https://your-backend.com/api
EXPO_PUBLIC_AI_PROXY_URL=https://your-ai-proxy.com

# EAS Configuration
EAS_PROJECT_ID=your-eas-project-id

# Optional: Error Monitoring
SENTRY_DSN=your-sentry-dsn
```

4. **Start the development server:**
```bash
npm start
# or
yarn start
```

5. **Run on device/simulator:**
```bash
# Android
npm run android
# or
yarn android

# iOS
npm run ios
# or
yarn ios
```

## 🏗 Project Structure

```
src/
├── app/                    # Expo Router pages
│   ├── _layout.jsx        # Root layout with providers
│   ├── onboarding.jsx     # Onboarding flow
│   ├── index.jsx          # Home redirect
│   ├── +not-found.tsx     # 404 page
│   └── (tabs)/            # Tab navigation
│       ├── _layout.jsx    # Tab layout
│       ├── dashboard.jsx  # Main dashboard
│       ├── lai.jsx        # Learning AI interface
│       ├── lockmate.jsx   # Community features
│       ├── progress.jsx   # Progress tracking
│       └── profile.jsx    # User profile
├── components/             # Reusable UI components
│   ├── BatteryProgressIndicator.tsx
│   ├── CountdownTimer.tsx
│   ├── ErrorBoundary.tsx
│   └── LiveClock.tsx
├── hooks/                  # Custom React hooks
│   └── ThemeProvider.tsx
├── services/               # Business logic layer
│   ├── ai/                # AI services
│   ├── api/               # API adapters
│   ├── background/        # Background tasks
│   └── notifications.js   # Notification service
├── store/                 # State management
│   └── appStore.ts
├── utils/                 # Utility functions
│   └── auth/              # Authentication utilities
└── config/                # Configuration
    └── constants.ts
```

## 🔧 Configuration

### App Configuration (`app.config.ts`)
- Bundle identifiers for iOS/Android
- App icons and splash screens
- Permissions and capabilities
- EAS project configuration

### EAS Build (`eas.json`)
- Development and production build profiles
- Environment-specific configurations
- Build optimization settings

### Environment Variables
Required environment variables are documented in `config/env.example`:

```env
# Backend API
EXPO_PUBLIC_API_URL=https://your-backend.com/api
EXPO_PUBLIC_AI_PROXY_URL=https://your-ai-proxy.com

# EAS Build
EAS_PROJECT_ID=your-eas-project-id

# Optional Services
SENTRY_DSN=your-sentry-dsn
```

## 🧪 Testing

### Run Tests
```bash
npm test
# or
yarn test
```

### Test Coverage
```bash
npm run test:coverage
# or
yarn test:coverage
```

### Test Structure
- **Unit Tests**: Core logic (countdown, curriculum generation)
- **Component Tests**: UI component behavior
- **Integration Tests**: Navigation and state management
- **E2E Tests**: Critical user flows

## 🚀 Deployment

### EAS Build

1. **Install EAS CLI:**
```bash
npm install -g eas-cli
```

2. **Login to Expo:**
```bash
eas login
```

3. **Configure project:**
```bash
eas build:configure
```

4. **Build for development:**
```bash
eas build --profile development --platform android
eas build --profile development --platform ios
```

5. **Build for production:**
```bash
eas build --profile production --platform android
eas build --profile production --platform ios
```

### App Store Submission

1. **Submit to stores:**
```bash
eas submit --platform android
eas submit --platform ios
```

2. **Update app store listings** with screenshots and descriptions

## 🔄 CI/CD

### GitHub Actions Workflow
The project includes a comprehensive CI workflow that:
- Runs linting and type checking
- Executes unit and integration tests
- Triggers EAS preview builds on PRs
- Deploys to production on main branch

### Manual CI Steps
```bash
# Lint code
npm run lint

# Type check
npm run type-check

# Run tests
npm test

# Build for testing
eas build --profile preview
```

## 🔐 Security & Privacy

### API Key Management
- **Never store OpenAI keys on client**
- Use server proxy pattern for AI requests
- Environment variables for sensitive data
- Secure storage for user tokens

### Privacy Policy
- Data collection transparency
- User consent for notifications
- Data retention policies
- Export and deletion options

## 🎨 Customization

### Theme System
The app uses a comprehensive theme system in `config/constants.ts`:

```typescript
export const theme = {
  colors: {
    primary: "#6C5CE7",
    backgroundLight: "#ffffff",
    backgroundDark: "#0b0b0f",
    // ... more colors
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  typography: { h1: { fontSize: 32, fontWeight: '800' } }
};
```

### Adding New Features
1. Create components in `src/components/`
2. Add screens in `src/app/`
3. Implement business logic in `src/services/`
4. Update state management in `src/store/`
5. Add tests in `tests/`

## 📊 Analytics & Monitoring

### Error Tracking
- Sentry integration for error monitoring
- Custom error boundaries
- Performance monitoring

### Analytics
- User engagement tracking
- Feature usage analytics
- Performance metrics

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Implement changes with tests
3. Run linting and tests
4. Create pull request
5. Code review and merge

### Code Standards
- TypeScript for type safety
- ESLint and Prettier for formatting
- Husky for pre-commit hooks
- Conventional commits

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Common Issues

**Metro bundler issues:**
```bash
npx expo start --clear
```

**Android SDK not found:**
Set `ANDROID_HOME` environment variable to your Android SDK path.

**iOS build issues:**
Ensure Xcode and iOS Simulator are properly installed.

### Getting Help
- Check the [Expo documentation](https://docs.expo.dev/)
- Review [React Native documentation](https://reactnative.dev/)
- Open an issue in this repository

## 🎯 Roadmap

### Version 0.2.0
- [ ] Enhanced AI curriculum generation
- [ ] Social features and community
- [ ] Advanced analytics dashboard
- [ ] Offline mode support

### Version 0.3.0
- [ ] Subscription management
- [ ] Advanced progress tracking
- [ ] Integration with external learning platforms
- [ ] Multi-language support

---

**Built with ❤️ using Expo and React Native**