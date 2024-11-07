import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomKeypad from '../components/CustomKeypad';

export default function PhoneVerificationScreen({ navigation }: { navigation: any }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNumberPress = (num: string) => {
    if (phoneNumber.length < 8) {
      setPhoneNumber(prev => prev + num);
    }
  };

  const handleDelete = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handleVerify = () => {
    if (phoneNumber.length === 8) {
      navigation.navigate('Calendar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's your phone number?</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.countryCode}>+852</Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </View>
      <Text style={styles.description}>
        We will send you a code to verify your number
      </Text>
      <TouchableOpacity
        style={[styles.verifyButton, phoneNumber.length === 8 && styles.verifyButtonActive]}
        onPress={handleVerify}
        disabled={phoneNumber.length !== 8}
      >
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
      <CustomKeypad onNumberPress={handleNumberPress} onDelete={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 60,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
    marginBottom: 10,
  },
  countryCode: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  phoneNumber: {
    fontSize: 16,
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  verifyButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  verifyButtonActive: {
    backgroundColor: '#007AFF',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

