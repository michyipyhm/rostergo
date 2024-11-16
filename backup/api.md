import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/auth';
import { sendOtp, verifyOtp } from '../api/auth-api';
import { useMutation } from '@tanstack/react-query';

export default function VerifyScreen() {
  const router = useRouter();
  const { phoneNumber, setPhoneNumber, setVerified } = useAuthStore();
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const sendOtpMutation = useMutation(sendOtp, {
    onSuccess: (data) => {
      if (data.redirectToVerifyOtp) {
        setOtpSent(true);
        Alert.alert('OTP Sent', 'An OTP has been sent to your phone.');
      } else if (data.redirectToLogin) {
        router.push('/login');
      }
    },
    onError: () => {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    },
  });

  const verifyOtpMutation = useMutation(
    (data: { phoneNumber: string; otp: string }) => verifyOtp(data.phoneNumber, data.otp),
    {
      onSuccess: (data) => {
        if (data.redirectToLogin) {
          setVerified(true);
          Alert.alert('Success', 'OTP verified successfully!', [
            { text: 'OK', onPress: () => router.push('/login') }
          ]);
        }
      },
      onError: () => {
        Alert.alert('Error', 'Failed to verify OTP. Please try again.');
      },
    }
  );

  const handleSendOtp = () => {
    if (phoneNumber.length === 8) {
      sendOtpMutation.mutate(phoneNumber);
    } else {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 8-digit phone number.');
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      verifyOtpMutation.mutate({ phoneNumber, otp });
    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct 6-digit OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Phone Number</Text>
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
      <TouchableOpacity
        style={[styles.button, phoneNumber.length !== 8 && styles.buttonDisabled]}
        onPress={handleSendOtp}
        disabled={phoneNumber.length !== 8 || sendOtpMutation.isLoading}
      >
        <Text style={styles.buttonText}>
          {sendOtpMutation.isLoading ? 'Sending...' : 'Send OTP'}
        </Text>
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
            disabled={otp.length !== 6 || verifyOtpMutation.isLoading}
          >
            <Text style={styles.buttonText}>
              {verifyOtpMutation.isLoading ? 'Verifying...' : 'Verify OTP'}
            </Text>
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