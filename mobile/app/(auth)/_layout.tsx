import React from 'react';
import { Stack, usePathname } from 'expo-router';
import Header from "@/components/Header";

export default function AuthLayout() {
  const pathname = usePathname();

  return (
    
  <>
      {/* {pathname !== '/index' && <Header />} */}

      <Stack
        initialRouteName="index"
      >

        {/* <Stack.Screen
          name="index"
          options={{ title: "Verify Screen" }}
        /> */}

<Stack.Screen
          name="index"
          options={{
            headerTitle: "",
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
            headerShown: true,
            title: "index Screen",
          }}
        />

<Stack.Screen
          name="login"
          options={{
            headerTitle: "",
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
            headerShown: true,
            title: "login Screen",
          }}
        />

<Stack.Screen
          name="register"
          options={{
            headerTitle: "",
            headerLargeTitle: false,
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
            headerShown: true,
            title: "Register Screen",
          }}
        />

        {/* <Stack.Screen
          name="register"
          options={{ title: "Register Screen" }}
        /> */}
        {/* <Stack.Screen
          name="login"
          options={{ title: "Login Screen" }}
        /> */}
      </Stack>
      </>
  );
}
