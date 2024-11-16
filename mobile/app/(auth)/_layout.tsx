import Header from "@/components/Header";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function AuthLayout() {
  return (
    <>
      <SafeAreaView>
        <Header />
      </SafeAreaView>

      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Verify" }}
        />
        <Stack.Screen
          name="register"
          options={{ headerShown: false, title: "Register" }}
        />

        <Stack.Screen
          name="login"
          options={{ headerShown: false, title: "Login" }}
        />
      </Stack>
    </>
  );
}
