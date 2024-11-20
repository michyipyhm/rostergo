import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Platform, Modal } from 'react-native';
import { format, addMonths } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useQuery } from "@tanstack/react-query";
import { getPtPayslip } from '@/api/pt-payslip-api';


export default function Payslip() {
  const { data: payslip, isLoading, error } = useQuery({
    queryKey: ["payslip"],
    queryFn: getPtPayslip,
  });

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


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Payslip</Text>
      <View style={styles.content}>
        <InfoRow label="Staff No:" value={payslip.id} />
        <InfoRow label="Name:" value={payslip.nickname} />
        <InfoRow label="Employee Type:" value={payslip.employee_type} />
        <View style={styles.spacerRow} />
        <InfoRow 
          label="Basic Salary:" 
          value={payslip.pt_wage} 
        />
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
});