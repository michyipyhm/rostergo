import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

export default function CalendarPage() {
  const [selected, setSelected] = useState('');

  const onDayPress = (day: DateData) => {
    setSelected(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendar</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selected]: { selected: true, selectedColor: '#007AFF' }
        }}
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
          textDayFontFamily: 'System',
          textMonthFontFamily: 'System',
          textDayHeaderFontFamily: 'System',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 13
        }}
        style={styles.calendar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#F2F2F7',
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    margin: 16,
  },
});

