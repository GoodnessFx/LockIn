import { router } from "expo-router";

// Dummy authentication function
export const signIn = async (email, password) => {
  try {
    // In a real application, you would make an API call to your backend here
    // For this dummy implementation, we'll just simulate a successful login
    console.log(`Signing in with email: ${email} and password: ${password}`);

    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For now, we'll consider any non-empty email and password as valid
    if (email && password) {
      // In a real app, you would receive a token from the backend
      const dummyToken = "dummy-auth-token";

      // You would also store the user's session (e.g., in AsyncStorage)
      console.log("Dummy sign-in successful!");

      // Redirect to the main part of the app
      router.replace("/(tabs)");

      return { success: true, token: dummyToken };
    } else {
      console.log("Dummy sign-in failed. Please provide email and password.");
      return { success: false, error: "Please provide email and password." };
    }
  } catch (error) {
    console.error("An unexpected error occurred during sign-in:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
};