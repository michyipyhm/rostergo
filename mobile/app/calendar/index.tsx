import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Calendar } from 'react-native-calendars';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Image, TouchableOpacity } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { HelloWave } from '../components/HelloWave';


export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState("");
  const slideAnim = useRef(new Animated.Value(400)).current;

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    // Slide in the view
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to visible position
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSlideView = () => {
    // Slide out the view
    Animated.timing(slideAnim, {
      toValue: 300, // Slide back to off-screen
      duration: 300,
      useNativeDriver: true,
    }).start();
  };


  return (
    <ParallaxScrollView
      
    >
      <View style={styles.container}>
        <ThemedView style={styles.stepContainer}>
          <Calendar
            onDayPress={handleDayPress}
            markingType="multi-period"
            markedDates={{
              "2024-11-14": {
                periods: [
                  { startingDay: true, endingDay: true, color: "#5f9ea0" },
                ],
              },
            }}
          />
        </ThemedView>
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
          <TouchableOpacity onPress={closeSlideView} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  slideView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedDateText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  closeButton: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

// const linearAccent = "#4788ff";

// const linearTheme: CalendarTheme = {
//   rowMonth: {
//     content: {
//       textAlign: "center",
//       color: "#000000",
//       fontWeight: "700",
//     },
//   },
//   rowWeek: {
//     container: {
//       borderBottomWidth: 2,
//       borderBottomColor: "#000000",
//       borderStyle: "solid",
//     },
//   },
//   itemWeekName: { content: { color: "#000000" } },
//   itemDayContainer: {
//     activeDayFiller: {
//       backgroundColor: linearAccent,
//     },
//   },
//   itemDay: {
//     idle: ({ isPressed, isWeekend }) => ({
//       container: {
//         backgroundColor: isPressed ? linearAccent : "transparent",
//         borderRadius: 15,
//       },
//       content: {
//         color: isWeekend && !isPressed ? "#000000" : "#000000",
//       },
//     }),
//     today: ({ isPressed }) => ({
//       container: {
//         borderColor: "#2e2e2e",
//         borderWidth: isPressed ? 0 : 2,
//         borderRadius: isPressed ? 13 : 15,
//         backgroundColor: isPressed ? linearAccent : "transparent",
        
//       },
//       content: {
//         color: isPressed ? "#ffffff" : "#000000",
//       },
//     }),
//     active: ({ isEndOfRange, isStartOfRange }) => ({
//       container: {
//         backgroundColor: "transparent",
//         borderTopLeftRadius: isStartOfRange ? 0 : 0,
//         borderBottomLeftRadius: isStartOfRange ? 0 : 0,
//         borderTopRightRadius: isEndOfRange ? 0 : 0,
//         borderBottomRightRadius: isEndOfRange ? 0 : 0,
//         borderBottomWidth:5,
//         borderBottomColor: linearAccent,
//       },
//       content: {
//         color: "#000000",
//       },
//     }),
//   },
// };



// const today = toDateId(new Date());

// export default function CalendarScreen() {
//   const { selectedDate, setSelectedDate } = useCalendarStore();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Calendar</Text>
//       <View style={styles.calendarContainer}>
//         {/* <Text style={styles.selectedDate}>Selected date: {selectedDate}</Text> */}
//         <Calendar.List
//         theme={linearTheme}
//           calendarActiveDateRanges={[
//             {
//               startId: selectedDate,
//               endId: selectedDate,
//             },
//           ]}
//           calendarInitialMonthId={today}
//           onCalendarDayPress={setSelectedDate}
//           calendarRowVerticalSpacing={40}
//           calendarSpacing={20}
//           calendarMonthHeaderHeight={40}
//           calendarWeekHeaderHeight={30}
//           calendarRowHorizontalSpacing={5}
//           getCalendarMonthFormat={(date) => date.toLocaleString('default', { month: 'long', year: 'numeric' })}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F2F2F7',
//   },
//   header: {
//     fontSize: 34,
//     fontWeight: 'bold',
//     color: '#000',
//     padding: 16,
//     paddingTop: 60,
//     backgroundColor: '#F2F2F7',
//   },
//   calendarContainer: {
//     flex: 1,
//     padding: 16,
//   },
//   selectedDate: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
// });

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Calendar, DateData, MarkedDates } from 'react-native-calendars';
// import { useCalendarStore } from '../store/calendar';

// interface PeriodData {
//   startDate: string;
//   endDate: string;
//   type: 'eating' | 'drinking' | 'exercise';
// }

// export default function CalendarScreen() {
//   const { selectedDate, setSelectedDate } = useCalendarStore();
//   const [markedDates, setMarkedDates] = useState<MarkedDates>({});

//   useEffect(() => {
//     fetchPeriodData();
//   }, []);

//   const fetchPeriodData = async () => {
//     try {
//       // Simulating API call
//       const response = await new Promise<PeriodData[]>((resolve) => 
//         setTimeout(() => resolve([
//           { startDate: '2024-11-01', endDate: '2024-11-01', type: 'eating' },
//           { startDate: '2024-11-05', endDate: '2024-11-07', type: 'drinking' },
//           { startDate: '2024-11-10', endDate: '2024-11-12', type: 'exercise' },
//         ]), 1000)
//       );
      
//       const newMarkedDates: MarkedDates = {};
//       response.forEach(period => {
//         const color = getColorForType(period.type);
//         const startDate = new Date(period.startDate);
//         const endDate = new Date(period.endDate);
        
//         for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
//           const dateString = date.toISOString().split('T')[0];
//           newMarkedDates[dateString] = {
//             color,
//             startingDay: dateString === period.startDate,
//             endingDay: dateString === period.endDate,
//           };
//         }
//       });
      
//       setMarkedDates(newMarkedDates);
//     } catch (error) {
//       console.error('Error fetching period data:', error);
//     }
//   };

//   const getColorForType = (type: PeriodData['type']): string => {
//     switch (type) {
//       case 'eating':
//         return '#FF9999';
//       case 'drinking':
//         return '#99FF99';
//       case 'exercise':
//         return '#9999FF';
//       default:
//         return '#CCCCCC';
//     }
//   };

//   const onDayPress = (day: DateData) => {
//     setSelectedDate(day.dateString);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Calendar</Text>
//       <Calendar
//         onDayPress={onDayPress}
//         markingType={'period'}
//         markedDates={{
//           ...markedDates,
//           [selectedDate]: { 
//             ...markedDates[selectedDate],
//             selected: true,
//             selectedColor: '#007AFF',
//           },
//         }}
//         theme={{
//           backgroundColor: '#ffffff',
//           calendarBackground: '#ffffff',
//           textSectionTitleColor: '#b6c1cd',
//           selectedDayBackgroundColor: '#007AFF',
//           selectedDayTextColor: '#ffffff',
//           todayTextColor: '#007AFF',
//           dayTextColor: '#2d4150',
//           textDisabledColor: '#d9e1e8',
//           dotColor: '#007AFF',
//           selectedDotColor: '#ffffff',
//           arrowColor: '#007AFF',
//           monthTextColor: '#2d4150',
//           textDayFontFamily: 'System',
//           textMonthFontFamily: 'System',
//           textDayHeaderFontFamily: 'System',
//           textDayFontWeight: '300',
//           textMonthFontWeight: 'bold',
//           textDayHeaderFontWeight: '300',
//           textDayFontSize: 16,
//           textMonthFontSize: 16,
//           textDayHeaderFontSize: 13
//         }}
//         style={styles.calendar}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F2F2F7',
//   },
//   header: {
//     fontSize: 34,
//     fontWeight: 'bold',
//     color: '#000',
//     padding: 16,
//     paddingTop: 60,
//     backgroundColor: '#F2F2F7',
//   },
//   calendar: {
//     borderRadius: 10,
//     elevation: 4,
//     margin: 16,
//   },
// });

