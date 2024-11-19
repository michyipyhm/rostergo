import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header() {
  const router = useRouter();
  const navigation = useNavigation();

  
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >›
          <Ionicons name="chevron-back" size={24} color="#0a1321" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: 44, // Standard iOS header height
    justifyContent: 'center',
  },
  safeArea: {
    backgroundColor: 'white',
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#0a1321",
  },
});
