// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   ScrollView,
//   ActivityIndicator,
// } from "react-native";
// import { useQuery } from "@tanstack/react-query";
// import { getAllLeaves } from "../api/leave-api";
// import { ChevronRight } from 'lucide-react-native';
// import { useRouter } from "expo-router";

// export default function LeaveRequestList() {
//   const router = useRouter();
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["getAllLeaves"],
//     queryFn: getAllLeaves,
//   });

//   const navigateToLeaveRequestDetail = (id) => {
//     router.push(`/tabs/leaveRequestDetail`);
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.error}>Error: {error.message}</Text>
//       </View>
//     );
//   }

//   const navigateToApplyLeave = () => {
//     router.push("/tabs/applyLeave");
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.card}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Leave Request List</Text>
//         </View>
//         <View style={styles.content}>
//           <FlatList
//             data={data}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => {
//               const startDate = new Date(item.start_date);
//               const endDate = new Date(item.end_date);
              
//               const formattedStartDate = startDate.toISOString().split('T')[0];
//               const formattedEndDate = endDate.toISOString().split('T')[0];

//               const leaveType = item.leave_type_name;
//               const status = item.status;

//               return (
//                 <TouchableOpacity 
//                   style={styles.itemContainer}
//                   onPress={() => navigateToLeaveRequestDetail(item.id)}
//                 >
//                   <View style={styles.itemContent}>
//                     <Text style={styles.itemDate}>{`${formattedStartDate} - ${formattedEndDate}`}</Text>
//                     <Text style={styles.itemType}>{leaveType}</Text>
//                     <Text style={[styles.itemStatus, { color: status.toLowerCase() === 'approved' ? 'green' : status.toLowerCase() === 'rejected' ? 'red' : 'orange' }]}>{status}</Text>
//                   </View>
//                   <ChevronRight color="#000" size={20} />
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </View>
//       </View>
//       <TouchableOpacity
//         style={styles.applyButton}
//         onPress={navigateToApplyLeave}
//       >
//         <Text style={styles.applyButtonText}>Apply Leave</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e6ffff',
//   },
//   card: {
//     backgroundColor: '#fff',
//     margin: 16,
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   header: {
//     backgroundColor: '#e6e6e6',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   content: {
//     padding: 16,
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 4,
//     padding: 12,
//     marginBottom: 8,
//   },
//   itemContent: {
//     flex: 1,
//   },
//   itemDate: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   itemType: {
//     fontSize: 14,
//     color: '#666',
//   },
//   itemStatus: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   error: {
//     color: 'red',
//     textAlign: 'center',
//   },
//   applyButton: {
//     backgroundColor: '#90EE90',
//     padding: 16,
//     borderRadius: 4,
//     alignItems: 'center',
//     margin: 16,
//   },
//   applyButtonText: {
//     color: '#000',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllLeaves } from "../api/leave-api";
import { ChevronRight } from 'lucide-react-native';
import { useRouter } from "expo-router";

export default function LeaveRequestList() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllLeaves"],
    queryFn: getAllLeaves,
  });

  const navigateToLeaveRequestDetail = (id) => {
    router.push(`/tabs/leaveRequestDetail`);
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
    router.push("/tabs/applyLeave");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Leave Request List</Text>
        </View>
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
                <TouchableOpacity 
                  style={styles.itemContainer}
                  onPress={() => navigateToLeaveRequestDetail(item.id)}
                >
                  <View style={styles.itemContent}>
                    <Text style={styles.itemDate}>{`${formattedStartDate} - ${formattedEndDate}`}</Text>
                    <Text style={styles.itemType}>{leaveType}</Text>
                    <Text style={[styles.itemStatus, { color: status.toLowerCase() === 'approved' ? 'green' : status.toLowerCase() === 'rejected' ? 'red' : 'orange' }]}>{status}</Text>
                  </View>
                  <ChevronRight color="#000" size={20} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.applyButton}
        onPress={navigateToApplyLeave}
      >
        <Text style={styles.applyButtonText}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6ffff',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#e6e6e6',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  itemContent: {
    flex: 1,
  },
  itemDate: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemType: {
    fontSize: 14,
    color: '#666',
  },
  itemStatus: {
    fontSize: 14,
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
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#90EE90',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  applyButtonText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
});