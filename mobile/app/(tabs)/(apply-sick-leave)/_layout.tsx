import Header from "@/components/Header";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function settingsLayout() {
  return (
    <>
  

      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Apple Sick Leave screen" }}
        />

        {/* <Stack.Screen
          name="editProfile"
          options={{ headerShown: false, title: "Edit Profile" }}
        /> */}
      </Stack>
    </>
  );
}
