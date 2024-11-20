import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getShiftList } from "@/api/shift-api";
import { MarkedDates } from "react-native-calendars/src/types";

interface ShiftPage {
  date: string;
  shift_slot: string;
  user_id: number;
  start_time: string;
  end_time: string;
  shift_slot_id: number;

}

const shiftColors: { [key: number]: string } = {
  1: '#3498DB', // Shift A
  2: '#E74C3C', // Shift B
  3: '#2ECC71', // Shift C
  4: '#F39C12', // Shift D
  5: '#9B59B6', // Shift E
};



const getShiftColor = (shiftSlotId: number) => {
  return shiftColors[shiftSlotId] || '#CCCCCC'; // Default to light grey if no match
};


export default function shiftList() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery<ShiftPage[], Error>({
    queryKey: ["getShiftList"],
    queryFn: async () => {
      const result = await getShiftList();
      return Array.isArray(result) ? result : [result];
    },
  });

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.split(":").slice(0, 2).join(":");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <View
              key={`${item.user_id}-${item.date}-${index}`}
              style={styles.row}
            >
              <View style={styles.headerRow}>
              <View style={[styles.shiftMarker, { backgroundColor: getShiftColor(data && data.length > 0 ? item.shift_slot_id : 1) }]} />

                <Text style={styles.item}>{formatDate(item.date)}</Text>
                <View style={styles.shiftTimeContainer}>
                  <Text style={styles.shiftItem}>{item.shift_slot}</Text>
                  <Text style={styles.shiftTimeItem}>
                    {formatTime(item.start_time)} - {formatTime(item.end_time)}
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No shifts available</Text>
        )}
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
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
  row: {
    justifyContent: "space-between",
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  shiftMarker: {
    width: 6,
    height: '100%',
    borderRadius: 14,
  },
  item: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
  },
  shiftItem: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
  },
  shiftTimeItem:{
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    paddingTop: 5,
  },
  shiftTimeContainer: {
    flex: 1,
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});
