import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Quay lại</Text>
      </TouchableOpacity>

      <View style={styles.detailCard}>
        <Text style={styles.title}>{params.title || 'Không có tiêu đề'}</Text>
        
        <View style={styles.divider} />
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Mã sản phẩm:</Text>
          <Text style={styles.value}>#{params.id}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Mô tả:</Text>
          <Text style={styles.value}>{params.description || 'Không có mô tả'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Giá:</Text>
          <Text style={styles.priceValue}>{params.price || 'Liên hệ'}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.detailText}>
          Đây là trang chi tiết của sản phẩm. Thông tin được truyền từ màn hình Home
          thông qua navigation parameters.
        </Text>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
          <Text style={styles.actionButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
  detailCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    width: 100,
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
  },
  priceValue: {
    flex: 1,
    fontSize: 18,
    color: '#2563eb',
    fontWeight: '700',
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#10b981',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
