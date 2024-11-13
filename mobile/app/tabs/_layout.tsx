import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="leaveRequestList" options={{ headerShown: false }} />
      <Stack.Screen name="leaveRequestDetail" options={{ headerShown: false }} />
      <Stack.Screen name="applySickLeave" options={{ headerShown: false }} />
      <Stack.Screen name="applyLeave" options={{ headerShown: false }} />
      <Stack.Screen name="shiftListPage" options={{ headerShown: false }} />
      <Stack.Screen name="shiftDetail" options={{ headerShown: false }} />
    </Stack>
  );
}