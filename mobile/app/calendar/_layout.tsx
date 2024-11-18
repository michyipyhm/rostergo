import { Stack } from 'expo-router';
import { useAuthStore } from '../store/auth';
import { Redirect } from 'expo-router';

export default function CalendarLayout() {
//   const { isAuthenticated } = useAuthStore();

  // Protect the calendar routes - redirect to login if not authenticated
//   if (!isAuthenticated) {
//     return <Redirect href="/(auth)/login" />;
//   }

  return (
    <Stack>
      
      <Stack.Screen
        name="index"
        options={{
          title: 'Calendar',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#000',
          },
        }}
      />
      {/* Add other calendar-related screens here */}
    </Stack>
  );
}
