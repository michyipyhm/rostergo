import { Tabs } from "expo-router";
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import React, { useState } from 'react';




export default function LeaveRequestList (leaveRequests: any) {
    const [input, setInput] = useState('');
  return (
    <View>
      <Text style={styles.title}>Apply Leave</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerItem}>Leave Type:</Text>
        <Text style={styles.headerItem}>Shift Slot:</Text>
        <Text style={styles.headerItem}>Start Date:</Text>
        <Text style={styles.headerItem}>End Date:</Text>
        <Text style={styles.headerItem}>Duration:</Text>
        <Text style={styles.headerItem}>Proof(if needed):</Text>
        <TouchableOpacity 
          style={{ marginLeft: 10, backgroundColor: 'white', padding: 10, borderRadius: 5,height:30,width:80 }} 
          onPress={() => {
            
            console.log('Upload Button pressed!');
          }}
        >
          <Text style={{ color: 'black' }}>Upload</Text>
        </TouchableOpacity>
      </View>
      <TextInput
  style={{ height: 80, width:300, backgroundColor: "white", borderColor: "gray", borderWidth: 1 }}
  onChangeText={(text) => setInput( text )}
  value={input}
/>
<Text style={styles.headerItem}>Status:</Text>

<TouchableOpacity 
          style={{backgroundColor: 'black', padding: 10, borderRadius: 5, height:30,width:100}} 
          onPress={() => {
            
            console.log('Apply Leave Button pressed!');
          }}
        >
          <Text style={{ color: 'green' }}>Apply Leave</Text>
        </TouchableOpacity>
      

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
//     fontWeight: 'bold', // 可选：加粗标题项
  },
});