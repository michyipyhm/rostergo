import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import { Calendar, ChevronDown, Upload } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import { applySickLeave } from "@/api/leave-api";
import Header from "@/components/Header";

interface ShiftSlot {
  id: number;
  name: string;
  time: string;
}

interface SickLeaveData {
  startDate: string;
  endDate: string;
  shiftSlot: number;
  duration: string;
  proof?: string;
}

export default function ApplySickLeave() {
  const router = useRouter();
  const { selectedDate } = useLocalSearchParams<{ selectedDate: string }>();
  console.log({ selectedDate });
  const [startDate, setStartDate] = useState(
    new Date(selectedDate || Date.now())
  );
  const [endDate, setEndDate] = useState(new Date(selectedDate || Date.now()));
  const [startDateString, setStartDateString] = useState(
    startDate.toISOString().split("T")[0]
  );
  const [endDateString, setEndDateString] = useState(
    endDate.toISOString().split("T")[0]
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [shiftSlot, setShiftSlot] = useState(1);
  const [showShiftSlotDropdown, setShowShiftSlotDropdown] = useState(false);
  const [duration, setDuration] = useState("Half day(AM)");
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shiftSlots: ShiftSlot[] = [
    { id: 1, name: "Shift A", time: "09:00 - 12:00" },
    { id: 2, name: "Shift B", time: "12:00 - 15:00" },
    { id: 3, name: "Shift C", time: "09:00 - 11:00" },
    { id: 4, name: "Shift D", time: "11:00 - 13:00" },
    { id: 5, name: "Shift E", time: "13:00 - 15:00" },
  ];

  const durations = ["Full Day", "Half day(AM)", "Half day(PM)"];

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

  const handleEndDateInput = (text: string) => {
    setEndDateString(text);
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

  const rendeShiftSlotDropdown = (
    items: ShiftSlot[],
    onSelect: (item: number) => void
  ) => (
    <View style={styles.dropdownList}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.dropdownItem}
          onPress={() => {
            onSelect(item.id);
            setShowShiftSlotDropdown(false);
            setShowDurationDropdown(false);
          }}
        >
          <Text style={styles.dropdownItemText}>
            {item.name + " (" + item.time + ")"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderDropdown = (
    items: string[],
    onSelect: (item: string) => void
  ) => (
    <View style={styles.dropdownList}>
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.dropdownItem}
          onPress={() => {
            onSelect(item);
            setShowShiftSlotDropdown(false);
            setShowDurationDropdown(false);
          }}
        >
          <Text style={styles.dropdownItemText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!startDateString || !endDateString || !shiftSlot || !duration) {
      Alert.alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const sickLeaveData: SickLeaveData = {
      startDate: selectedDate ? selectedDate : startDateString,
      endDate: endDateString,
      shiftSlot,
      duration,
      // proof: image,
    };

    try {
      const result = await applySickLeave(sickLeaveData);
      if (result.success) {
        window.alert("Sick leave application submitted successfully");
        // Alert.alert('Success', 'Sick leave application submitted successfully')
        router.replace("/(tabs)/(leave)");
      } else {
        window.alert("Failed to submit sick leave application");
      }
    } catch (error) {
      console.error("Error submitting sick leave:", error);
      // Alert.alert('Error', 'An unexpected error occurred')
      window.alert("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.card}>
            <View style={styles.content}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Leave Type:</Text>
                <Text style={styles.value}>Sick Leave</Text>
              </View>

              <View style={[styles.formGroup, styles.dropdownContainer]}>
                <Text style={styles.label}>Shift Slot:</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() =>
                    setShowShiftSlotDropdown(!showShiftSlotDropdown)
                  }
                >
                  <Text style={styles.dropdownText}>
                    {shiftSlots.find((slot) => slot.id === shiftSlot)?.name} (
                    {shiftSlots.find((slot) => slot.id === shiftSlot)?.time})
                  </Text>
                  <ChevronDown color="#000" size={20} />
                </TouchableOpacity>
                {showShiftSlotDropdown &&
                  rendeShiftSlotDropdown(shiftSlots, (id: number) => {
                    console.log({ id });
                    setShiftSlot(id);
                  })}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Start Date:</Text>
                <View style={styles.dateInputContainer}>
                  <TextInput
                    style={[styles.dateInput, { color: "#666" }]}
                    value={selectedDate ? selectedDate : startDateString}
                    editable={false}
                  />
                </View>
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
                    minimumDate={startDate}
                  />
                )}
              </View>

              <View style={[styles.formGroup, styles.dropdownContainer]}>
                <Text style={styles.label}>Duration:</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowDurationDropdown(!showDurationDropdown)}
                >
                  <Text style={styles.dropdownText}>{duration}</Text>
                  <ChevronDown color="#000" size={20} />
                </TouchableOpacity>
                {showDurationDropdown && renderDropdown(durations, setDuration)}
              </View>

              <View style={styles.proofGroup}>
                <Text style={styles.proofLabel}>Proof (if needed):</Text>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={pickImage}
                  disabled={uploading}
                >
                  <Upload color="#000" size={20} />
                  <Text style={styles.uploadButtonText}>
                    {uploading ? "Uploading..." : "Upload"}
                  </Text>
                </TouchableOpacity>
                {image && (
                  <Image source={{ uri: image }} style={styles.imagePreview} />
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>Pending</Text>
              </View>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Text style={styles.applyButtonText}>
                  {isSubmitting ? "Submitting..." : "Apply Sick Leave"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
    shadowColor: "#000",
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
  dropdownContainer: {
    zIndex: 2,
  },
  dropdown: {
    flex: 2,
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
    left: "50%",
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
  proofGroup: {
    marginBottom: 16,
  },
  proofLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
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
});
