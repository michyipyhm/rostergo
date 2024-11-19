import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Button } from "react-native";
import { FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getShiftList } from "@/api/shift-api";

interface ShiftPage {
  date: string;
  shift_slot: string;
  user_id: number;
}

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Shift List Page</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerItem}>Date:</Text>
        <Text style={styles.headerItem}>Shift Slot:</Text>
      </View>

      <FlatList<ShiftPage>
        data={data}
        keyExtractor={(item, index) => `${item.user_id}-${item.date}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.item}>{formatDate(item.date)}</Text>
            <Text style={styles.item}>{item.shift_slot}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No shifts available</Text>
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  item: {
    flex: 1,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 2,
    borderBottomColor: "#d0d0d0",
  },
  headerItem: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});
