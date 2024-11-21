import { useRouter } from "expo-router";
import {
  SafeAreaView,
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { mobileChangePassword } from "@/api/change-password-api";

export default function changePassword() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await mobileChangePassword(currentPassword, newPassword);
      Alert.alert("Success", "Password changed successfully");
      router.push("/login");
    } catch (error) {
      Alert.alert("Error", "Failed to change password");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
      <View style={styles.content}>

        <View style={styles.spacerRow}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // backgroundColor: "#f0f0f0",
  },
  contentContainer: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  content:{
    padding: 16,

  },
  spacerRow: {},
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
  button: {
    alignItems: 'center',
    backgroundColor: '#0A1423',
    paddingVertical: 14,
    borderRadius: 25,
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    alignItems: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
