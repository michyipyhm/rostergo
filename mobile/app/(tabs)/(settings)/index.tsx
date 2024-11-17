import { useRouter } from "expo-router";
import { SafeAreaView, Text, Button } from "react-native";

export default function settings() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>settings</Text>

      <Button
        // onPress={() => router.push("/(tabs)/(profile)/editProfile")}
        title="Go somewhere"
      />
    </SafeAreaView>
  );
}