# LockIn - 97-Day Learning Commitment App

A production-ready React Native app built with Expo that helps users commit to a 97-day learning journey with AI-powered coaching, progress tracking, and community features.

## 🚀 Features

### Core Features
- **97-Day Commitment Flow**: Complete onboarding with niche selection, goal setting, and schedule preferences
- **Battery-Style Progress Indicator**: Visual progress tracking with animated SVG components
- **AI-Powered Coach**: Context-aware guidance with TTS narration and recovery suggestions
- **LAI (Learning AI) Tab**: Personalized 90-day curriculum generation based on selected niche
- **Background Inactivity Detection**: Smart recovery suggestions when users miss days
- **Dark/Light Theme Toggle**: Professional UI with smooth theme transitions
- **Real-time Notifications**: Streak reminders, milestone celebrations, and motivational messages

### Technical Features
- **Cross-Platform**: Runs on iOS, Android, and Web
- **TypeScript**: Full type safety throughout the codebase
- **Zustand State Management**: Efficient state management with persistence
- **Modular Architecture**: Clean separation of concerns with service layers
- **API Integration**: Easy backend endpoint configuration
- **Background Jobs**: Inactivity detection and recovery suggestions
- **Unit Tests**: Comprehensive test coverage for core logic

## 📱 Screenshots

*Coming soon - add screenshots of the app in action*

## 🛠 Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **State Management**: Zustand with persistence
- **Navigation**: React Navigation v7
- **Styling**: React Native StyleSheet with theme system
- **Animations**: React Native Reanimated 3
- **SVG**: React Native SVG
- **Storage**: AsyncStorage with MMKV support
- **Notifications**: Expo Notifications
- **Background Tasks**: Expo Task Manager & Background Fetch
- **Testing**: Jest with React Native Testing Library
- **CI/CD**: GitHub Actions with EAS Build

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- EAS CLI (`npm install -g eas-cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lockin.git
   cd lockin
   ```

2. **Install dependencies**
   ```bash
   cd _/apps/mobile
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp config/env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Backend API Configuration
   EXPO_PUBLIC_API_URL=https://your-backend.com/api
   EXPO_PUBLIC_AI_PROXY_URL=https://your-ai-proxy.com
   
   # EAS Build Configuration
   EAS_PROJECT_ID=your-eas-project-id
   
   # AI Services (Keep these on server, not client)
   OPENAI_API_KEY=your-openai-api-key
   OPENAI_PROXY_URL=https://your-openai-proxy.com
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 🔧 Configuration

### API Endpoints

The app is designed to easily connect to your backend. Update the API configuration in `src/config/constants.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://your-backend.com/api',
  AI_PROXY_URL: process.env.EXPO_PUBLIC_AI_PROXY_URL || 'https://your-ai-proxy.com',
  // ... other config
};
```

### Backend Integration

The app expects these API endpoints:

- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile
- `GET /progress` - Get user progress
- `PUT /progress` - Update progress
- `POST /progress/complete` - Mark task complete
- `GET /curriculum` - Get user curriculum
- `POST /curriculum/generate` - Generate new curriculum
- `POST /ai/chat` - AI chat endpoint
- `GET /notifications` - Get notifications
- `PUT /notifications/settings` - Update notification settings

### AI Service Integration

The app includes a modular AI service that can work with or without a backend:

1. **With Backend**: Configure your AI proxy URL in environment variables
2. **Offline Mode**: The app includes fallback responses for when AI services are unavailable

## 🏗 Project Structure

```
_/apps/mobile/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CountdownTimer.tsx
│   │   ├── BatteryProgressIndicator.tsx
│   │   └── LiveClock.tsx
│   ├── screens/            # App screens
│   │   ├── DashboardHome.tsx
│   │   ├── Onboarding.tsx
│   │   ├── LockInLearn.tsx
│   │   ├── UserProfile.tsx
│   │   └── ProgressTracking.tsx
│   ├── navigation/         # Navigation configuration
│   ├── hooks/             # Custom React hooks
│   ├── store/             # Zustand state management
│   ├── services/          # API and business logic
│   │   ├── api/           # API service layer
│   │   ├── ai/            # AI service integration
│   │   ├── background/    # Background tasks
│   │   └── notifications.js
│   └── config/            # App configuration
├── assets/                # Images, fonts, etc.
├── tests/                 # Unit tests
└── app.config.ts         # Expo configuration
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## 🚀 Deployment

### EAS Build Setup

1. **Login to EAS**
   ```bash
   eas login
   ```

2. **Configure project**
   ```bash
   eas build:configure
   ```

3. **Build for development**
   ```bash
   eas build --profile development --platform ios
   eas build --profile development --platform android
   ```

4. **Build for production**
   ```bash
   eas build --profile production --platform all
   ```

### App Store Deployment

1. **Submit to App Store**
   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

2. **Update app store metadata** in `app.config.ts`

## 🔐 Security & Privacy

### API Key Management
- **Never store API keys in the client app**
- Use environment variables for configuration
- Implement server-side proxy for AI services
- Use secure storage for sensitive data

### Privacy Considerations
- User data is stored locally by default
- Implement proper data encryption for sensitive information
- Follow GDPR/CCPA guidelines for data collection
- Provide clear privacy policy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Follow the existing code style
- Ensure all tests pass before submitting

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EXPO_PUBLIC_API_URL` | Backend API base URL | Yes |
| `EXPO_PUBLIC_AI_PROXY_URL` | AI service proxy URL | No |
| `EAS_PROJECT_ID` | EAS project ID for builds | Yes |
| `OPENAI_API_KEY` | OpenAI API key (server-side only) | No |
| `SENTRY_DSN` | Sentry error tracking DSN | No |
| `ANALYTICS_KEY` | Analytics service key | No |

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **iOS build failures**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android build failures**
   ```bash
   npx expo run:android --clear
   ```

4. **Notification permissions**
   - Ensure proper permissions are requested
   - Check device notification settings
   - Verify notification channels on Android

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Expo team for the amazing development platform
- React Native community for excellent libraries
- Contributors and testers who helped improve the app

## 📞 Support

- Create an issue for bug reports
- Start a discussion for feature requests
- Check the documentation for common questions

---

**Built with ❤️ for the learning community**
