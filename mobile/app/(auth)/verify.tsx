import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store/auth';
import { mountStoreDevtool } from 'simple-zustand-devtools';


export default function VerifyScreen() {
  const router = useRouter();
  const { phoneNumber, setPhoneNumber, setVerified } = useAuthStore();
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOtp = () => {
    if (phoneNumber.length === 8) {
      const newOtp = generateOtp();
      setGeneratedOtp(newOtp);
      setOtpSent(true);
      Alert.alert('OTP Sent', `Your OTP is: ${newOtp}`);
    } else {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 8-digit phone number.');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setVerified(true);
      Alert.alert('Success', 'OTP verified successfully!', [
        { text: 'OK', onPress: () => router.push('/calendar') }
      ]);
    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Phone Number</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter your 8-digit phone number"
          keyboardType="phone-pad"
          maxLength={8}
        />
      </View>
      <Text style={styles.description}>
        We will send you a code to verify your number
       </Text>
       <TouchableOpacity
        style={[styles.button, phoneNumber.length !== 8 && styles.buttonDisabled]}
        onPress={handleSendOtp}
        disabled={phoneNumber.length !== 8}
      >
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
      
      {otpSent && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter OTP:</Text>
            <TextInput
              style={styles.input}
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter the 6-digit OTP"
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, otp.length !== 6 && styles.buttonDisabled]}
            onPress={handleVerifyOtp}
            disabled={otp.length !== 6}
          >
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    paddingTop: 100,
    // justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  description: {
        fontSize: 14,
        color: "#666",
        marginBottom: 30,
      },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Platform,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { useAuthStore } from "../store/auth";
// import CustomKeypad from "../components/CustomKeypad";

// // Only import OTPVerify on Android
// const OTPVerify =
//   Platform.OS === "android" ? require("react-native-otp-verify") : null;

// export default function PhoneVerificationScreen() {
//   const router = useRouter();
//   const { phoneNumber, setPhoneNumber, setVerified } = useAuthStore();
//   const [otp, setOtp] = useState("");
//   const [isFocused, setIsFocused] = useState(false);

//   const handlePhoneNumberChange = (text: string) => {
//     // Only allow digits and limit to 8 characters
//     const cleanedText = text.replace(/[^0-9]/g, "").slice(0, 8);
//     setPhoneNumber(cleanedText);
//   };

//   useEffect(() => {
//     if (Platform.OS === "android") {
//       // Android-specific OTP setup
//       OTPVerify.getHash()
//         .then((hash: string[]) => console.log("SMS Hash:", hash))
//         .catch(console.log);

//       OTPVerify.addListener((message: string) => {
//         try {
//           if (message) {
//             const receivedOtp = /(\d{6})/.exec(message);
//             if (receivedOtp) {
//               setOtp(receivedOtp[1]);
//             }
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       });

//       // Clean up listener on component unmount
//       return () => {
//         OTPVerify.removeListener();
//       };
//     }
//   }, []);

//   const handleVerify = () => {
//     if (phoneNumber.length === 8) {
//       // Here you would typically send the OTP to the user's phone
//       // For this example, we'll just simulate it
//       Alert.alert("OTP Sent", "An OTP has been sent to your phone.");
//     }
//   };

//   const handleOtpChange = (text: string) => {
//     setOtp(text);
//     if (text.length === 6) {
//       // Verify OTP
//       // This is where you'd typically send the OTP to your backend for verification
//       // For this example, we'll just simulate a successful verification
//       setVerified(true);
//       router.push("/calendar");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>What's your phone number?</Text>
//       <View style={styles.inputContainer}>
//         <Text style={styles.countryCode}>+852</Text>
//         <TextInput
//           style={styles.phoneNumberInput}
//           value={phoneNumber}
//           onChangeText={handlePhoneNumberChange}
//           keyboardType="number-pad"
//           maxLength={8}
//           placeholder="Enter your phone number"
//           placeholderTextColor="#999"
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//         />
//       </View>
//       <Text style={styles.description}>
//         We will send you a code to verify your number
//       </Text>
//       <TouchableOpacity
//         style={[
//           styles.verifyButton,
//           phoneNumber.length === 8 && styles.verifyButtonActive,
//         ]}
//         onPress={handleVerify}
//         disabled={phoneNumber.length !== 8}
//       >
//         <Text style={styles.verifyButtonText}>Send OTP</Text>
//       </TouchableOpacity>
//       <TextInput
//         style={styles.otpInput}
//         value={otp}
//         onChangeText={handleOtpChange}
//         keyboardType="number-pad"
//         maxLength={6}
//         placeholder="Enter OTP"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "600",
//     marginTop: 60,
//     marginBottom: 30,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "#E0E0E0",
//     paddingBottom: 10,
//     marginBottom: 10,
//   },
//   inputContainerFocused: {
//     borderBottomColor: "#007AFF",
//   },
//   countryCode: {
//     fontSize: 16,
//     color: "#666",
//     marginRight: 10,
//   },
//   phoneNumberInput: {
//     fontSize: 16,
//     flex: 1,
//     color: "#000",
//     padding: 0,
//   },
//   description: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 30,
//   },
//   verifyButton: {
//     backgroundColor: "#E0E0E0",
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   verifyButtonActive: {
//     backgroundColor: "#007AFF",
//   },
//   verifyButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   otpInput: {
//     borderWidth: 1,
//     borderColor: "#E0E0E0",
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 18,
//     textAlign: "center",
//     marginBottom: 20,
//   },
// });
