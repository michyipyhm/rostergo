import { useSearchContext } from "@/components/SearchContext";
import { useQueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useState } from "react";

export default function shiftLayout() {
  // const [searchTerm, setSearchTerm] = useState("");

  const { setSearchText } = useSearchContext();

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
            onChangeText: (e) => {
              const text = e.nativeEvent.text;
              setSearchText(text);
            },
          },
        }}
      />
    </Stack>
  );
}
