import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { login } from "../api/auth-api";

export default function LoginScreen() {
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
      // router.push('calendar');
      router.push("calendar");

      Alert.alert("Login Successful", `Welcome, ${data}!`);
    } else {
      Alert.alert("Error", "Please enter both username and password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a1321",
    justifyContent: "space-between",
    padding: 20,
    paddingBottom: 120,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 5,
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
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: "#fff",
  },
});

// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// export default function LoginScreen({ navigation }: { navigation: any }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.logoContainer}>
//         <Image
//           source={require('../assets/logo.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//         <Text style={styles.logoText}>rostergo</Text>
//       </View>
//       <TouchableOpacity
//         style={styles.loginButton}
//         onPress={() => navigation.navigate('PhoneVerification')}
//       >
//         <Text style={styles.loginButtonText}>LOGIN</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1A1A1A',
//     justifyContent: 'space-between',
//     padding: 20,
//     paddingBottom: 40,
//   },
//   logoContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 10,
//   },
//   logoText: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: '500',
//   },
//   loginButton: {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
