import React from 'react';
import {Alert, SafeAreaView, Button, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
// import { mobileLogout } from '@/api/logout-api';
import { logout } from '@/api/auth-api'
import { useQuery } from "@tanstack/react-query";

export default function settings() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout
      Alert.alert("Success", "Logout successfully");
      router.push({
        pathname: '/login',
        params: { justLoggedOut: 'true' }
      });
    } catch (error) {
      Alert.alert("Error");
      router.push('/login');  
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/changePassword')}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
  },
});
