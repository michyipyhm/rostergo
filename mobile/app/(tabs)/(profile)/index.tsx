import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from '@/api/profile-api';
import { format } from 'date-fns';

function InfoItem({ label, value }: { label: string; value: string | number | null }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value || 'N/A'}</Text>
    </View>
  );
}
export default function Profile() {
  const router = useRouter();
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
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
        <Text style={styles.errorText}>Error loading profile</Text>
      </View>
    );
  }

  const formattedJoinDate = profile?.join_date 
    ? format(new Date(profile.join_date), 'dd/MM/yyyy')
    : 'N/A';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <InfoItem label="Nickname" value={profile.nickname} />
        <InfoItem label="Gender" value={profile.gender} />
        <InfoItem label="Phone" value={profile.phone} />
        <InfoItem label="Branch" value={profile.branch} />
        <InfoItem label="Position" value={profile.position} />
        <InfoItem label="Grade" value={profile.grade} />
        <InfoItem label="AL Quota" value={`${profile.annual_leave} day(s)`} />
        <InfoItem label="Join Date" value={formattedJoinDate} />
        
        <TouchableOpacity
          style={styles.payslipsButton}
          onPress={() => router.push('/payslips')}
        >
          <Text style={styles.payslipsButtonText}>Payslips</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: '#666',
  },
  payslipsButton: {
    marginTop: 30,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  payslipsButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});