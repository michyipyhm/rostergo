import { Button, SafeAreaView } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { useAuthStore } from "../store/auth";
import React, { useState, useEffect  } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  OtpResponse,
  sendOtp,
  verifyOtp,
  VerifyOtpResponse,
} from "@/api/auth-api";
import { X } from "lucide-react-native";
import { checkAuth, getUserData } from "@/api/auth-api";
import { useRouter, useLocalSearchParams} from "expo-router";

export default function verifyMobileNumberScreen() {
  const router = useRouter();
  const { phoneNumber, setPhoneNumber, setVerified } = useAuthStore();
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const { justLoggedOut } = useLocalSearchParams();

  const handleSendOtp = () => {
    if (phoneNumber.length === 8) {
      console.log(phoneNumber);
      sendOtpMutation.mutate(phoneNumber);
      console.log("after sendOtpMutation", sendOtpMutation);
    } else {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid 8-digit phone number."
      );
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      verifyOtpMutation.mutate({ phoneNumber, otp });
    } else {
      Alert.alert("Invalid OTP", "Please enter the correct 6-digit OTP.");
    }
  };

  const sendOtpMutation = useMutation<OtpResponse, Error, string>({
    mutationFn: (phone: string) => sendOtp(phone),
    onSuccess: (data) => {
      if (data.redirectToVerifyOtp) {
        setOtpSent(true);
        Alert.alert("OTP Sent", "An OTP has been sent to your phone.");
      } else if (data.redirectToLogin) {
        router.push("/login");
      }
    },
    onError: () => {
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    },
  });

  const verifyOtpMutation = useMutation<
    VerifyOtpResponse,
    Error,
    { phoneNumber: string; otp: string }
  >({
    mutationFn: ({ phoneNumber, otp }) => verifyOtp(phoneNumber, otp),
    onSuccess: (data) => {
      console.log("after verifyOtpMutation", data);
      if (data.redirectToRegister) {
        setVerified(true);
        Alert.alert("Success", "OTP verified successfully!", [
          { text: "OK", onPress: () => router.push("/register") },
        ]);
      }
    },
    onError: () => {
      Alert.alert("Error", "Failed to verify OTP. Please try again.");
    },
  });

  useEffect(() => {
    if (!justLoggedOut) {
      checkAuthStatus();
    }
  }, [justLoggedOut]);

  const checkAuthStatus = async () => {
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
      const userData = await getUserData();
      if (userData) {
        router.replace("/(tabs)");
      }
    }
  };

  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>What's your phone number?</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.prefix}>+852</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          maxLength={8}
        />
        {phoneNumber.length > 0 && (
          <TouchableOpacity
            onPress={() => setPhoneNumber("")}
            style={styles.clearButton}
          >
            <X size={16} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          phoneNumber.length !== 8 && styles.buttonDisabled,
        ]}
        onPress={handleSendOtp}
        disabled={phoneNumber.length !== 8 || sendOtpMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {sendOtpMutation.isPending ? "Sending..." : "Next"}
        </Text>
      </TouchableOpacity>

      {otpSent && (
        <>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.otpInput}
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter verification code"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, otp.length !== 6 && styles.buttonDisabled]}
            onPress={handleVerifyOtp}
            disabled={otp.length !== 6 || verifyOtpMutation.isPending}
          >
            <Text style={styles.buttonText}>
              {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
            </Text>
          </TouchableOpacity>
        </>
      )}

      <Button onPress={() => router.push("/(auth)/login")} title="Log In" />
      <Button
        onPress={() => router.push("/(auth)/register")}
        title="Register"
      />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 32,
    color: "#000",
    textAlign: "center",
    marginTop: 40,
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
  prefix: {
    fontSize: 16,
    color: "#000",
    marginRight: 12,
    fontWeight: "400",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    padding: 0,
    height: 40,
  },
  clearButton: {
    padding: 4,
  },
  helperText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  button: {
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
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  otpInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    padding: 0,
    height: 40,
  },
});
