import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { ScrollView } from 'react-native-gesture-handler';
import { getUserShifts, Shift } from '../api/calendar-api';
import { useQuery } from '@tanstack/react-query';

const useSlideAnimation = (initialValue: number) => {
  const slideAnim = useRef(new Animated.Value(initialValue)).current;

  const slideIn = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const slideOut = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return { slideAnim, slideIn, slideOut };
};

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState("");
  // const [shifts, setShifts] = useState<Shift[]>([]);
  // const [loading, setLoading] = useState(true);
  const { slideAnim, slideIn, slideOut } = useSlideAnimation(400);
  const { data:shifts, isLoading, error } = useQuery({
    queryKey: ["getUserShifts"],
    queryFn: getUserShifts,
  });

  // const fetchShifts = async () => {
  //   try {
  //     const fetchedShifts = await getUserShifts();
  //     setShifts(fetchedShifts);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching shifts:', error);
  //     setLoading(false);
  //     // You might want to add some error handling UI here
  //   }
  // };

  const handleDayPress = useCallback((day: DateData) => {
    setSelectedDate(day.dateString);
    slideIn();
  }, [slideIn]);

  const getMarkedDates = () => {
    const markedDates: { [key: string]: any } = {};
    shifts.forEach((shift) => {
      markedDates[shift.date] = {
        marked: true,
        dotColor: '#5f9ea0',
      };
    });
    return markedDates;
  };

  const getSelectedDateShifts = () => {
    return shifts.filter((shift) => shift.date === selectedDate);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.stepContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={getMarkedDates()}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#007AFF',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#007AFF',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#007AFF',
            selectedDotColor: '#ffffff',
            arrowColor: '#007AFF',
            monthTextColor: '#2d4150',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 13
          }}
        />
      </View>
      <Animated.View
        style={[
          styles.slideView,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.selectedDateText}>
          Selected Date: {selectedDate}
        </Text>
        {getSelectedDateShifts().map((shift) => (
          <View key={shift.shift_id} style={styles.shiftItem}>
            <Text style={styles.shiftTime}>
              {shift.start_time} - {shift.end_time}
            </Text>
            <Text style={styles.shiftNickname}>{shift.nickname}</Text>
          </View>
        ))}
        <TouchableOpacity onPress={slideOut} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  stepContainer: {
    marginBottom: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginTop: 16,
  },
  slideView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedDateText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#2d4150',
  },
  shiftItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  shiftTime: {
    fontSize: 16,
    color: '#2d4150',
  },
  shiftNickname: {
    fontSize: 16,
    color: '#007AFF',
  },
  closeButton: {
    padding: 10,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});


// import React, { useRef, useState } from 'react';
// import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { ScrollView } from 'react-native-gesture-handler';

// export default function HomeScreen() {
//   const [selectedDate, setSelectedDate] = useState("");
//   const slideAnim = useRef(new Animated.Value(400)).current;

//   const handleDayPress = (day: any) => {
//     setSelectedDate(day.dateString);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeSlideView = () => {
//     Animated.timing(slideAnim, {
//       toValue: 400,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.stepContainer}>
//         <Calendar
//           onDayPress={handleDayPress}
//           markingType="multi-period"
//           markedDates={{
//             "2024-11-14": {
//               periods: [
//                 { startingDay: true, endingDay: true, color: "#5f9ea0" },
//               ],
//             },
//           }}
//           theme={{
//             backgroundColor: '#ffffff',
//             calendarBackground: '#ffffff',
//             textSectionTitleColor: '#b6c1cd',
//             selectedDayBackgroundColor: '#007AFF',
//             selectedDayTextColor: '#ffffff',
//             todayTextColor: '#007AFF',
//             dayTextColor: '#2d4150',
//             textDisabledColor: '#d9e1e8',
//             dotColor: '#007AFF',
//             selectedDotColor: '#ffffff',
//             arrowColor: '#007AFF',
//             monthTextColor: '#2d4150',
//             textDayFontSize: 16,
//             textMonthFontSize: 16,
//             textDayHeaderFontSize: 13
//           }}
//         />
//       </View>
//       <Animated.View
//         style={[
//           styles.slideView,
//           {
//             transform: [{ translateY: slideAnim }],
//           },
//         ]}
//       >
//         <Text style={styles.selectedDateText}>
//           Selected Date: {selectedDate}
//         </Text>
//         <TouchableOpacity onPress={closeSlideView} style={styles.closeButton}>
//           <Text style={styles.closeButtonText}>Close</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     backgroundColor: '#F2F2F7',
//   },
//   stepContainer: {
//     marginBottom: 8,
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginHorizontal: 16,
//     marginTop: 16,
//   },
//   slideView: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 250,
//     backgroundColor: '#ffffff',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   selectedDateText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 10,
//     color: '#2d4150',
//   },
//   closeButton: {
//     padding: 10,
//     alignSelf: 'center',
//     backgroundColor: '#007AFF',
//     borderRadius: 10,
//   },
//   closeButtonText: {
//     color: '#ffffff',
//     fontSize: 16,
//   },
// });


// // import React, { useRef, useState } from 'react';
// // import { View, Text, StyleSheet, Animated } from 'react-native';
// // import { Calendar } from 'react-native-calendars';
// // import ParallaxScrollView from 'react-native-parallax-scroll-view';
// // import { Image, TouchableOpacity } from 'react-native';
// // import { ThemedView } from '../components/ThemedView';
// // import { ThemedText } from '../components/ThemedText';
// // import { HelloWave } from '../components/HelloWave';


// // export default function HomeScreen() {
// //   const [selectedDate, setSelectedDate] = useState("");
// //   const slideAnim = useRef(new Animated.Value(400)).current;

// //   const handleDayPress = (day: any) => {
// //     setSelectedDate(day.dateString);
// //     // Slide in the view
// //     Animated.timing(slideAnim, {
// //       toValue: 0, // Slide to visible position
// //       duration: 300,
// //       useNativeDriver: true,
// //     }).start();
// //   };

// //   const closeSlideView = () => {
// //     // Slide out the view
// //     Animated.timing(slideAnim, {
// //       toValue: 300, // Slide back to off-screen
// //       duration: 300,
// //       useNativeDriver: true,
// //     }).start();
// //   };


// //   return (
// //     <ParallaxScrollView
      
// //     >
// //       <View style={styles.container}>
// //         <ThemedView style={styles.stepContainer}>
// //           <Calendar
// //             onDayPress={handleDayPress}
// //             markingType="multi-period"
// //             markedDates={{
// //               "2024-11-14": {
// //                 periods: [
// //                   { startingDay: true, endingDay: true, color: "#5f9ea0" },
// //                 ],
// //               },
// //             }}
// //           />
// //         </ThemedView>
// //         <Animated.View
// //           style={[
// //             styles.slideView,
// //             {
// //               transform: [{ translateY: slideAnim }],
// //             },
// //           ]}
// //         >
// //           <Text style={styles.selectedDateText}>
// //             Selected Date: {selectedDate}
// //           </Text>
// //           <TouchableOpacity onPress={closeSlideView} style={styles.closeButton}>
// //             <Text style={styles.closeButtonText}>Close</Text>
// //           </TouchableOpacity>
// //         </Animated.View>
// //       </View>
// //     </ParallaxScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   reactLogo: {
// //     height: 178,
// //     width: 290,
// //     bottom: 0,
// //     left: 0,
// //     position: "absolute",
// //   },
// //   titleContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 8,
// //   },
// //   stepContainer: {
// //     gap: 8,
// //     marginBottom: 8,
// //   },
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //   },
// //   slideView: {
// //     position: "absolute",
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //     height: 250,
// //     backgroundColor: "#fff",
// //     padding: 20,
// //     borderRadius: 20,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 4,
// //     elevation: 5,
// //   },
// //   selectedDateText: {
// //     fontSize: 18,
// //     textAlign: "center",
// //     marginBottom: 10,
// //   },
// //   closeButton: {
// //     padding: 10,
// //     alignSelf: "center",
// //     backgroundColor: "#007AFF",
// //     borderRadius: 10,
// //   },
// //   closeButtonText: {
// //     color: "#fff",
// //     fontSize: 16,
// //   },
// // });
