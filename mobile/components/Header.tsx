import { useRouter } from "expo-router";
import { Button, Text } from "react-native";

export default function Header() {
  const router = useRouter();

  return (
    <>
      <Text>Header</Text>
      <Button onPress={() => router.back()} title="Back" />
    </>
  );
}
