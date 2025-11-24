import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

const ITEMS = [
  { id: '1', title: 'Sản phẩm 1', description: 'Mô tả sản phẩm 1', price: '100,000đ' },
  { id: '2', title: 'Sản phẩm 2', description: 'Mô tả sản phẩm 2', price: '200,000đ' },
  { id: '3', title: 'Sản phẩm 3', description: 'Mô tả sản phẩm 3', price: '300,000đ' },
  { id: '4', title: 'Sản phẩm 4', description: 'Mô tả sản phẩm 4', price: '400,000đ' },
  { id: '5', title: 'Sản phẩm 5', description: 'Mô tả sản phẩm 5', price: '500,000đ' },
  { id: '6', title: 'Sản phẩm 6', description: 'Mô tả sản phẩm 6', price: '600,000đ' },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleItemPress = (item: typeof ITEMS[0]) => {
    router.push({
      pathname: '/detail',
      params: {
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
      },
    });
  };

  const renderItem = ({ item }: { item: typeof ITEMS[0] }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách sản phẩm</Text>
      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 48,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563eb',
  },
});
