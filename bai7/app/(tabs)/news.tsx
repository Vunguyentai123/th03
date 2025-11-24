import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const NEWS_DATA = [
  {
    title: 'Tin tức công nghệ 1',
    content: 'Nội dung tin tức về công nghệ mới nhất...',
    date: '24/11/2025',
  },
  {
    title: 'Tin tức kinh doanh 2',
    content: 'Thông tin về thị trường và kinh doanh...',
    date: '23/11/2025',
  },
  {
    title: 'Tin tức thể thao 3',
    content: 'Cập nhật tin tức thể thao trong nước và quốc tế...',
    date: '22/11/2025',
  },
];

const NEWS_ITEMS = NEWS_DATA.map((item, index) => ({
  id: String(index + 1),
  ...item,
}));

export default function NewsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Tin tức</Text>
      {NEWS_ITEMS.map((item) => (
        <View key={item.id} style={styles.newsCard}>
          <Text style={styles.newsTitle}>{item.title}</Text>
          <Text style={styles.newsDate}>{item.date}</Text>
          <Text style={styles.newsContent}>{item.content}</Text>
        </View>
      ))}
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
    paddingBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  newsCard: {
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
  newsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 8,
  },
  newsContent: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});
