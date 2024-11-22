import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLeaveDetail,
  deleteLeaveRequest,
  updateLeaveRequest,
} from "@/api/leave-api";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, ChevronDown } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

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
  duration?: "Half day(AM)" | "Half day(PM)" | "Full day";
}

type DateType = Date | string;

const durationOptions: ("Half day(AM)" | "Half day(PM)" | "Full day")[] = [
  "Half day(AM)",
  "Half day(PM)",
  "Full day",
];

export default function LeaveRequestDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const leaveId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    if (leaveId === null) {
      Alert.alert("Warning", "Leave request ID is undefined", [
        { text: "OK", onPress: () => router.replace("/(tabs)/(leave)") },
      ]);
    }
    console.log({ leaveId });
  }, [leaveId, router]);

  const { data, isLoading, error } = useQuery<LeaveRequestItem, Error>({
    queryKey: ["getLeaveDetail", leaveId],
    queryFn: () => {
      if (leaveId !== null) {
        return getLeaveDetail(leaveId);
      }
      return Promise.reject(new Error("Leave ID is null"));
    },
    enabled: leaveId !== null,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLeaveRequest,
    onSuccess: () => {
      console.log("Leave request deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["getAllLeaves"] });
      Alert.alert("Success", "Leave request deleted successfully", [
        { text: "OK", onPress: () => router.replace("/(tabs)/(leave)") },
      ]);
    },
    onError: (error) => {
      Alert.alert("Error", `Failed to delete leave request: ${error}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateLeaveRequest,
    onSuccess: () => {
      console.log("Leave request updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["getAllLeaves", "getLeaveDetail"],
      });
      Alert.alert("Success", "Leave request updated successfully", [
        { text: "OK", onPress: () => router.replace("/(tabs)/(leave)") },
      ]);
    },
    onError: (error) => {
      Alert.alert("Error", `Failed to update leave request: ${error}`);
    },
  });

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this leave request?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            if (leaveId !== null) {
              deleteMutation.mutate(leaveId);
            }
          },
          style: "destructive",
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.content}>
            <LeaveRequestItem
              item={data}
              onDelete={handleDelete}
              onUpdate={(updatedData) =>
                leaveId !== null
                  ? updateMutation.mutate({ id: leaveId, ...updatedData })
                  : null
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function LeaveRequestItem({
  item,
  onDelete,
  onUpdate,
}: {
  item: LeaveRequestItem;
  onDelete: () => void;
  onUpdate: (data: {
    start_date: string;
    end_date: string;
    duration: string;
  }) => void;
}) {
  const [startDate, setStartDate] = useState(new Date(item.start_date));
  const [endDate, setEndDate] = useState(new Date(item.end_date));
  const [startDateString, setStartDateString] = useState(
    startDate.toISOString().split("T")[0]
  );
  const [endDateString, setEndDateString] = useState(
    endDate.toISOString().split("T")[0]
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [duration, setDuration] = useState<
    "Half day(AM)" | "Half day(PM)" | "Full day"
  >(item.duration || "Full day");

  const leaveType = item.leave_type.name || "N/A";
  const status = item.status || "N/A";

  const onChangeStartDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === "ios");
    setStartDate(currentDate);
    setStartDateString(currentDate.toISOString().split("T")[0]);
  };

  const onChangeEndDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === "ios");
    setEndDate(currentDate);
    setEndDateString(currentDate.toISOString().split("T")[0]);
  };

  const handleStartDateInput = (text: string) => {
    setStartDateString(text);
  };

  const handleEndDateInput = (text: string) => {
    setEndDateString(text);
  };

  const handleSave = () => {
    const updatedData: {
      start_date: string;
      end_date: string;
      duration: string;
    } = {
      start_date: startDateString,
      end_date: endDateString,
      duration: duration,
    };
    onUpdate(updatedData);
  };

  const validateStartDate = () => {
    const date = new Date(startDateString);
    if (isNaN(date.getTime())) {
      Alert.alert(
        "Invalid start date. Please enter a valid date in YYYY-MM-DD format."
      );
      setStartDateString(startDate.toISOString().split("T")[0]);
    } else {
      setStartDate(date);
      if (date > endDate) {
        Alert.alert(
          "Start date cannot be later than end date. End date has been adjusted."
        );
        setEndDate(date);
        setEndDateString(date.toISOString().split("T")[0]);
      }
    }
  };

  const validateEndDate = () => {
    const date = new Date(endDateString);
    if (isNaN(date.getTime())) {
      Alert.alert(
        "Invalid end date. Please enter a valid date in YYYY-MM-DD format."
      );
      setEndDateString(endDate.toISOString().split("T")[0]);
    } else {
      setEndDate(date);
      if (date < startDate) {
        Alert.alert(
          "End date cannot be earlier than start date. Start date has been adjusted."
        );
        setStartDate(date);
        setStartDateString(date.toISOString().split("T")[0]);
      }
    }
  };

  const formatDate = (inputDate: DateType): string => {
    let dateToFormat: Date;
    if (typeof inputDate === "string") {
      dateToFormat = new Date(inputDate);
    } else {
      dateToFormat = inputDate;
    }

    if (isNaN(dateToFormat.getTime())) {
      return "Invalid Date";
    }
    const adjustedDate = new Date(
      dateToFormat.getTime() - dateToFormat.getTimezoneOffset() * 60000
    );
    return adjustedDate.toISOString().split("T")[0];
  };

  const renderDropdown = (
    items: ("Half day(AM)" | "Half day(PM)" | "Full day")[],
    selectedValue: "Half day(AM)" | "Half day(PM)" | "Full day",
    onSelect: (item: "Half day(AM)" | "Half day(PM)" | "Full day") => void
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
    // <SafeAreaView style={styles.itemContainer}>
    <ScrollView>
      <View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Leave Type:</Text>
          <Text style={styles.value}>{leaveType}</Text>
        </View>

        <View style={styles.dateInputWrapper}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Start Date:</Text>
            <View style={styles.dateInputContainer}>
              <TextInput
                style={styles.dateInput}
                value={formatDate(startDateString)}
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
          </View>
          {showStartDatePicker && (
            <DateTimePicker
              testID="startDatePicker"
              value={startDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeStartDate}
            />
          )}
        </View>

        <View style={styles.dateInputWrapper}>
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
          </View>
          {showEndDatePicker && (
            <DateTimePicker
              testID="endDatePicker"
              value={endDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
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
            {showDurationDropdown &&
              renderDropdown(durationOptions, duration, setDuration)}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{status}</Text>
        </View>
        {status.toLowerCase() === "pending" && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5f5f5",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  content: {
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  value: {
    fontSize: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    padding: 12,
    flex: 2,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
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
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: "#0a1321",
    color: "#fff",
    padding: 12,
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deleteButton: {
    backgroundColor: "#0a1321",
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 25,
    flex: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    alignItems: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dropdownContainer: {
    flex: 2,
    position: "relative",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    padding: 12,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownList: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 4,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    zIndex: 1000,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  dropdownItemText: {
    fontSize: 16,
  },
  durationContainer: {
    zIndex: 1,
  },
  dateInputWrapper: {
    zIndex: 2,
  },
});
