import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/rostergo10.webp')}
        style={styles.logo}
      />
      <ThemedText type="title" style={styles.title}>RosterGo</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A1423',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'white',
  },
});