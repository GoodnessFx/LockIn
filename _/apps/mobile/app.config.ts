import { ExpoConfig } from "@expo/config";

const cfg: ExpoConfig = {
  name: "LockIn",
  slug: "lockin",
  version: "1.0.0",
  scheme: "lockin",
  orientation: "portrait",
  newArchEnabled: true,
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#0b0b0f"
  },
  android: {
    package: "com.lockin.app",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#0b0b0f"
    },
    permissions: [
      "android.permission.RECORD_AUDIO",
      "android.permission.WAKE_LOCK",
      "android.permission.VIBRATE",
      "android.permission.INTERNET",
      "android.permission.ACCESS_NETWORK_STATE"
    ]
  },
  ios: {
    bundleIdentifier: "com.lockin.app",
    supportsTablet: true,
    infoPlist: {
      NSMicrophoneUsageDescription:
        "This app uses the microphone for voice narration and AI coaching features.",
      NSUserNotificationsUsageDescription:
        "This app sends notifications to help you stay on track with your 97-day commitment."
    }
  },
  plugins: [
    "expo-splash-screen",
    "expo-notifications",
    "expo-background-fetch",
    "expo-task-manager"
  ],
  web: {
    favicon: "./assets/images/favicon.png",
    bundler: "metro"
  },
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID
    }
  }
};

export default cfg;
