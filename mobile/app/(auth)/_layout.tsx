import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '../store/auth';

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();

  // If the user is authenticated, redirect to the main app
  if (isAuthenticated) {
    return <Redirect href="/(app)" />;
  }

  return (
    <Stack initialRouteName="register">
      <Stack.Screen
        name="register"
        options={{ headerShown: false, title: 'Register' }}
      />
      <Stack.Screen
        name="verify"
        options={{ headerShown: false, title: 'Verify' }}
      />
      <Stack.Screen
        name="login"
        options={{ headerShown: false, title: 'Login' }}
      />
    </Stack>
  );
}