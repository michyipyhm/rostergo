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
          options={{ headerShown: false, title: "Profile" }}
        />

        <Stack.Screen
          name="editProfile"
          options={{ headerShown: false, title: "Edit Profile" }}
        />
      </Stack>
    </>
  );
}
