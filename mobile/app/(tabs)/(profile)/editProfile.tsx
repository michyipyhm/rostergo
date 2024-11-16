import { useRouter } from "expo-router";
import { SafeAreaView, Text, Button } from "react-native";

export default function EditProfile() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>Edit Profile</Text>
      <Button onPress={() => router.back()} title="Back to Profile" />
    </SafeAreaView>
  );
}
