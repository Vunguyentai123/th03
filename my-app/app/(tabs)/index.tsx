import React from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Alert } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts, Colors } from '@/constants/theme';

const STUDENTS = Array.from({ length: 20 }).map((_, i) => ({
  id: String(i + 1),
  name: `Sinh viên ${i + 1}`,
  age: 18 + (i % 5),
  className: `Lớp ${Math.floor(i / 5) + 1}`,
}));

export default function TabOneScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>Danh sách sinh viên</ThemedText>
      <FlatList
        data={STUDENTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Alert.alert('Sinh viên', item.name)}
            style={styles.itemTouchable}
          >
            <View style={styles.itemContainer}>
              <ThemedText type="defaultSemiBold" style={styles.itemName}>{item.name}</ThemedText>
              <ThemedText style={styles.itemDetails}>Tuổi: {item.age} • Lớp: {item.className}</ThemedText>
            </View>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingVertical: 12,
  },
  itemTouchable: {
    marginVertical: 8,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  itemName: {
    fontSize: 16,
    color: Colors.light.tint,
  },
  itemDetails: {
    color: '#333',
    marginTop: 4,
  },
});
