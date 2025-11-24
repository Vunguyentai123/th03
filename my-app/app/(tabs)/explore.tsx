import { Image } from 'expo-image';
import { Platform, StyleSheet, FlatList, View, TouchableOpacity, Alert } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts, Colors } from '@/constants/theme';

const STUDENTS = Array.from({ length: 20 }).map((_, i) => ({
  id: String(i + 1),
  name: `Sinh viên ${i + 1}`,
  age: 18 + (i % 5),
  className: `Lớp ${Math.floor(i / 5) + 1}`,
}));

export default function TabTwoScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={styles.headerWrapper}>
        <IconSymbol
          size={160}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </ThemedText>
      </View>
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
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  headerWrapper: {
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 12,
  },
  listSection: {
    marginVertical: 12,
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
