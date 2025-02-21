import React from "react";
import {
  Alert,
  SafeAreaView,
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { logout } from '@/api/auth-api'
import { useQuery } from "@tanstack/react-query";

export default function settings() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Success", "Logout successfully");
      router.push({
        pathname: '/(auth)/login',
        params: { justLoggedOut: 'true' }
      });
    } catch (error) {
      Alert.alert("Error");
      // router.push("/login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/changePassword")}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0A1423",
    paddingVertical: 16,
    borderRadius: 25,
    marginHorizontal: 16,
    marginVertical: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    alignItems: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
