

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './auth/login';
import PhoneVerificationScreen from './auth/verify';
import CalendarScreen from './calendar';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



// import React from 'react';
// import { SafeAreaView, StatusBar } from 'react-native';
// import CalendarPage from "./screens/CalendarScreen";


// export default function Page() {
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F7' }}>
//       <StatusBar barStyle="dark-content" />
//       <CalendarPage />
//     </SafeAreaView>
//   );
// }


// const styles = StyleSheet.create({

// });