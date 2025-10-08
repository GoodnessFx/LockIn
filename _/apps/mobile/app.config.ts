import { ExpoConfig } from "@expo/config";

const cfg: ExpoConfig = {
name: "LockIn",
slug: "lockin",
version: "1.0.0",
android: { package: "com.yourcompany.lockin" },
ios: { bundleIdentifier: "com.yourcompany.lockin" },
web: { favicon: "./assets/favicon.png" }
};

export default cfg;

