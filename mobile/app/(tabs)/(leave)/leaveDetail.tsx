
import { Tabs } from "expo-router";
import { View, Text, StyleSheet, TextInput, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLeaveDetail } from "@/api/leave-api";


  export default function LeaveRequestDetail() {
    const { data, isLoading, error } = useQuery({
      queryKey: ["getLeaveDetail"],
      queryFn: getLeaveDetail,
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

  return (
    
    <View>
      <Text style={styles.title}>Leave Request Detail</Text>

    
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

    const leaveType = item.leave_type_name || 'N/A';
    const shiftSlotTitle = item.shift_slots?.title || 'N/A'; // 使用可选链
    const startTime = item.shift_slots?.start_time || 'N/A';
    const endTime = item.shift_slots?.end_time || 'N/A';
    const ShiftDetail = `Shift Slot: ${shiftSlotTitle} (${startTime} - ${endTime})`;
    const duration = item.duration || 'N/A';
    const status = item.status || 'N/A';

    return (
        <View>
            <Text style={styles.headerItem}>Leave Type: {leaveType}</Text>
            <Text style={styles.headerItem}>{ShiftDetail}</Text>
            <Text style={styles.headerItem}>Start Date: {formattedStartDate}</Text>
            <Text style={styles.headerItem}>End Date: {formattedEndDate}</Text>
            <Text style={styles.headerItem}>Duration: {duration}</Text>
            <Text style={styles.headerItem}>Proof (if needed):</Text>
            <TextInput style={styles.textInput} placeholder="Enter proof if needed" />
            <Text style={styles.headerItem}>Status: {status}</Text>
        </View>
    );
}}
/>
</View>
);
}

const styles = StyleSheet.create({
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
    justifyContent: "flex-start",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  headerItem: {
    marginVertical: 5,
  },
  textInput: {
    height: 80,
    width: 300,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
  },
  error: {
    color: "red",
    textAlign: "center",
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
  }
});



