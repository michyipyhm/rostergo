// import { Tabs } from "expo-router";
// import { View, Text, StyleSheet, TextInput } from "react-native";
// import { FlatList } from "react-native-gesture-handler";
// import React, { useEffect, useState } from "react";

// export default function GetLeaveRequestDetailByUserId(leaveRequests: any) {
//   const [input, setInput] = useState("");
  

//     useEffect(() => {
//       fetch("http://localhost:3000/api/leaveRequestsDetail", { method: "GET" })
//         .then((Response) => Response.json())
//         .then((responseJson) => {
//           console.log(responseJson);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }, []);
    

//   return (
//     <View>
//       <Text style={styles.title}>Leave Request Detail</Text>
//       <View style={styles.headerRow}>
//         <Text style={styles.headerItem}>Leave Type:</Text>
//         <Text style={styles.headerItem}>Shift Slot:</Text>
//         <Text style={styles.headerItem}>Start Date:</Text>
//         <Text style={styles.headerItem}>End Date:</Text>
//         <Text style={styles.headerItem}>Duration:</Text>
//         <Text style={styles.headerItem}>Proof(if needed):</Text>
//       </View>
//       <TextInput
//         style={{
//           height: 80,
//           width: 300,
//           backgroundColor: "white",
//           borderColor: "gray",
//           borderWidth: 1,
//         }}
//         onChangeText={(text) => setInput(text)}
//         value={input}
//       />
//       <Text style={styles.headerItem}>Status:</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: "row", 
//     justifyContent: "space-between", 
//     padding: 10,
//   },
//   item: {
//     flex: 1, 
//     textAlign: "center", 
//   },
//   title: {
//     fontSize: 36,
//     textAlign: "center",
//     marginVertical: 20, 
//   },
//   headerRow: {
    
//     justifyContent: "flex-start",
//     padding: 10,
//     backgroundColor: "#f0f0f0", 
//   },
//   headerItem: {
    
//   },
// });

import { Tabs } from "expo-router";
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";

const LeaveRequestDetail = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);  // 添加加载状态
  const [error, setError] = useState<string | null>(null);  // 添加错误状态
  const [leaveRequestDetail, setLeaveRequestDetail] = useState<any>(null); // 添加状态以存储请求数据

  useEffect(() => {
    fetch("http://localhost:3000/api/leaveRequestsDetail", { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseJson) => {
        setLeaveRequestDetail(responseJson);
        setLoading(false);  // 数据加载完成
      })
      .catch((error) => {
        console.error(error);
        setError("加载数据时出错，请稍后再试。");  // 设置错误信息
        setLoading(false);  // 数据加载完成（失败）
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // 显示加载指示器
  }

  return (
    <View>
      <Text style={styles.title}>Leave Request Detail</Text>

      {error && <Text style={styles.error}>{error}</Text>}  // 显示错误信息

      <View style={styles.headerRow}>
        <Text style={styles.headerItem}>Leave Type:</Text>
        <Text style={styles.headerItem}>Shift Slot:</Text>
        <Text style={styles.headerItem}>Start Date:</Text>
        <Text style={styles.headerItem}>End Date:</Text>
        <Text style={styles.headerItem}>Duration:</Text>
        <Text style={styles.headerItem}>Proof(if needed):</Text>
      </View>

      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setInput(text)}
        value={input}
      />
      <Text style={styles.headerItem}>Status:</Text>
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
  }
});

export default LeaveRequestDetail;  // 确保组件以正确的方式导出

