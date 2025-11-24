import React, { useState, useEffect } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const STORAGE_KEY = '@todos';

export default function TabOneScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Load todos from AsyncStorage on mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Save todos to AsyncStorage whenever they change
  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadTodos = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTodos(JSON.parse(stored));
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải dữ liệu');
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu dữ liệu');
    }
  };

  const addTodo = () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung công việc');
      return;
    }
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInputText('');
    Keyboard.dismiss();
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id: string) => {
    const trimmed = editText.trim();
    if (!trimmed) {
      Alert.alert('Lỗi', 'Tên công việc không được để trống');
      return;
    }
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo)));
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const deleteTodo = (id: string) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa công việc này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => setTodos(todos.filter((todo) => todo.id !== id)),
      },
    ]);
  };

  const renderTodo = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item.id;

    return (
      <View style={styles.todoItem}>
        <TouchableOpacity onPress={() => toggleComplete(item.id)} style={styles.checkbox}>
          <View style={[styles.checkboxBox, item.completed && styles.checkboxChecked]}>
            {item.completed && <Text style={styles.checkboxMark}>✓</Text>}
          </View>
        </TouchableOpacity>

        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              value={editText}
              onChangeText={setEditText}
              style={styles.editInput}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={() => saveEdit(item.id)}
            />
            <View style={styles.editButtons}>
              <TouchableOpacity onPress={() => saveEdit(item.id)} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Lưu</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelEdit} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Text style={[styles.todoText, item.completed && styles.todoTextCompleted]}>{item.text}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => startEdit(item)} style={styles.editIconButton}>
                <Text style={styles.editText}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Danh sách công việc</Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Thêm công việc mới..."
            placeholderTextColor="#94a3b8"
            style={styles.input}
            returnKeyType="done"
            onSubmitEditing={addTodo}
          />
          <TouchableOpacity onPress={addTodo} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={renderTodo}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Chưa có công việc nào. Thêm công việc mới!</Text>
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
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
    marginBottom: 16,
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
  addButton: {
    backgroundColor: '#10b981',
    width: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 16,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkboxMark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  editIconButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#3b82f6',
    borderRadius: 6,
  },
  editText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ef4444',
    borderRadius: 6,
  },
  deleteText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  editContainer: {
    flex: 1,
  },
  editInput: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2563eb',
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 8,
  },
  editButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 32,
  },
});
