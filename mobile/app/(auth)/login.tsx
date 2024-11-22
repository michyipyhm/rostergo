import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter} from "expo-router";
import { login} from "@/api/auth-api";

export default function Login() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

 
  const handleLogin = async () => {
    // Here you would typically handle the login logic

    if (nickname && password) {
      const data = await login(nickname, password);

      const alertName = data.payload.nickname;

      router.navigate("/(tabs)");

      Alert.alert("Login Successful", `Welcome, ${alertName}!`);
    } else {
      Alert.alert("Error", "Please enter both username and password.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Please sign in to continue.</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Nickname"
          value={nickname}
          onChangeText={setNickname}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* <Button onPress={() => router.navigate("/(tabs)")} title="Login Success" /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#b7b7b7",
    textAlign: "center",
    marginBottom: 60,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E1E1",
    paddingBottom: 5,
    marginBottom: 16,
    marginRight: 25,
    marginLeft: 25,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    padding: 0,
    height: 40,
  },
  loginButton: {
    backgroundColor: "#0a1321",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 15,
    marginLeft: 35,
    marginRight: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
