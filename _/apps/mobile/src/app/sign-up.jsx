import { router } from "expo-router";
import {
  Image,
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
import { SafeAreaView } from "react-native-safe-area-context";
import { signIn } from "@/services/auth";
import { useState } from "react";

const sign_up = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    // For the dummy implementation, we'll just sign in the user directly
    const result = await signIn(email, password);
    if (!result.success) {
      alert(result.error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
          <View
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              padding: 10,
            }}
          >
            <View style={{ width: "100%" }}>
              <View style={{ marginBottom: 40 }}>
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Sign up to LockIn.
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 5,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity onPress={() => router.push("/sign-in")}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      Sign in
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ marginBottom: 5, fontSize: 16 }}>Name</Text>
                <TextInput
                  placeholder="Your name"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5,
                    padding: 10,
                  }}
                  onChangeText={setName}
                  value={name}
                />
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ marginBottom: 5, fontSize: 16 }}>
                  Email address
                </Text>
                <TextInput
                  placeholder="Enter email to get started"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5,
                    padding: 10,
                  }}
                  onChangeText={setEmail}
                  value={email}
                />
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ marginBottom: 5, fontSize: 16 }}>
                  Password
                </Text>
                <TextInput
                  placeholder="Enter your password"
                  secureTextEntry
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5,
                    padding: 10,
                  }}
                  onChangeText={setPassword}
                  value={password}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#007BFF",
                  padding: 15,
                  borderRadius: 5,
                  alignItems: "center",
                }}
                onPress={handleSignUp}
              >
                <Text style={{ color: "white", fontSize: 16 }}>Sign up</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "#ccc",
                    marginRight: 10,
                  }}
                />
                <Text>Or continue with</Text>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "#ccc",
                    marginLeft: 10,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5,
                    padding: 15,
                    width: "25%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/281/281764.png",
                    }}
                    style={{ width: 25, height: 25 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5,
                    padding: 15,
                    width: "25%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/5969/5969020.png",
                    }}
                    style={{ width: 25, height: 25 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5,
                    padding: 15,
                    width: "25%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/25/25231.png",
                    }}
                    style={{ width: 25, height: 25 }}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{ textAlign: "center", marginTop: 20, fontSize: 12 }}
              >
                By creating an account you agree with our Terms of Service and
                our Privacy Policy
              </Text>
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default sign_up;
const styles = StyleSheet.create({});