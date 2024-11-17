import React from 'react';
import { SafeAreaView, Button, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";

export default function settings() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>settings</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/changePassword')}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]}>
        <Text style={[styles.buttonText, styles.logoutButtonText]}>Logout</Text>
      </TouchableOpacity>

      <Button
        // onPress={() => router.push("/(tabs)/(profile)/editProfile")}
        title="Go somewhere"
      />
    </SafeAreaView>
  );
}