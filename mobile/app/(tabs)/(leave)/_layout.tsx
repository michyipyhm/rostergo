import Header from "@/components/Header";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function leaveLayout() {
  return (
    <>
      <SafeAreaView>
        <Header />
      </SafeAreaView>

      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Leave Request Lsit Screen" }}
        />
        <Stack.Screen
          name="leaveDetail"
          options={{ headerShown: false, title: "Leave Detail Screen" }}
        />
        <Stack.Screen
          name="applyLeave"
          options={{ headerShown: false, title: "Apply for Leave Screen" }}
        />
      </Stack>
    </>
  );
}
