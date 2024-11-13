import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store/auth';
import { OtpResponse, sendOtp, verifyOtp, VerifyOtpResponse } from '../api/auth-api';
import { useMutation } from '@tanstack/react-query';
import { X } from 'lucide-react-native';

export default function VerifyScreen() {
  const router = useRouter();
  const { phoneNumber, setPhoneNumber, setVerified } = useAuthStore();
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

 

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

 const sendOtpMutation = useMutation<OtpResponse, Error, string>({
    mutationFn: (phone: string) => sendOtp(phone),
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

  const verifyOtpMutation = useMutation<VerifyOtpResponse, Error, { phoneNumber: string; otp: string }>({
    mutationFn: ({ phoneNumber, otp }) => verifyOtp(phoneNumber, otp),
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
  
  return (
    <View style={styles.container}>
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
          <TouchableOpacity onPress={() => setPhoneNumber('')} style={styles.clearButton}>
            <X size={16} color="#999" />
          </TouchableOpacity>
        )}
      </View>
    

      <TouchableOpacity
        style={[styles.button, phoneNumber.length !== 8 && styles.buttonDisabled]}
        onPress={handleSendOtp}
        disabled={phoneNumber.length !== 8 || sendOtpMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {sendOtpMutation.isPending ? 'Sending...' : 'Next'}
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
              {verifyOtpMutation.isPending ? 'Verifying...' : 'Verify OTP'}
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
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 32,
    color: '#000',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
    paddingBottom: 8,
    marginBottom: 16,
  },
  prefix: {
    fontSize: 16,
    color: '#000',
    marginRight: 12,
    fontWeight: '400',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    padding: 0,
    height: 40,
  },
  clearButton: {
    padding: 4,
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#0a1321',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  otpInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    padding: 0,
    height: 40,
  },
});
