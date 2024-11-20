import Header from "@/components/Header";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function shiftLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Shift List Page",
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerLargeTitleShadowVisible: false,
          headerShown: true,
          title: "Shift List Screen",
          headerSearchBarOptions: {
            placeholder: "Search for shifts",
            hideWhenScrolling: false,
          },
        }}
      />

      <Stack.Screen
        name="shiftDetail"
        options={{ headerShown: false, title: "Shift Detail Screen" }}
      />
    </Stack>
  );
}
