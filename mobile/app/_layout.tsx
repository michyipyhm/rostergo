import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { useRouter, Stack } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";


// Prevent the splash screen from auto-hiding before asset loading is complete.
ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();
  const [loaded, setLoaded] = useState(false);
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Promise.all([fontsLoaded]);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setLoaded(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  useEffect(() => {
    if (loaded) {
      ExpoSplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <SplashScreen />;
  }

  return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack initialRouteName="(tabs)">
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
  },
});
