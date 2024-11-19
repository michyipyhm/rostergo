import { Tabs, usePathname } from "expo-router";
import React from "react";
import { Platform, SafeAreaView } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Header from "@/components/Header";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Stack = createStackNavigator();
  const pathname = usePathname();

  return (
    <> 
      {/* {pathname !== "/" && <Header/>} */}

      {/* <Header /> */}
    

      <Tabs
      initialRouteName="index" backBehavior="history"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="(shift)"
          options={{
            title: "Shift",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="briefcase.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(leave)"
          options={{
            title: "Leave",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.3.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="(settings)"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="gearshape.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
