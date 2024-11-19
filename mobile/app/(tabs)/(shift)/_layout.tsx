import Header from "@/components/Header";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function shiftLayout() {
  return (
    <>

      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Shift List Screen" }}
        />
        <Stack.Screen
          name="shiftDetail"
          options={{ headerShown: false, title: "Shift Detail Screen" }}
        />
      </Stack>
    </>
  );
}
