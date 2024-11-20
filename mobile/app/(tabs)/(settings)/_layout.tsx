import Header from "@/components/Header";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function settingsLayout() {
  return (
    <>
      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Settings",
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
            headerShown: true,
            title: "Settings Screen",
          }}
        />

        <Stack.Screen
          name="changePassword"
          options={{
            headerTitle: "Change Password",
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
            headerShown: true,
            title: "Change Password Screen",
          }}
        />
        
      </Stack>
    </>
  );
}
