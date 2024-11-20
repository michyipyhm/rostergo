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
import { ChevronDown, Calendar, Upload } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { submitLeaveApplication } from "@/api/leave-api";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ShiftSlot {
  name: string;
  time: string;
}

interface LeaveData {
  leaveType: string;
  startDate: string;
  endDate: string;
  shiftSlot?: string;
  duration?: string;
  proof?: string;
}

export default function LeaveApplicationForm() {
  const router = useRouter();
  const [leaveType, setLeaveType] = useState("");
  const [shiftSlot, setShiftSlot] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [duration, setDuration] = useState("");
  const [showLeaveTypeDropdown, setShowLeaveTypeDropdown] = useState(false);
  const [showShiftSlotDropdown, setShowShiftSlotDropdown] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
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
  const [isMultiDayLeave, setIsMultiDayLeave] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const leaveTypes = ["Annual Leave", "Personal Leave"];
  const shiftSlots: ShiftSlot[] = [
    { name: "Shift A", time: "09:00 - 12:00" },
    { name: "Shift B", time: "12:00 - 15:00" },
    { name: "Shift C", time: "09:00 - 11:00" },
    { name: "Shift D", time: "11:00 - 13:00" },
    { name: "Shift E", time: "13:00 - 15:00" },
  ];
  const durations = ["Full Day", "Half day (AM)", "Half day (PM)"];

  useEffect(() => {
    const start = new Date(startDateString);
    const end = new Date(endDateString);
    const isMultiDay = start.getTime() !== end.getTime();
    setIsMultiDayLeave(isMultiDay);

    if (isMultiDay) {
      setShiftSlot("");
      setDuration("");
    }
  }, [startDateString, endDateString]);

  const renderDropdown = (
    items: string[],
    selectedValue: string,
    onSelect: (item: string) => void
  ) => (
    <View style={styles.dropdownList}>
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.dropdownItem}
          onPress={() => {
            onSelect(item);
            setShowLeaveTypeDropdown(false);
            setShowShiftSlotDropdown(false);
            setShowDurationDropdown(false);
          }}
        >
          <Text style={styles.dropdownItemText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

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

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (
      !leaveType ||
      !startDateString ||
      !endDateString ||
      (!isMultiDayLeave && (!shiftSlot || !duration))
    ) {
      Alert.alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const leaveData: LeaveData = {
      leaveType,
      startDate: startDateString,
      endDate: endDateString,
      shiftSlot: isMultiDayLeave ? undefined : shiftSlot,
      duration: isMultiDayLeave ? undefined : duration,
      proof: image ? image : undefined,
    };

    try {
      const result = await submitLeaveApplication(leaveData);

      if (result && typeof result.success === "boolean") {
        Alert.alert("Success", result.message);
        router.push("/");
      } else {
        Alert.alert("Error", "Unexpected response format.");
      }
    } catch (error) {
      console.error("Error submitting leave application:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  {leaveType || "Select leave type"}
                </Text>
                <MaterialIcons name="navigate-next" size={20} color="black" />
              </TouchableOpacity>
              {showLeaveTypeDropdown &&
                renderDropdown(leaveTypes, leaveType, setLeaveType)}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Shift Slot:</Text>
              {isMultiDayLeave ? (
                <Text style={styles.disabledText}>N/A</Text>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() =>
                      setShowShiftSlotDropdown(!showShiftSlotDropdown)
                    }
                  >
                    <Text style={styles.dropdownText}>
                      {shiftSlot || "Select shift slot"}
                    </Text>
                    <MaterialIcons
                      name="navigate-next"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                  {showShiftSlotDropdown &&
                    renderDropdown(
                      shiftSlots.map((slot) => slot.name),
                      shiftSlot,
                      setShiftSlot
                    )}
                  {shiftSlot && (
                    <Text style={styles.shiftTime}>
                      {shiftSlots.find((slot) => slot.name === shiftSlot)?.time}
                    </Text>
                  )}
                </>
              )}
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
                  {/* <MaterialIcons name="navigate-next" size={20} color="black" />             */}
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
                  {/* <MaterialIcons name="navigate-next" size={20} color="black" />             */}
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
              {isMultiDayLeave ? (
                <Text style={styles.disabledText}>N/A</Text>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() =>
                      setShowDurationDropdown(!showDurationDropdown)
                    }
                  >
                    <Text style={styles.dropdownText}>
                      {duration || "Select duration"}
                    </Text>
                    <MaterialIcons
                      name="navigate-next"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                  {showDurationDropdown &&
                    renderDropdown(durations, duration, setDuration)}
                </>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Proof(if needed):</Text>
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
                >{uploading ? "Uploading..." : "Upload here"}</Text>
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
    alignItems: 'center',
    backgroundColor: '#0A1423',
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
    alignItems: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
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
