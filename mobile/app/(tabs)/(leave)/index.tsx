import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllLeaves } from "@/api/leave-api";
import { ChevronRight } from 'lucide-react-native';
import { useRouter } from "expo-router";
import Header from "@/components/Header";

export default function LeaveRequestList() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllLeaves"],
    queryFn: getAllLeaves,
  });

  const navigateToLeaveRequestDetail = (id: any) => {
    router.push(`/(tabs)/(leave)/leaveDetail?id=${id}`);
  };
  

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>Error: {error.message}</Text>
      </View>
    );
  }

  const navigateToApplyLeave = () => {
    router.push(`/(tabs)/(leave)/applyLeave`);
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      
       
        <View style={styles.content}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const startDate = new Date(item.start_date);
              const endDate = new Date(item.end_date);
              
              const formattedStartDate = startDate.toISOString().split('T')[0];
              const formattedEndDate = endDate.toISOString().split('T')[0];

              const leaveType = item.leave_type_name;
              const status = item.status;

              return (
                <View style={styles.itemContainer}>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemDate}>{`${formattedStartDate} - ${formattedEndDate}`}</Text>
                    <Text style={styles.itemType}>{leaveType}</Text>
                    <Text style={[styles.itemStatus, { color: status.toLowerCase() === 'approve' ? 'green' : status.toLowerCase() === 'disapprove' ? 'red' : status.toLowerCase() === 'waiting list' ? 'yellow' : 'orange' }]}>{status}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() => navigateToLeaveRequestDetail(item.id)}
                  >
                    <Text style={styles.detailButtonText}>Details</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
       
      </View>
    </ScrollView>
     <TouchableOpacity
        style={styles.applyButton}
        onPress={navigateToApplyLeave}
      >
        <Text style={styles.applyButtonText}>+</Text>
      </TouchableOpacity>
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
  content: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemContent: {
    flex: 1,
    // padding: 10,
  },
  itemDate: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemType: {
    fontSize: 14,
    color: '#666',
    paddingVertical: 4,
  },
  itemStatus: {
    fontSize: 16,
    fontWeight: '500',
  },
  detailButton: {
    backgroundColor: '#0A1423',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  applyButton: {
    position: 'relative',
    bottom: 70,
    left: 340,
    width: 40,
    height: 40,
    backgroundColor: '#0A1423',
    borderRadius: 28,
    borderColor: '#0A1423',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 28,
    // fontWeight: 'bold',
  },
});