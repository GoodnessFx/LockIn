import { router } from "expo-router";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/utils/auth/useAuth";
import { useState } from "react";
import { colors, spacing, typography } from "@/theme/theme";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await signIn(email, password);
      if (!result.success) {
        Alert.alert("Sign-in failed", result.error || "Please try again.");
      }
      // Success redirection is handled in service/auth.ts for now, 
      // or we can do it here if service doesn't. 
      // Currently service does it.
    } catch (err) {
      console.error("Sign-in error", err);
      Alert.alert("Sign-in error", "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title}>Sign in to LockIn.</Text>
                <View style={styles.switchRow}>
                  <Text style={styles.switchText}>Don't have an account?</Text>
                  <TouchableOpacity onPress={() => router.push("/sign-up")}>
                    <Text style={styles.switchLink}>Create a free account</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Email address</Text>
                <TextInput
                  placeholder="Enter email to get started"
                  placeholderTextColor="#666"
                  style={styles.input}
                  onChangeText={setEmail}
                  value={email}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#666"
                  secureTextEntry
                  style={styles.input}
                  onChangeText={setPassword}
                  value={password}
                />
              </View>

              <TouchableOpacity style={styles.primaryButton} onPress={handleSignIn} disabled={loading}>
                <Text style={styles.primaryButtonText}>{loading ? "Signing in..." : "Sign in"}</Text>
              </TouchableOpacity>

              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.oauthRow}>
                <TouchableOpacity style={styles.oauthButton} activeOpacity={0.8}>
                  <Ionicons name="logo-google" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.oauthButton} activeOpacity={0.8}>
                  <Ionicons name="logo-apple" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.oauthButton} activeOpacity={0.8}>
                  <Ionicons name="logo-github" size={24} color="#333" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.primaryDark,
    marginBottom: spacing.xs,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    fontSize: 16,
    color: colors.secondaryDark,
    marginRight: spacing.xs,
  },
  switchLink: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryDark,
  },
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaryDark,
    marginBottom: spacing.xs,
    textTransform: "uppercase",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.primaryDark,
    backgroundColor: "#F9F9F9",
  },
  primaryButton: {
    height: 50,
    backgroundColor: colors.primaryDark,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
    marginTop: spacing.sm,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: 14,
    color: colors.secondaryDark,
  },
  oauthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  oauthButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default SignIn;
