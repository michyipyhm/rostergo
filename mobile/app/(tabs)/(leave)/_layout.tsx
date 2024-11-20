import Header from "@/components/Header";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function leaveLayout() {
  return (
    <>
      <Stack initialRouteName="index">
        
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Leave Request",
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
            headerShown: true,
            title: "Leave Request Screen",
            headerSearchBarOptions: {
              placeholder: "Search for leave",
              hideWhenScrolling: false,
            },
          }}
        />

        <Stack.Screen
          name="leaveDetail"
          options={{
            headerTitle: "Leave Detail",
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
            headerShown: true,
            title: "Leave Detail Screen",
          }}
        />

        <Stack.Screen
          name="applyLeave"
          options={{
            headerTitle: "Apply leave",
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
            headerShown: true,
            title: "Apply Leave Screen",
          }}
        />

        <Stack.Screen
          name="applySickLeave"
          options={{
            headerTitle: "Apply Sick leave",
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
            headerShown: true,
            title: "Apply Sick Leave Screen",
          }}
        />
      </Stack>
    </>
  );
}
