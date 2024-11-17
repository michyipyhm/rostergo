import Header from "@/components/Header";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function ProfileLayout() {
  return (
    <>
      <SafeAreaView>
        <Header />
      </SafeAreaView>

      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Profile Screen" }}
        />
        <Stack.Screen
          name="changePassword"
          options={{ headerShown: false, title: "Change Password Screen" }}
        />
        <Stack.Screen
          name="information"
          options={{ headerShown: false, title: "User Information Screen" }}
        />
         <Stack.Screen
          name="payslips"
          options={{ headerShown: false, title: "User Payslips Screen" }}
        />
      </Stack>
    </>
  );
}
