
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Calendar, Home, Settings, User } from 'lucide-react-native';
import { useAuthStore } from '../store/auth';
import { Redirect } from 'expo-router';

export default function CalendarLayout() {
  const router = useRouter();
//   const { isAuthenticated } = useAuthStore();

  // Protect the calendar routes - redirect to login if not authenticated
//   if (!isAuthenticated) {
//     return <Redirect href="/(auth)/login" />;
//   }

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Calendar</Text>
      <Text style={styles.greeting}>Hi</Text>
    </View>
    
    <Stack>
      <Stack.Screen 
        name="index"
        options={{
          headerShown: false,
        }}
      />
      {/* Add other calendar-related screens here */}<Stack.Screen name="leaveRequestList" options={{ headerShown: false }} />
        <Stack.Screen name="leaveRequestDetail" options={{ headerShown: false }} />
        <Stack.Screen name="applySickLeave" options={{ headerShown: false }} />
        <Stack.Screen name="applyLeave" options={{ headerShown: false }} />
        <Stack.Screen name="shiftListPage" options={{ headerShown: false }} />
        <Stack.Screen name="shiftDetail" options={{ headerShown: false }} />
    </Stack>

    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/shiftListPage')}>
        <Calendar style={styles.navIcon} />
        <Text style={styles.navText}>Shift</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/leaveRequestList')}>
          <Calendar style={styles.navIcon} />
          <Text style={styles.navText}>Leave</Text>
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
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
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