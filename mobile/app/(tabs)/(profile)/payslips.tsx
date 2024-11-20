import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { format, subMonths } from 'date-fns';
import { useQuery } from "@tanstack/react-query";
import { getPayslip } from '@/api/payslip-api';

interface PayslipData {
  id: number;
  nickname: string;
  employee_type: 'Full Time' | 'Part Time';
  ft_wage?: number;
  pt_wage?: number;
  work_hour?: number;
}

export default function Payslip() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);

  const { data: payslip, isLoading, error } = useQuery<PayslipData>({
    queryKey: ["payslip", format(selectedMonth, 'yyyy-MM')],
    queryFn: () => getPayslip(format(selectedMonth, 'yyyy-MM')),
  });

  const months = Array.from({ length: 6 }, (_, i) => subMonths(new Date(), i));

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading payslip: {error instanceof Error ? error.message : String(error)}</Text>
      </View>
    );
  }

  if (!payslip) {
    return (
      <View style={styles.centerContainer}>
        <Text>No payslip data available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Payslip</Text>
      
      <TouchableOpacity style={styles.monthSelector} onPress={() => setModalVisible(true)}>
        <Text style={styles.monthSelectorText}>
          {format(selectedMonth, 'MMMM yyyy')}
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
            <Text style={styles.modalTitle}>Select Month</Text>
            <ScrollView>
              {months.map((month) => (
                <TouchableOpacity
                  key={month.toISOString()}
                  style={styles.monthOption}
                  onPress={() => {
                    setSelectedMonth(month);
                    setModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.monthOptionText,
                    selectedMonth.getMonth() === month.getMonth() && 
                    selectedMonth.getFullYear() === month.getFullYear() && 
                    styles.selectedMonthText
                  ]}>
                    {format(month, 'MMMM yyyy')}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={styles.content}>
        <InfoRow label="Staff No:" value={payslip.id} />
        <InfoRow label="Name:" value={payslip.nickname} />
        <InfoRow label="Employee Type:" value={payslip.employee_type} />
        <View style={styles.spacerRow} />
        <InfoRow label="Salary Period:" value={format(selectedMonth, 'MMM-yyyy')} />

        {payslip.employee_type === 'Full Time' ? (
          <>
            <InfoRow 
              label="Basic Salary:" 
              value={`$${payslip.ft_wage?.toFixed(2).toLocaleString() ?? 'N/A'}`} 
            />
            <InfoRow 
              label="Employee MPF Contribution:" 
              value={`-$${((payslip.ft_wage ?? 0) * 0.05).toFixed(2)}`} 
            />
            <View style={styles.spacerRow} />
            <InfoRow 
              label="Net Pay Salary:" 
              value={`$${((payslip.ft_wage ?? 0) * 0.95).toFixed(2)}`} 
            />
          </>
        ) : (
          <>
            <InfoRow 
              label="Basic Salary:" 
              value={`$${((payslip.pt_wage ?? 0) * (payslip.work_hour ?? 0)).toFixed(2)}`}
            />
            <InfoRow 
              label="Employee MPF Contribution:" 
              value="$0.00"
            />
            <View style={styles.spacerRow} />
            <InfoRow 
              label="Net Pay Salary:" 
              value={`$${((payslip.pt_wage ?? 0) * (payslip.work_hour ?? 0)).toFixed(2)}`}
            />
          </>
        )}
      </View>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    fontWeight: '500',
  },
  spacerRow: {
    height: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  monthSelector: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    marginBottom: 20,
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
    maxHeight: '80%',
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
});