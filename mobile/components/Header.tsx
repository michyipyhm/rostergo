import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
      <Ionicons name="chevron-back" size={24} color="#0a1321" />
      <Text style={styles.backText}>Back</Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#0a1321',
  },
});