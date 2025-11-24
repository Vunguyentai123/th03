import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TabOneScreen() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

	const handleLogin = () => {
		const nextErrors: { username?: string; password?: string } = {};
		if (!username.trim()) {
			nextErrors.username = 'Username không được để trống';
		}
		if (!password.trim()) {
			nextErrors.password = 'Password không được để trống';
		}

		setErrors(nextErrors);

		if (Object.keys(nextErrors).length === 0) {
			Alert.alert('Thông báo', 'Đăng nhập thành công');
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Đăng nhập</Text>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Username</Text>
				<TextInput
					value={username}
					onChangeText={setUsername}
					placeholder="Nhập username"
					style={[styles.input, errors.username && styles.inputError]}
					placeholderTextColor="#475569"
					autoCapitalize="none"
				/>
				{errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
			</View>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Password</Text>
				<TextInput
					value={password}
					onChangeText={setPassword}
					placeholder="Nhập password"
					style={[styles.input, errors.password && styles.inputError]}
					placeholderTextColor="#475569"
					secureTextEntry
				/>
				{errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
			</View>

			<TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		backgroundColor: '#f8fafc',
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		marginBottom: 32,
		textAlign: 'center',
		color: '#0b1120',
	},
	inputGroup: {
		marginBottom: 20,
	},
	label: {
		fontSize: 14,
		marginBottom: 6,
		color: '#0b1120',
		fontWeight: '600',
	},
	input: {
		backgroundColor: '#fff',
		paddingHorizontal: 14,
		paddingVertical: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#cbd5f5',
		fontSize: 16,
		color: '#0b1120',
	},
	inputError: {
		borderColor: '#ef4444',
	},
	errorText: {
		color: '#ef4444',
		marginTop: 6,
		fontSize: 13,
	},
	button: {
		backgroundColor: '#2563eb',
		paddingVertical: 14,
		borderRadius: 8,
		marginTop: 12,
	},
	buttonText: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
	},
});
