// import { Stack } from "expo-router";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// const queryClient = new QueryClient();

// export default function Layout() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Stack>
//         <Stack.Screen name="index" options={{ headerShown: false }} />
//         <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//         <Stack.Screen name="calendar" options={{ headerShown: false }} />
       
//       </Stack>
//     </QueryClientProvider>
//   );
// }

import { Slot, Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="calendar" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}