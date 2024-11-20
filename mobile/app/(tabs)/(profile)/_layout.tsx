import Header from "@/components/Header";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function ProfileLayout() {
  return (
    <>


      <Stack initialRouteName="index">
        
      <Stack.Screen
          name="index"
          options={{
            headerTitle: "Profile",
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
            headerShown: true,
            title: "Profile Screen",
          }}
        />
        
        <Stack.Screen
          name="payslips"
          options={{
            headerTitle: "Your Payslips",
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
            headerShown: true,
            title: "Payslips Screen",
          }}
        />
      
      </Stack>
    </>
  );
}
