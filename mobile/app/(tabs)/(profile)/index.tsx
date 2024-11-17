import { useRouter } from "expo-router";
import { SafeAreaView, Button, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from 'react';

export default function Profile() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>Profile</Text>

      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>User Name</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        // onPress={() => router.push('ResetPassword')}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        // onPress={() => router.push('UserInformation')}
      >
        <Text style={styles.buttonText}>Information</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        // onPress={() => router.push('Payslips')}
      >
        <Text style={styles.buttonText}>Payslips</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
  },
});
