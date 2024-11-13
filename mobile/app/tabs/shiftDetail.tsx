import { Tabs } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from 'react-native-gesture-handler';



export default function LeaveRequestList (leaveRequests: any) {
  return (
    <View>
      
      {/* <Tabs.Screen
        options={{
          title: "Leave Request List",
        }}
      />  */}
      <Text style={styles.title}>Shift Detail</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerItem}>Date:</Text>
        <Text style={styles.headerItem}>Start Time:</Text>
        <Text style={styles.headerItem}>End Time:</Text>
      </View>

      <FlatList
        data={leaveRequests}
        keyExtractor={(item) => item.id.toString()} // 假设每个请假请求有唯一的 id
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.item}>{item.date}</Text>
            <Text style={styles.item}>{item.start_time}</Text>
            <Text style={styles.item}>{item.end_time}</Text>
          </View>
        )}
      /> 
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',  // 水平布局
    justifyContent: 'space-between', // 项目间距
    padding: 10,
  },
  item: {
    flex: 1,  // 每个项目在行中均分可用空间
    textAlign: 'center',  // 文本居中
  },
  title: {
    fontSize: 36,
    textAlign: "center",
    marginVertical: 20, // 添加一些垂直间距
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f0f0f0', // 可选：添加背景色以区别标题行
  },
  headerItem: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold', // 可选：加粗标题项
  },
});
