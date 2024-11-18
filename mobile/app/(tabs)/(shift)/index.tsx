import { Tabs, useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Button } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { useQuery } from "@tanstack/react-query";
import { getShiftList } from "@/api/shift-api";

export default function shiftList() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["getShiftList"],
    queryFn: getShiftList,
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
    <SafeAreaView style={styles.container}>
     
      <Text style={styles.title}>Shift List Page</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerItem}>Date:</Text>
        <Text style={styles.headerItem}>Shift Slot:</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()} // 假设每个请假请求有唯一的 id
        renderItem={({ item }) => {
  
          const date = item.date;
          const shift_slot = item.shift_slot;

          return (
            <View style={styles.row}>
              <Text style={styles.item}>{date}</Text>
              <Text style={styles.item}>{shift_slot}</Text>
            </View>
          )
        }}
      /> 
     
      <Button
        // onPress={() => router.push("/(tabs)/(profile)/editProfile")}
        title="Go somewhere"
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