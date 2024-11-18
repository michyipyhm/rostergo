import {
  Image,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Calendar } from "react-native-calendars";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { Shift, getUserShifts } from "@/api/calendar-api";
import { useQuery } from "@tanstack/react-query";
import { MarkedDates } from "react-native-calendars/src/types";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const slideAnim = useRef(new Animated.Value(400)).current;
  const router = useRouter();
  const { data, isLoading, error } = useQuery<Shift[], Error>({
    queryKey: ["getUserShifts"],
    queryFn: getUserShifts,
  });

  const markedDates = useMemo<MarkedDates>(() => {
    if (!data) return {};
    return data.reduce<MarkedDates>((acc, shift) => {
      const date = shift.date.split("T")[0]; // Extract YYYY-MM-DD from the date string
      acc[date] = {
        periods: [{ startingDay: true, endingDay: true, color: "#5f9ea0" }],
      };
      return acc;
    }, {});
  }, [data]);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    const shift = data?.find((s) => s.date.startsWith(day.dateString));
    setSelectedShift(shift || null);
    
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSlideView = () => {
    // Slide out the view
    Animated.timing(slideAnim, {
      toValue: 300, // Slide back to off-screen
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#0A1423", dark: "#0A1423" }}
      headerImage={
        <Image
          source={require("@/assets/images/rostergo10.webp")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markingType="multi-period"
          theme={{
            "stylesheet.day.basic": {
              base: {
                height: 50, // Set this to the desired height
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
          markedDates={markedDates}
        />
      </ThemedView>

      <Animated.View
        style={[
          styles.slideView,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.selectedDateText}>
          Selected Date: {selectedDate}
        </Text>
        {selectedShift && (
          <Text style={styles.shiftTimeText}>
            Shift Time: {selectedShift.start_time} - {selectedShift.end_time}
          </Text>
        )}
        <TouchableOpacity onPress={closeSlideView} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("./(apply-sick-leave)")}
          style={styles.sickLeaveButton}
        >
          <Text style={styles.closeButtonText}>Apply Sick Leave</Text>
        </TouchableOpacity>
      </Animated.View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 65,
    position: "absolute",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  slideView: {
    position: "absolute",
    bottom: -12,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedDateText: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 25,
  },
  shiftTimeText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 25,
  },
  closeButton: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#0A1423",
    borderRadius: 10,
    marginTop: 10,
  },
  sickLeaveButton: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#0A1423",
    borderRadius: 10,
    marginTop: 15
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
