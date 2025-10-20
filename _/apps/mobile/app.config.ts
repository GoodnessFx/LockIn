import { ExpoConfig } from "@expo/config";

const cfg: ExpoConfig = {
  name: "LockIn",
  slug: "lockin",
  version: "1.0.0",
  scheme: "lockin",
  orientation: "portrait",
  newArchEnabled: false, // Disable new architecture to avoid Hermes conflicts
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  android: {
    package: "com.lockin.app",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
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
    "expo-task-manager",
    [
      "expo-build-properties",
      {
        android: {
          enableProguardInReleaseBuilds: false,
          enableShrinkResourcesInReleaseBuilds: false,
        },
        ios: {
          newArchEnabled: false,
        },
      },
    ],
  ],
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID
    }
  }
};

export default cfg;
