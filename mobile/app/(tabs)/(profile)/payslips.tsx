import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Platform, Modal } from 'react-native';
import { format, addMonths } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface PayslipData {
  staffNo: string;
  name: string;
  baseSalary: number;
  overTime: number;
  lateDeduction: number;
  totalSalary: number;
  mpfContribution: number;
  netPaySalary: number;
}

export default function PayslipsScreen() {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);

  // Generate last 3 months
  const currentDate = new Date();
  const months = Array.from({ length: 3 }, (_, i) => {
    const date = addMonths(currentDate, -i);
    return format(date, 'MMMM, yyyy');
  });

  const payslipData: PayslipData = {
    staffNo: '12345',
    name: 'Chan Tai Man',
    baseSalary: 5000,
    overTime: 500,
    lateDeduction:200,
    totalSalary: 5300,
    mpfContribution: 0,
    netPaySalary: 5300
  };

  const handleSave = async () => {
    try {
      const content = `Payslip for ${selectedMonth}\n
Staff No: ${payslipData.staffNo}
Name: ${payslipData.name}
Salary Period: ${selectedMonth}
Base: ${payslipData.baseSalary}
Over Time: ${payslipData.overTime}
Late Deduction: ${payslipData.lateDeduction}
Total Salary: ${payslipData.totalSalary}
MPF Contribution: ${payslipData.mpfContribution}
NetPay Salary: ${payslipData.netPaySalary}`;

      const fileUri = `${FileSystem.documentDirectory}payslip-${selectedMonth}.txt`;
      await FileSystem.writeAsStringAsync(fileUri, content);

      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        await Sharing.shareAsync(fileUri);
      }
    } catch (error) {
      console.error('Error saving payslip:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.monthSelector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.monthSelectorText}>
          {selectedMonth || 'Select which month'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select which month</Text>
            {months.map((month) => (
              <TouchableOpacity
                key={month}
                style={styles.monthOption}
                onPress={() => {
                  setSelectedMonth(month);
                  setModalVisible(false);
                }}
              >
                <Text style={[
                  styles.monthOptionText,
                  selectedMonth === month && styles.selectedMonthText
                ]}>
                  {month}
                </Text>
                {selectedMonth === month && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Text style={styles.title}>Payslips</Text>

      <View style={styles.content}>
        <InfoRow label="Staff No:" value={payslipData.staffNo} />
        <InfoRow label="Name:" value={payslipData.name} />
        <View style={styles.spacerRow} />
        <InfoRow label="Salary Period:" value={selectedMonth || '-'} />
        <InfoRow label="- Base:" value={payslipData.baseSalary} />
        <InfoRow label="- Over Time:" value={payslipData.overTime} />
        <InfoRow label="- Late Deduction:" value={payslipData.lateDeduction} />
        <InfoRow label="- Total Salary:" value={payslipData.totalSalary} />
        <InfoRow label="- MPF Contribution:" value={payslipData.mpfContribution} />
        <View style={styles.spacerRow} />
        <InfoRow label="Net Pay Salary:" value={payslipData.netPaySalary} />
      </View>

      <TouchableOpacity
        style={styles.saveButton} 
        onPress={handleSave}
        disabled={!selectedMonth}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  monthSelector: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  monthSelectorText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  monthOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  monthOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedMonthText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  checkmark: {
    color: '#007AFF',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  spacerRow: {
    height: 20,
  },
  saveButton: {
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#000',
  },
});