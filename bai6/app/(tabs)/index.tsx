import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// Thay YOUR_API_KEY bằng API key từ https://openweathermap.org/api
const API_KEY = '6852e6add299e01f5e5a507e8cb65193';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    main: string;
  }>;
}

export default function TabOneScreen() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên thành phố');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);
    Keyboard.dismiss();

    try {
      const response = await fetch(
        `${API_URL}?q=${encodeURIComponent(trimmedCity)}&appid=${API_KEY}&units=metric&lang=vi`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Không tìm thấy thành phố');
        } else if (response.status === 401) {
          throw new Error('API key không hợp lệ');
        }
        throw new Error('Lỗi khi lấy dữ liệu thời tiết');
      }

      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Tra cứu thời tiết</Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={city}
            onChangeText={setCity}
            placeholder="Nhập tên thành phố (VD: Hanoi)"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            returnKeyType="search"
            onSubmitEditing={fetchWeather}
            editable={!loading}
          />
          <TouchableOpacity
            onPress={fetchWeather}
            style={[styles.searchButton, loading && styles.searchButtonDisabled]}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>Đang tải...</Text>
          </View>
        )}

        {error && !loading && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {weatherData && !loading && (
          <View style={styles.weatherCard}>
            <Text style={styles.cityName}>{weatherData.name}</Text>

            <View style={styles.tempContainer}>
              <Text style={styles.temperature}>{Math.round(weatherData.main.temp)}°C</Text>
              <Text style={styles.weatherDescription}>
                {weatherData.weather[0].description.charAt(0).toUpperCase() +
                  weatherData.weather[0].description.slice(1)}
              </Text>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Độ ẩm</Text>
                <Text style={styles.detailValue}>{weatherData.main.humidity}%</Text>
              </View>

              <View style={styles.detailDivider} />

              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Trạng thái</Text>
                <Text style={styles.detailValue}>{weatherData.weather[0].main}</Text>
              </View>
            </View>
          </View>
        )}

        {!weatherData && !loading && !error && (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderIcon}>🌤️</Text>
            <Text style={styles.placeholderText}>Nhập tên thành phố để xem thời tiết</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    fontSize: 16,
    color: '#0f172a',
  },
  searchButton: {
    backgroundColor: '#2563eb',
    width: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  searchButtonText: {
    fontSize: 24,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 48,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  errorIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 16,
    textAlign: 'center',
  },
  weatherCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cityName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 16,
  },
  tempContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  temperature: {
    fontSize: 64,
    fontWeight: '700',
    color: '#2563eb',
  },
  weatherDescription: {
    fontSize: 18,
    color: '#64748b',
    marginTop: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  detailDivider: {
    width: 1,
    backgroundColor: '#e2e8f0',
  },
  placeholderContainer: {
    alignItems: 'center',
    marginTop: 64,
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
