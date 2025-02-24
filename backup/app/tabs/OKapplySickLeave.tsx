// import React, { useState } from 'react'
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Platform, Image } from 'react-native'
// import { ChevronDown, Calendar, Upload } from 'lucide-react-native'
// import DateTimePicker from '@react-native-community/datetimepicker'
// import * as ImagePicker from 'expo-image-picker'

// export default function ApplySickLeave() {
//   const [startDate, setStartDate] = useState(new Date())
//   const [endDate, setEndDate] = useState(new Date())
//   const [startDateString, setStartDateString] = useState(startDate.toISOString().split('T')[0])
//   const [endDateString, setEndDateString] = useState(endDate.toISOString().split('T')[0])
//   const [showStartDatePicker, setShowStartDatePicker] = useState(false)
//   const [showEndDatePicker, setShowEndDatePicker] = useState(false)
//   const [showDurationDropdown, setShowDurationDropdown] = useState(false)
//   const [duration, setDuration] = useState('Half day (AM)')
//   const [shiftSlot, setShiftSlot] = useState('Shift A')
//   const [showShiftSlotDropdown, setShowShiftSlotDropdown] = useState(false)
//   const [image, setImage] = useState(null)
//   const [uploading, setUploading] = useState(false)

//   const durations = ['Full Day', 'Half day (AM)', 'Half day (PM)']

//   const shiftSlots = [
//     { name: 'Shift A', time: '09:00 - 12:00' },
//     { name: 'Shift B', time: '12:00 - 15:00' },
//     { name: 'Shift C', time: '09:00 - 11:00' },
//     { name: 'Shift D', time: '11:00 - 13:00' },
//     { name: 'Shift E', time: '13:00 - 15:00' },
//   ]

//   const renderDropdown = (items: string[], selectedValue: string, onSelect: (item: string) => void) => (
//     <View style={styles.dropdownList}>
//       {items.map((item) => (
//         <TouchableOpacity
//           key={item}
//           style={styles.dropdownItem}
//           onPress={() => {
//             onSelect(item)
//             setShowDurationDropdown(false)
//             setShowShiftSlotDropdown(false)
//           }}
//         >
//           <Text style={styles.dropdownItemText}>{item}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   )

//   const onChangeStartDate = (event, selectedDate) => {
//     const currentDate = selectedDate || startDate
//     setShowStartDatePicker(Platform.OS === 'ios')
//     setStartDate(currentDate)
//     setStartDateString(currentDate.toISOString().split('T')[0])
//   }

//   const onChangeEndDate = (event, selectedDate) => {
//     const currentDate = selectedDate || endDate
//     setShowEndDatePicker(Platform.OS === 'ios')
//     setEndDate(currentDate)
//     setEndDateString(currentDate.toISOString().split('T')[0])
//   }

//   const handleStartDateInput = (text) => {
//     setStartDateString(text)
//   }

//   const handleEndDateInput = (text) => {
//     setEndDateString(text)
//   }

//   const validateStartDate = () => {
//     const date = new Date(startDateString)
//     if (isNaN(date.getTime())) {
//       alert('Invalid start date. Please enter a valid date in YYYY-MM-DD format.')
//       setStartDateString(startDate.toISOString().split('T')[0])
//     } else {
//       setStartDate(date)
//       if (date > endDate) {
//         alert('Start date cannot be later than end date. End date has been adjusted.')
//         setEndDate(date)
//         setEndDateString(date.toISOString().split('T')[0])
//       }
//     }
//   }

//   const validateEndDate = () => {
//     const date = new Date(endDateString)
//     if (isNaN(date.getTime())) {
//       alert('Invalid end date. Please enter a valid date in YYYY-MM-DD format.')
//       setEndDateString(endDate.toISOString().split('T')[0])
//     } else {
//       setEndDate(date)
//       if (date < startDate) {
//         alert('End date cannot be earlier than start date. Start date has been adjusted.')
//         setStartDate(date)
//         setStartDateString(date.toISOString().split('T')[0])
//       }
//     }
//   }

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     })

//     if (!result.canceled) {
//       setImage(result.assets[0].uri)
//       uploadImage(result.assets[0].uri)
//     }
//   }

//   const uploadImage = async (uri) => {
//     setUploading(true)
//     try {
//       // This is where you would implement the actual upload logic
//       // For now, we'll just simulate an upload with a delay
//       await new Promise(resolve => setTimeout(resolve, 2000))
//       console.log('Image uploaded successfully')
//       // In a real scenario, you might get a URL back from your server
//       // setImage(uploadedImageUrl)
//     } catch (error) {
//       console.error('Error uploading image: ', error)
//       alert('Failed to upload image. Please try again.')
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.card}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Apply Sick Leave</Text>
//         </View>
//         <View style={styles.content}>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>Leave type:</Text>
//             <Text style={styles.value}>Sick Leave</Text>
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.label}>Shift Slot:</Text>
//             <TouchableOpacity
//               style={styles.dropdown}
//               onPress={() => setShowShiftSlotDropdown(!showShiftSlotDropdown)}
//             >
//               <Text style={styles.dropdownText}>{shiftSlot}</Text>
//               <ChevronDown color="#000" size={20} />
//             </TouchableOpacity>
//             {showShiftSlotDropdown && renderDropdown(
//               shiftSlots.map(slot => slot.name),
//               shiftSlot,
//               (selected) => {
//                 setShiftSlot(selected)
//                 setShowShiftSlotDropdown(false)
//               }
//             )}
//             <Text style={styles.shiftTime}>
//               {shiftSlots.find(slot => slot.name === shiftSlot)?.time}
//             </Text>
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.label}>Start Date:</Text>
//             <View style={styles.dateInputContainer}>
//               <TextInput
//                 style={styles.dateTextInput}
//                 value={startDateString}
//                 onChangeText={handleStartDateInput}
//                 onBlur={validateStartDate}
//                 placeholder="YYYY-MM-DD"
//               />
//               <TouchableOpacity
//                 style={styles.calendarIcon}
//                 onPress={() => setShowStartDatePicker(true)}
//               >
//                 <Calendar color="#000" size={20} />
//               </TouchableOpacity>
//             </View>
//             {showStartDatePicker && (
//               <DateTimePicker
//                 testID="startDatePicker"
//                 value={startDate}
//                 mode="date"
//                 display="default"
//                 onChange={onChangeStartDate}
//               />
//             )}
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.label}>End Date:</Text>
//             <View style={styles.dateInputContainer}>
//               <TextInput
//                 style={styles.dateTextInput}
//                 value={endDateString}
//                 onChangeText={handleEndDateInput}
//                 onBlur={validateEndDate}
//                 placeholder="YYYY-MM-DD"
//               />
//               <TouchableOpacity
//                 style={styles.calendarIcon}
//                 onPress={() => setShowEndDatePicker(true)}
//               >
//                 <Calendar color="#000" size={20} />
//               </TouchableOpacity>
//             </View>
//             {showEndDatePicker && (
//               <DateTimePicker
//                 testID="endDatePicker"
//                 value={endDate}
//                 mode="date"
//                 display="default"
//                 onChange={onChangeEndDate}
//               />
//             )}
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.label}>Duration:</Text>
//             <TouchableOpacity
//               style={styles.dropdown}
//               onPress={() => setShowDurationDropdown(!showDurationDropdown)}
//             >
//               <Text style={styles.dropdownText}>{duration}</Text>
//               <ChevronDown color="#000" size={20} />
//             </TouchableOpacity>
//             {showDurationDropdown && renderDropdown(durations, duration, setDuration)}
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.label}>Proof(if needed):</Text>
//             <TouchableOpacity style={styles.uploadButton} onPress={pickImage} disabled={uploading}>
//               <Upload color="#000" size={20} />
//               <Text style={styles.uploadButtonText}>
//                 {uploading ? 'Uploading...' : 'Upload'}
//               </Text>
//             </TouchableOpacity>
//             {image && (
//               <Image source={{ uri: image }} style={styles.uploadPreview} />
//             )}
//           </View>
//           <TouchableOpacity style={styles.applyButton}>
//             <Text style={styles.applyButtonText}>Apply Sick Leave</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e6ffff',
//   },
//   card: {
//     backgroundColor: '#fff',
//     margin: 16,
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   header: {
//     backgroundColor: '#e6e6e6',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   content: {
//     padding: 16,
//   },
//   formGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   value: {
//     fontSize: 16,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 4,
//     padding: 12,
//   },
//   dropdown: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 4,
//     padding: 12,
//   },
//   dropdownText: {
//     fontSize: 16,
//   },
//   dropdownList: {
//     backgroundColor: '#fff',
//     borderRadius: 4,
//     marginTop: 4,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   dropdownItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   dropdownItemText: {
//     fontSize: 16,
//   },
//   dateInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 4,
//   },
//   dateTextInput: {
//     flex: 1,
//     fontSize: 16,
//     padding: 12,
//   },
//   calendarIcon: {
//     padding: 12,
//   },
//   uploadButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 4,
//     padding: 12,
//   },
//   uploadButtonText: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   uploadPreview: {
//     width: '100%',
//     height: 200,
//     marginTop: 8,
//     borderRadius: 4,
//   },
//   applyButton: {
//     backgroundColor: '#90EE90',
//     padding: 16,
//     borderRadius: 4,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   applyButtonText: {
//     color: '#000',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   shiftTime: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
// })

import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Platform, Image } from 'react-native'
import { ChevronDown, Calendar, Upload } from 'lucide-react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'
import { fetchShiftSlots } from '../api/leave-api' // Assume this function exists in your API file

export default function ApplySickLeave() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startDateString, setStartDateString] = useState(startDate.toISOString().split('T')[0])
  const [endDateString, setEndDateString] = useState(endDate.toISOString().split('T')[0])
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)
  const [showDurationDropdown, setShowDurationDropdown] = useState(false)
  const [duration, setDuration] = useState('Full Day')
  const [shiftSlot, setShiftSlot] = useState('')
  const [shiftSlots, setShiftSlots] = useState([])
  const [showShiftSlotDropdown, setShowShiftSlotDropdown] = useState(false)
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)

  const durations = ['Full Day', 'Half day (AM)', 'Half day (PM)']

  useEffect(() => {
    fetchShiftSlotsForDate(startDateString)
  }, [startDateString])

  const fetchShiftSlotsForDate = async (date: string) => {
    try {
      const slots = await fetchShiftSlots(date)
      setShiftSlots(slots)
      setShiftSlot(slots.length > 0 ? slots[0].name : '')
    } catch (error) {
      console.error('Error fetching shift slots:', error)
      alert('Failed to fetch shift slots. Please try again.')
    }
  }

  const renderDropdown = (items: string[], selectedValue: string, onSelect: (item: string) => void) => (
    <View style={styles.dropdownList}>
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.dropdownItem}
          onPress={() => {
            onSelect(item)
            setShowDurationDropdown(false)
            setShowShiftSlotDropdown(false)
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
    const dateString = currentDate.toISOString().split('T')[0]
    setStartDateString(dateString)
    fetchShiftSlotsForDate(dateString)
  }

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate
    setShowEndDatePicker(Platform.OS === 'ios')
    setEndDate(currentDate)
    setEndDateString(currentDate.toISOString().split('T')[0])
  }

  const handleStartDateInput = (text) => {
    setStartDateString(text)
  }

  const handleEndDateInput = (text) => {
    setEndDateString(text)
  }

  const validateStartDate = () => {
    const date = new Date(startDateString)
    if (isNaN(date.getTime())) {
      alert('Invalid start date. Please enter a valid date in YYYY-MM-DD format.')
      setStartDateString(startDate.toISOString().split('T')[0])
    } else {
      setStartDate(date)
      if (date > endDate) {
        alert('Start date cannot be later than end date. End date has been adjusted.')
        setEndDate(date)
        setEndDateString(date.toISOString().split('T')[0])
      }
      fetchShiftSlotsForDate(startDateString)
    }
  }

  const validateEndDate = () => {
    const date = new Date(endDateString)
    if (isNaN(date.getTime())) {
      alert('Invalid end date. Please enter a valid date in YYYY-MM-DD format.')
      setEndDateString(endDate.toISOString().split('T')[0])
    } else {
      setEndDate(date)
      if (date < startDate) {
        alert('End date cannot be earlier than start date. Start date has been adjusted.')
        setStartDate(date)
        setStartDateString(date.toISOString().split('T')[0])
        fetchShiftSlotsForDate(date.toISOString().split('T')[0])
      }
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      uploadImage(result.assets[0].uri)
    }
  }

  const uploadImage = async (uri) => {
    setUploading(true)
    try {
      // This is where you would implement the actual upload logic
      // For now, we'll just simulate an upload with a delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Image uploaded successfully')
      // In a real scenario, you might get a URL back from your server
      // setImage(uploadedImageUrl)
    } catch (error) {
      console.error('Error uploading image: ', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Apply Sick Leave</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Leave type:</Text>
            <Text style={styles.value}>Sick Leave</Text>
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

          <View style={styles.formGroup}>
            <Text style={styles.label}>Shift Slot:</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowShiftSlotDropdown(!showShiftSlotDropdown)}
            >
              <Text style={styles.dropdownText}>{shiftSlot || 'Select shift slot'}</Text>
              <ChevronDown color="#000" size={20} />
            </TouchableOpacity>
            {showShiftSlotDropdown && renderDropdown(
              shiftSlots.map(slot => slot.name),
              shiftSlot,
              (selected) => {
                setShiftSlot(selected)
                setShowShiftSlotDropdown(false)
              }
            )}
            <Text style={styles.shiftTime}>
              {shiftSlots.find(slot => slot.name === shiftSlot)?.time}
            </Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Duration:</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowDurationDropdown(!showDurationDropdown)}
            >
              <Text style={styles.dropdownText}>{duration}</Text>
              <ChevronDown color="#000" size={20} />
            </TouchableOpacity>
            {showDurationDropdown && renderDropdown(durations, duration, setDuration)}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Proof(if needed):</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage} disabled={uploading}>
              <Upload color="#000" size={20} />
              <Text style={styles.uploadButtonText}>
                {uploading ? 'Uploading...' : 'Upload'}
              </Text>
            </TouchableOpacity>
            {image && (
              <Image source={{ uri: image }} style={styles.uploadPreview} />
            )}
          </View>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply Sick Leave</Text>
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
      backgroundColor: '#f0f0f0',
      borderRadius: 4,
      padding: 12,
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
    uploadPreview: {
      width: '100%',
      height: 200,
      marginTop: 8,
      borderRadius: 4,
    },
    applyButton: {
      backgroundColor: '#90EE90',
      padding: 16,
      borderRadius: 4,
      alignItems: 'center',
      marginTop: 20,
    },
    applyButtonText: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
    },
    shiftTime: {
      fontSize: 14,
      color: '#666',
      marginTop: 4,
    },
  })