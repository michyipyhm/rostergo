import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from 'react-native-gesture-handler';



export default function LeaveRequestList (leaveRequests: any) {

  useEffect(() => {
    // console.log("Fetching leave requests...");
    // fetch("http://localhost:3000/api/leaveRequests", { method: "GET" })
    //   .then((Response) => Response.json())
    //   .then((responseJson) => {
    //     console.log(responseJson);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);

  
  return(
    <div>123</div>
  )
  // return (
  //   <View>
      
  //     <Text style={styles.title}>Leave Request List</Text>
  //     <View style={styles.headerRow}>
  //       <Text style={styles.headerItem}>Date:</Text>
  //       <Text style={styles.headerItem}>Leave Type:</Text>
  //       <Text style={styles.headerItem}>Status:</Text>
  //     </View>

  //     <FlatList
  //       data={leaveRequests}
        
  //       keyExtractor={(item) => item.id.toString()} // 假设每个请假请求有唯一的 id
      
  //       renderItem={({ item }) => {
  //         const startDate = item.date[0];
  //         const endDate = item.date[item.date.length - 1];
  //         return(
  //         <View style={styles.row}>
  //           <Text style={styles.item}>{startDate}-{endDate}</Text>
  //           <Text style={styles.item}>{item.leave_type}</Text>
  //           <Text style={styles.item}>{item.status}</Text>
  //         </View>
  //       )}
  //       }
  //     /> 
    
  //     <TouchableOpacity 
  //         style={styles.roundButton} 
  //         onPress={() => {
  //           console.log('Round Button pressed!');
  //         }}
  //       >
  //         <Text style={styles.buttonText}>+</Text> 
  //       </TouchableOpacity>
  //   </View>
  //     )
    };


// const styles = StyleSheet.create({
//   row: {
//     flexDirection: 'row',  
//     justifyContent: 'space-between', 
//     padding: 10,
//   },
//   item: {
//     flex: 1,  
//     textAlign: 'center', 
//   },
//   title: {
//     fontSize: 36,
//     textAlign: "center",
//     marginVertical: 20, 
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//     backgroundColor: '#f0f0f0', 
//   },
//   headerItem: {
//     flex: 1,
//     textAlign: 'center',
//     fontWeight: 'bold', 
//   },
//   roundButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25, 
//     backgroundColor: 'grey',
//     position: 'absolute',
//     right: 20,
//     bottom: 20,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 24,
//   },
// });
