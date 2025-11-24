import React, { useState, useEffect, useRef } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function TabOneScreen() {
  const [inputSeconds, setInputSeconds] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            // Trigger vibration and show alert when time's up
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert('Thông báo', "Time's up!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    const seconds = parseInt(inputSeconds, 10);
    if (isNaN(seconds) || seconds <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập số giây hợp lệ (>0)');
      return;
    }
    setTimeLeft(seconds);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setInputSeconds('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Đồng hồ đếm ngược</Text>

        <View style={styles.timerDisplay}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        {timeLeft === 0 && !isRunning && inputSeconds === '' ? (
          <Text style={styles.statusText}>Nhập số giây để bắt đầu</Text>
        ) : null}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nhập số giây</Text>
        <TextInput
          value={inputSeconds}
          onChangeText={setInputSeconds}
          placeholder="Ví dụ: 10"
          placeholderTextColor="#64748b"
          keyboardType="numeric"
          style={styles.input}
          editable={!isRunning}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.startButton]}
          onPress={handleStart}
          disabled={isRunning}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.stopButton]}
          onPress={handleStop}
          disabled={!isRunning && timeLeft === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
    color: '#0f172a',
  },
  timerDisplay: {
    alignItems: 'center',
    marginBottom: 32,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timerText: {
    fontSize: 64,
    fontWeight: '700',
    color: '#2563eb',
    fontVariant: ['tabular-nums'],
  },
  statusText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#0f172a',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    fontSize: 16,
    color: '#0f172a',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#10b981',
  },
  stopButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
