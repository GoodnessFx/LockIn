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
  android: {
    package: "com.lockin.app",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    }
  },
  ios: {
    bundleIdentifier: "com.lockin.app",
    supportsTablet: true
  },
  plugins: [
    // Only include plugins that are actually installed
  ],
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID
    }
  }
};

export default cfg;