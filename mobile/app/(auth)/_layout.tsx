import React from 'react';
import { Stack, usePathname } from 'expo-router';
import Header from "@/components/Header";

export default function AuthLayout() {
  const pathname = usePathname();

  return (
    
  <>
      {pathname !== '/index' && <Header />}

      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Verify Screen" }}
        />
        <Stack.Screen
          name="register"
          options={{ title: "Register Screen" }}
        />
        <Stack.Screen
          name="login"
          options={{ title: "Login Screen" }}
        />
      </Stack>
      </>
  );
}
