import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="leaveRequestList" options={{ headerShown: false }} />
      <Stack.Screen name="leaveRequestDetail" options={{ headerShown: false }} />
      <Stack.Screen name="applySickLeave" options={{ headerShown: false }} />
    </Stack>
  );
}