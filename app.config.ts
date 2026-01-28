import { ExpoConfig } from "@expo/config";

const cfg: ExpoConfig = {
  name: "LockIn",
  slug: "lockin",
  version: "1.0.0",
  scheme: "lockin",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    bundleIdentifier: "com.lockin.app",
    buildNumber: "1.0.0",
    supportsTablet: true,
    infoPlist: {
      NSCameraUsageDescription: "Allow LockIn to use your camera for profile photos",
      NSPhotoLibraryUsageDescription: "Allow LockIn to access your photo library to select profile photos",
      ITSAppUsesNonExemptEncryption: false
    }
  },
  platforms: [
    "ios",
    "android"
  ],
  plugins: [
    "expo-router",
    "expo-font"
  ],
  android: {
    package: "com.lockin.app",
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    permissions: ["CAMERA"]
  },
  extra: {
    eas: {
      projectId: "f8a06781-8114-4ec5-9cf4-53ecdca858a6"
    }
  }
};

export default cfg;
