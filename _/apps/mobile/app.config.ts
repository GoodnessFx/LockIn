import { ExpoConfig } from "@expo/config";

const cfg: ExpoConfig = {
name: "LockIn",
slug: "lockin",
version: "1.0.0",
scheme: "lockin",
orientation: "portrait",
newArchEnabled: true,
icon: "./assets/images/icon.png",
android: {
  package: "com.yourcompany.lockin",
  adaptiveIcon: {
    foregroundImage: "./assets/images/adaptive-icon.png",
    backgroundColor: "#0b0b0f"
  }
},
ios: {
  bundleIdentifier: "com.yourcompany.lockin",
  supportsTablet: true
},
plugins: [
  ["expo-splash-screen", { image: "./assets/images/splash-icon.png", imageWidth: 240, resizeMode: "contain", backgroundColor: "#0b0b0f" }]
],
web: { favicon: "./assets/images/favicon.png" }
};

export default cfg;

