import { Tabs } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllLeaves } from "../api/leave-api";

export default function LeaveRequestList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllLeaves"],
    queryFn: getAllLeaves,
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
  console.log(data)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave Request List</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerItem}>Date:</Text>
        <Text style={styles.headerItem}>Leave Type:</Text>
        <Text style={styles.headerItem}>Status:</Text>
      </View>

      <FlatList
  data={data}
  keyExtractor={(item) => item.id.toString()} // Assuming each leave request has a unique id
  renderItem={({ item }) => {
    console.log(item);
    // 假设 start_date 和 end_date 是字符串格式的日期
    const startDate = new Date(item.start_date);
    const endDate = new Date(item.end_date);
    
    // 格式化为 YYYY-MM-DD
    const formattedStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    const formattedEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;

    const leaveType = item.leave_type_name;
    const status = item.status;

    return (
      <View style={styles.row}>
        <Text style={styles.item}>{`${formattedStartDate} - ${formattedEndDate}`}</Text>
        <Text style={styles.item}>{leaveType}</Text>
        <Text style={styles.item}>{status}</Text>
      </View>
    );
  }}
/>


      <TouchableOpacity
        style={styles.roundButton}
        onPress={() => {
          console.log("Round Button pressed!");
          // Add navigation or other logic here
        }}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
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
  },
  item: {
    flex: 1,
    textAlign: "center",
  },
  title: {
    fontSize: 36,
    textAlign: "center",
    marginVertical: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  headerItem: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  roundButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "grey",
    position: "absolute",
    right: 20,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 24,
  },
});