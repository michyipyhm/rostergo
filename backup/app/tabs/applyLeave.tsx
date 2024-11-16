import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, TextInput } from 'react-native'
import { ChevronDown, Calendar, Upload } from 'lucide-react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function LeaveApplicationForm() {
  const [leaveType, setLeaveType] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [duration, setDuration] = useState('')
  const [showLeaveTypeDropdown, setShowLeaveTypeDropdown] = useState(false)
  const [showDurationDropdown, setShowDurationDropdown] = useState(false)
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  const leaveTypes = ['Annual Leave', 'Sick Leave', 'Personal Leave']
  const durations = ['Full Day', 'Half Day', 'Quarter Day']

  const renderDropdown = (items: string[], selectedValue: string, onSelect: (item: string) => void) => (
    <View style={styles.dropdownList}>
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.dropdownItem}
          onPress={() => {
            onSelect(item)
            setShowLeaveTypeDropdown(false)
            setShowDurationDropdown(false)
          }}
        >
          <Text style={styles.dropdownItemText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate
    setShowStartDatePicker(Platform.OS === 'ios')
    setStartDate(currentDate)
  }

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate
    setShowEndDatePicker(Platform.OS === 'ios')
    setEndDate(currentDate)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Apply Leave</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Leave type:</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowLeaveTypeDropdown(!showLeaveTypeDropdown)}
            >
              <Text style={styles.dropdownText}>{leaveType || 'Select leave type'}</Text>
              <ChevronDown color="#000" size={20} />
            </TouchableOpacity>
            {showLeaveTypeDropdown && renderDropdown(leaveTypes, leaveType, setLeaveType)}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Shift Slot:</Text>
            <Text style={styles.value}>N/A</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Start Date:</Text>
            <View style={styles.dateInputContainer}>
              <TextInput
                style={styles.dateTextInput}
                value={startDate.toLocaleDateString()}
                onChangeText={(text) => {
                  const date = new Date(text);
                  if (!isNaN(date.getTime())) {
                    setStartDate(date);
                  }
                }}
                placeholder="YYYY-MM-DD"
              />
              <TouchableOpacity
                style={styles.calendarIcon}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Calendar color="#000" size={20} />
              </TouchableOpacity>
            </View>
            {showStartDatePicker && (
              <DateTimePicker
                testID="startDatePicker"
                value={startDate}
                mode="date"
                display="default"
                onChange={onChangeStartDate}
              />
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>End Date:</Text>
            <View style={styles.dateInputContainer}>
              <TextInput
                style={styles.dateTextInput}
                value={endDate.toLocaleDateString()}
                onChangeText={(text) => {
                  const date = new Date(text);
                  if (!isNaN(date.getTime())) {
                    setEndDate(date);
                  }
                }}
                placeholder="YYYY-MM-DD"
              />
              <TouchableOpacity
                style={styles.calendarIcon}
                onPress={() => setShowEndDatePicker(true)}
              >
                <Calendar color="#000" size={20} />
              </TouchableOpacity>
            </View>
            {showEndDatePicker && (
              <DateTimePicker
                testID="endDatePicker"
                value={endDate}
                mode="date"
                display="default"
                onChange={onChangeEndDate}
              />
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Duration:</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowDurationDropdown(!showDurationDropdown)}
            >
              <Text style={styles.dropdownText}>{duration || 'Select duration'}</Text>
              <ChevronDown color="#000" size={20} />
            </TouchableOpacity>
            {showDurationDropdown && renderDropdown(durations, duration, setDuration)}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Proof(if needed):</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Upload color="#000" size={20} />
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply Leave</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
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
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: 'gray',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    padding: 12,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  dateTextInput: {
    flex: 1,
    fontSize: 16,
    padding: 12,
  },
  calendarIcon: {
    padding: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    padding: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  applyButton: {
    backgroundColor: '#90EE90',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
})