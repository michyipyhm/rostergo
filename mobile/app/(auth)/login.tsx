import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  Button,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { login } from "@/api/auth-api";

export default function Login() {
  const router = useRouter();
  const [nickname, setNickname] = useState("ft1");
  const [password, setPassword] = useState("123123");
  const apiUrl = process.env.EXPO_PUBLIC_SERVER_HOST;

  const handleLogin = async () => {
    console.log(apiUrl);
    // Here you would typically handle the login logic

    if (nickname && password) {
      const data = await login(nickname, password);
      console.log(data);
      router.navigate("/(tabs)");

      Alert.alert("Login Successful", `Welcome, ${data}!`);
    } else {
      Alert.alert("Error", "Please enter both username and password.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Nickname"
          value={nickname}
          onChangeText={setNickname}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Submit" onPress={handleLogin} />

        {/* <Button onPress={() => router.navigate("/(tabs)")} title="Login Success" /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a1321",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: "#fff",
  },
  loginButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
