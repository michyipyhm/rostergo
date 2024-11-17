import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserInformationScreen() {
  const userInfo = {
    username: 'JohnDoe',
    gender: 'M',
    phoneNumber: '123-456-7890',
    branch: 'Main Office',
    position: 'Software Developer',
    alQuota: '20 days',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Information</Text>
      <View style={styles.infoContainer}>
        <InfoItem label="Username" value={userInfo.username} />
        <InfoItem label="Gender" value={userInfo.gender} />
        <InfoItem label="Phone number" value={userInfo.phoneNumber} />
        <InfoItem label="Branch" value={userInfo.branch} />
        <InfoItem label="Position" value={userInfo.position} />
        <InfoItem label="AL Quota" value={userInfo.alQuota} />
      </View>
    </View>
  );
}

function InfoItem({ label, value }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 15,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    color: '#666666',
  },
});