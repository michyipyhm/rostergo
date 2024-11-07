import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface CustomKeypadProps {
  onNumberPress: (num: string) => void;
  onDelete: () => void;
}

export default function CustomKeypad({ onNumberPress, onDelete }: CustomKeypadProps) {
  const numbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', ''],
  ];

  return (
    <View style={styles.keypad}>
      {numbers.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((num, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={[styles.key, !num && styles.emptyKey]}
              onPress={() => num && onNumberPress(num)}
              disabled={!num}
            >
              {num ? (
                <Text style={styles.keyText}>{num}</Text>
              ) : (
                colIndex === 2 && (
                  <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                    <ChevronLeft size={24} color="#000" />
                  </TouchableOpacity>
                )
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keypad: {
    marginTop: 'auto',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  key: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  emptyKey: {
    backgroundColor: '#F2F2F7',
    borderWidth: 0,
  },
  keyText: {
    fontSize: 24,
    fontWeight: '400',
  },
  deleteButton: {
    padding: 10,
  },
});