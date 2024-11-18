import Header from "@/components/Header";
import { Redirect, Stack, usePathname } from "expo-router";
import { SafeAreaView } from "react-native";

export default function AuthLayout() {
  const pathname = usePathname();

  return (
    <>
      {pathname !== '/index' && (
        <SafeAreaView>
          <Header />
        </SafeAreaView>
      )}

      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Verify Screen" }}
        />
        <Stack.Screen
          name="register"
          options={{ headerShown: false, title: "Register Screen" }}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false, title: "Login Screen" }}
        />
      </Stack>
    </>
  );
}