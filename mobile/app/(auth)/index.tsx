import { Button, SafeAreaView } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Text>Welcome to RosterGo!</Text>
      <Text>Please input mobile number to sign in/sign up</Text>

      <Button onPress={() => router.push("/(auth)/login")} title="Log In" />
      <Button
        onPress={() => router.push("/(auth)/register")}
        title="Register"
      />
    </SafeAreaView>
  );
}
