import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Calendar, Home, Settings, User } from 'lucide-react-native';

export default function AuthLayout() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen name="leaveRequestList" options={{ headerShown: false }} />
        <Stack.Screen name="leaveRequestDetail" options={{ headerShown: false }} />
        <Stack.Screen name="applySickLeave" options={{ headerShown: false }} />
        <Stack.Screen name="applyLeave" options={{ headerShown: false }} />
        <Stack.Screen name="shiftListPage" options={{ headerShown: false }} />
        <Stack.Screen name="shiftDetail" options={{ headerShown: false }} />
      </Stack>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/shiftListPage')}>
          <Calendar style={styles.navIcon} />
          <Text style={styles.navText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/tabs/leaveRequestList')}>
          <Calendar style={styles.navIcon} />
          <Text style={styles.navText}>Leave</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
          <Home style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <User style={styles.navIcon} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/settings')}>
          <Settings style={styles.navIcon} />
          <Text style={styles.navText}>Setting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
  },
});