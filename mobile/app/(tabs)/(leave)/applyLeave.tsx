import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { applyLeave, getLeaveTypes } from "@/api/leave-api";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface LeaveData {
  leaveType: number;
  startDate: string;
  endDate: string;
  proof?: string;
}

interface LeaveType {
  id: number;
  name: string;
}

export default function LeaveApplicationForm() {
  const router = useRouter();
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [leaveType, setLeaveType] = useState<number>(2);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showLeaveTypeDropdown, setShowLeaveTypeDropdown] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [startDateString, setStartDateString] = useState(
    startDate.toISOString().split("T")[0]
  );
  const [endDateString, setEndDateString] = useState(
    endDate.toISOString().split("T")[0]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    try {
      const types = await getLeaveTypes();
      setLeaveTypes(types);
    } catch (error) {
      console.error("Error fetching leave types:", error);
      Alert.alert("Error", "Failed to fetch leave types. Please try again.");
    }
  };

  const renderDropdown = (
    items: LeaveType[],
    onSelect: (item: number) => void
  ) => (
    <View style={styles.dropdownList}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.dropdownItem}
          onPress={() => {
            onSelect(item.id);
            setShowLeaveTypeDropdown(false);
          }}
        >
          <Text style={styles.dropdownItemText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const onChangeStartDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === "ios");
    setStartDate(currentDate);
    setStartDateString(currentDate.toISOString().split("T")[0]);

    // Ensure end date is not earlier than start date
    if (currentDate > endDate) {
      setEndDate(currentDate);
      setEndDateString(currentDate.toISOString().split("T")[0]);
    }
  };

  const onChangeEndDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === "ios");

    // Prevent end date from being earlier than start date
    if (currentDate >= startDate) {
      setEndDate(currentDate);
      setEndDateString(currentDate.toISOString().split("T")[0]);
    } else {
      Alert.alert(
        "Invalid date range",
        "End date cannot be earlier than start date. Please select a valid end date."
      );
    }
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
      Alert.alert(
        "Invalid start date",
        "Please enter a valid date in YYYY-MM-DD format."
      );
      setStartDateString(startDate.toISOString().split("T")[0]);
    } else {
      setStartDate(date);
      if (date > endDate) {
        setEndDate(date);
        setEndDateString(date.toISOString().split("T")[0]);
      }
    }
  };

  const validateEndDate = () => {
    const date = new Date(endDateString);
    if (isNaN(date.getTime())) {
      Alert.alert(
        "Invalid end date",
        "Please enter a valid date in YYYY-MM-DD format."
      );
      setEndDateString(endDate.toISOString().split("T")[0]);
    } else {
      if (date < startDate) {
        Alert.alert(
          "Invalid date range",
          "End date cannot be earlier than start date. Please select a valid end date."
        );
        setEndDate(startDate);
        setEndDateString(startDateString);
      } else {
        setEndDate(date);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleSubmit = async () => {
    if (isSubmitting) return;
  
    if (!leaveType || !startDateString || !endDateString) {
      window.alert("Please fill in all required fields");
      return;
    }
  
    setIsSubmitting(true);
  
    const leaveData: LeaveData = {
      leaveType,
      startDate: startDateString,
      endDate: endDateString,
      proof: image ? image : undefined,
    };
  
    try {
      const result = await applyLeave(leaveData);
  
      if (result.success) {
        window.alert("Success: Apply Leave"); // Note: window.alert only takes one argument
        router.push("/(tabs)/(leave)");
      } else {
        window.alert("Error: Unexpected response format.");
      }
    } catch (error) {
      console.error("Error submitting leave application:", error);
      window.alert("Error: An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const leaveTypeStrings = leaveTypes.map(leaveType => leaveType.name);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.content}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Leave type:</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowLeaveTypeDropdown(!showLeaveTypeDropdown)}
              >
                <Text style={styles.dropdownText}>
                  {leaveTypes.find((item) => item.id === leaveType)?.name ||
                    "Select leave type"}
                </Text>
                <MaterialIcons name="navigate-next" size={20} color="black" />
              </TouchableOpacity>
              {showLeaveTypeDropdown &&
                renderDropdown(leaveTypes, (id: number) => setLeaveType(id))}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Start Date:</Text>
              <View style={styles.dateInputContainer}>
                <TextInput
                  style={styles.dateTextInput}
                  value={startDateString}
                  onChangeText={handleStartDateInput}
                  onBlur={validateStartDate}
                  placeholder="YYYY-MM-DD"
                />
                <TouchableOpacity
                  style={styles.calendarIcon}
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <MaterialIcons
                    name="calendar-today"
                    size={20}
                    color="black"
                  />
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
                  value={endDateString}
                  onChangeText={handleEndDateInput}
                  onBlur={validateEndDate}
                  placeholder="YYYY-MM-DD"
                />
                <TouchableOpacity
                  style={styles.calendarIcon}
                  onPress={() => setShowEndDatePicker(true)}
                >
                  <MaterialIcons
                    name="calendar-today"
                    size={20}
                    color="black"
                  />
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
              <Text style={styles.label}>Proof (if needed):</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={pickImage}
                disabled={uploading}
              >
                <Text
                  style={[
                    styles.uploadButtonText,
                    !uploading && styles.uploadButtonTextIdle,
                  ]}
                >
                  {uploading ? "Uploading..." : "Upload here"}
                </Text>
              </TouchableOpacity>
              {image && (
                <Image source={{ uri: image }} style={styles.imagePreview} />
              )}
            </View>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.applyButtonText}>
                {isSubmitting ? "Submitting..." : "Apply Leave"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
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
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "gray",
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
    color: "gray",
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderRadius: 4,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  dropdownItemText: {
    fontSize: 16,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    padding: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  uploadButtonTextIdle: {
    color: "gray",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginTop: 8,
    borderRadius: 4,
  },

  applyButton: {
    alignItems: "center",
    backgroundColor: "#0A1423",
    paddingVertical: 14,
    borderRadius: 25,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  applyButtonText: {
    alignItems: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  shiftTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  disabledText: {
    fontSize: 16,
    color: "#999",
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    padding: 12,
  },
});
