import { Tabs } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { FlatList } from 'react-native-gesture-handler';



export default function LeaveRequestList (leaveRequests: any) {
    const [input, setInput] = useState('');
    const handleButtonClick = () => {
  
    console.log("Apply Sick Leave Button Clicked");
    
    };
  return (
    <View>
     
      {/* <Tabs.Screen
        options={{
          title: "Leave Request List",
        }}
      />  */}
      <Text style={styles.title}>Apply Sick Leave</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerItem}>Leave Type:</Text>
        <Text style={styles.headerItem}>Shift Slot:</Text>
        <Text style={styles.headerItem}>Start Date:</Text>
        <Text style={styles.headerItem}>End Date:</Text>
        <Text style={styles.headerItem}>Duration:</Text>
        <Text style={styles.headerItem}>Proof(if needed):</Text>
      </View>
      <TextInput
  style={{ height: 80, width:300, backgroundColor: "white", borderColor: "gray", borderWidth: 1 }}
  onChangeText={(text) => setInput( text )}
  value={input}
/>
<Text style={styles.headerItem}>Status:</Text>
<Button 
        title="Apply" 
        onPress={handleButtonClick} 
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
    // flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#f0f0f0', // 可选：添加背景色以区别标题行
  },
  headerItem: {
    // flex: 1,
    // textAlign: 'center',
    // fontWeight: 'bold', // 可选：加粗标题项
  },
});
