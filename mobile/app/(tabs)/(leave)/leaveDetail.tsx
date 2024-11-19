import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLeaveDetail, deleteLeaveRequest } from '@/api/leave-api';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, ChevronDown } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface ShiftSlot {
  start_time?: string;
  end_time?: string;
  title?: string;
}

interface LeaveType {
  name: string;
}

interface LeaveRequestItem {
  id: number;
  shift_slot?: ShiftSlot;
  start_date: string;
  end_date: string;
  leave_type: LeaveType;
  status: string;
  duration?: 'Half day(AM)' | 'Half day(PM)' | 'Full day';
}

const durationOptions: ('Half day(AM)' | 'Half day(PM)' | 'Full day')[] = ['Half day(AM)', 'Half day(PM)', 'Full day'];

export default function LeaveRequestDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const leaveId = id ? parseInt(id, 10) : undefined;

  const { data, isLoading, error } = useQuery<LeaveRequestItem, Error>({
    queryKey: ['getLeaveDetail', leaveId],
    queryFn: () => getLeaveDetail(leaveId!),
    enabled: !!leaveId,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLeaveRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllLeaves'] });
      Alert.alert('Success', 'Leave request deleted successfully');
      router.replace('/(tabs)/(leave)');
    },
    onError: (error) => {
      Alert.alert('Error', `Failed to delete leave request: ${error}`);
    },
  });

  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this leave request?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => {
            if (leaveId) {
              deleteMutation.mutate(leaveId);
            }
          },
          style: 'destructive'
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>No data found for this leave request.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Leave Request Detail</Text>
        </View>
        <View style={styles.content}>
          <LeaveRequestItem item={data} onDelete={handleDelete} />
        </View>
      </View>
    </ScrollView>
  );
}

function LeaveRequestItem({ item, onDelete }: { item: LeaveRequestItem; onDelete: () => void }) {
  const [startDate, setStartDate] = useState(new Date(item.start_date));
  const [endDate, setEndDate] = useState(new Date(item.end_date));
  const [startDateString, setStartDateString] = useState(startDate.toISOString().split('T')[0]);
  const [endDateString, setEndDateString] = useState(endDate.toISOString().split('T')[0]);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [duration, setDuration] = useState<'Half day(AM)' | 'Half day(PM)' | 'Full day'>(item.duration || 'Full day');

  const leaveType = item.leave_type.name || 'N/A';
  const status = item.status || 'N/A';

  const onChangeStartDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
    setStartDateString(currentDate.toISOString().split('T')[0]);
  };

  const onChangeEndDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setEndDate(currentDate);
    setEndDateString(currentDate.toISOString().split('T')[0]);
  };

  const handleStartDateInput = (text: string) => {
    setStartDateString(text);
  };

  const handleEndDateInput = (text: string) => {
    setEndDateString(text);
  };

  const validateStartDate = () => {
    const date = new Date(startDateString);
    if (isNaN(date.getTime())) {
      Alert.alert('Invalid start date. Please enter a valid date in YYYY-MM-DD format.');
      setStartDateString(startDate.toISOString().split('T')[0]);
    } else {
      setStartDate(date);
      if (date > endDate) {
        Alert.alert('Start date cannot be later than end date. End date has been adjusted.');
        setEndDate(date);
        setEndDateString(date.toISOString().split('T')[0]);
      }
    }
  };

  const validateEndDate = () => {
    const date = new Date(endDateString);
    if (isNaN(date.getTime())) {
      Alert.alert('Invalid end date. Please enter a valid date in YYYY-MM-DD format.');
      setEndDateString(endDate.toISOString().split('T')[0]);
    } else {
      setEndDate(date);
      if (date < startDate) {
        Alert.alert('End date cannot be earlier than start date. Start date has been adjusted.');
        setStartDate(date);
        setStartDateString(date.toISOString().split('T')[0]);
      }
    }
  };

  const renderDropdown = (
    items: ('Half day(AM)' | 'Half day(PM)' | 'Full day')[],
    selectedValue: 'Half day(AM)' | 'Half day(PM)' | 'Full day',
    onSelect: (item: 'Half day(AM)' | 'Half day(PM)' | 'Full day') => void
  ) => (
    <View style={styles.dropdownList}>
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.dropdownItem}
          onPress={() => {
            onSelect(item);
            setShowDurationDropdown(false);
          }}
        >
          <Text style={styles.dropdownItemText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.itemContainer}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Leave Type:</Text>
        <Text style={styles.value}>{leaveType}</Text>
      </View>
     
      <View style={styles.formGroup}>
        <Text style={styles.label}>Start Date:</Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={styles.dateInput}
            value={startDateString}
            onChangeText={handleStartDateInput}
            onBlur={validateStartDate}
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
            style={styles.dateInput}
            value={endDateString}
            onChangeText={handleEndDateInput}
            onBlur={validateEndDate}
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
      <View style={[styles.formGroup, styles.durationContainer]}>
        <Text style={styles.label}>Duration:</Text>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowDurationDropdown(!showDurationDropdown)}
          >
            <Text style={styles.dropdownText}>{duration}</Text>
            <ChevronDown color="#000" size={20} />
          </TouchableOpacity>
          {showDurationDropdown && renderDropdown(durationOptions, duration, setDuration)}
        </View>
      </View>
     
      <View style={styles.formGroup}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{status}</Text>
      </View>
      {status.toLowerCase() === 'pending' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Save pressed')}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
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
  itemContainer: {
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  value: {
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    padding: 12,
    flex: 2,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    flex: 2,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    padding: 12,
  },
  calendarIcon: {
    padding: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: '#90EE90',
    padding: 10,
    borderRadius: 4,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 4,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  dropdownContainer: {
    flex: 2,
    position: 'relative',
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
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  durationContainer: {
    zIndex: 2,
  },
});