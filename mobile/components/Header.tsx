import { useRouter } from "expo-router";
import { Button, Text } from "react-native";

export default function Header() {
  const router = useRouter();

  return (
    <>
      <Text>我是組長勝利哥</Text>
      <Button onPress={() => router.back()} title="Go back button" />
    </>
  );
}
