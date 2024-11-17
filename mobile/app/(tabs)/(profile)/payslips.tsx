// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// // import { Picker } from '@react-native-picker/picker';

// export default function PayslipsScreen() {
//   const [selectedMonth, setSelectedMonth] = useState('');

//   const payslipData = {
//     staffNo: '12345',
//     branch: 'Main Office',
//     name: 'John Doe',
//     baseSalary: '5000',
//     overTime: '500',
//     leaveDeduction: '200',
//     totalNetPay: '5300',
//   };

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Payslips</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={selectedMonth}
//           onValueChange={(itemValue) => setSelectedMonth(itemValue)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Select Which Month" value="" />
//           {months.map((month, index) => (
//             <Picker.Item key={index} label={month} value={month} />
//           ))}
//         </Picker>
//       </View>
//       <FlatList
//         data={Object.entries(payslipData)}
//         keyExtractor={(item) => item[0]}
//         renderItem={({ item }) => (
//           <View style={styles.payslipItem}>
//             <Text style={styles.payslipLabel}>{item[0]}:</Text>
//             <Text style={styles.payslipValue}>{item[1]}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f0f0f0',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   pickerContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   picker: {
//     height: 50,
//   },
//   payslipItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#ffffff',
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   payslipLabel: {
//     fontWeight: 'bold',
//   },
//   payslipValue: {
//     color: '#666666',
//   },
// });