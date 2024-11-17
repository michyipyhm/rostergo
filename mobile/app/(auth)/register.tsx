import { useRouter } from "expo-router";
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { useAuthStore } from "../store/auth";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth-api";


interface RegisterData {
  nickname: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  
}


export default function RegisterScreen() {
  const router = useRouter();
  const { phoneNumber } = useAuthStore();
  const [formData, setFormData] = useState<RegisterData>({
    nickname: 'michaelyip',
    password: '123456',
    confirmPassword: '123456',
    gender: 'male',
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => register({
      nickname: data.nickname,
      password: data.password,
      gender: data.gender,
      phone: phoneNumber,
    }),
    onSuccess: (data) => {
      console.log("register result*****", data);
      if (data) {
        Alert.alert('Success', data.message, [
          { text: 'OK', onPress: () => router.push('/login') }
        ]);
      } else {
        Alert.alert('Error');
      }
    },
    onError: (error) => {
      Alert.alert('Error', 'Registration failed. Please try again.');
    },
  });

  const handleRegister = () => {
    // Validation
    if (!formData.nickname.trim()) {
      Alert.alert('Error', 'Please enter a nickname');
      return;
    }
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    registerMutation.mutate(formData);
  };


  return (
    <SafeAreaView style={styles.container}>
<Text style={styles.title}>Create Account</Text>
      
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Nickname</Text>
        <TextInput
          style={styles.input}
          value={formData.nickname}
          onChangeText={(text) => setFormData({ ...formData, nickname: text })}
          placeholder="Enter your nickname"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          placeholder="Confirm your password"
          placeholderTextColor="#999"
          secureTextEntry
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              formData.gender === 'male' && styles.genderButtonActive,
            ]}
            onPress={() => setFormData({ ...formData, gender: 'male' })}
          >
            <Text
              style={[
                styles.genderButtonText,
                formData.gender === 'male' && styles.genderButtonTextActive,
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              formData.gender === 'female' && styles.genderButtonActive,
            ]}
            onPress={() => setFormData({ ...formData, gender: 'female' })}
          >
            <Text
              style={[
                styles.genderButtonText,
                formData.gender === 'female' && styles.genderButtonTextActive,
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      
      <Text>Login</Text>
    </SafeAreaView>
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
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: '#000',
    padding: 0,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  genderButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  genderButtonText: {
    fontSize: 16,
    color: '#666',
  },
  genderButtonTextActive: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});