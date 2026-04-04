import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    setError('');
    setLoading(true);
    try {
      await register(username, password);
      router.replace('/(tabs)');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cmuHeader}>
        <Text style={styles.cmuWordmark}>Carnegie Mellon University</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Create Account</Text>
        <Text style={styles.cardSubtitle}>Register your Andrew account</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Andrew ID</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. jsmith"
          placeholderTextColor="#99938d"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#99938d"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.link}>Already have an account? <Text style={styles.linkHighlight}>Log in</Text></Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>CMU Macros · Carnegie Mellon University</Text>
        <Text style={styles.footerText}>Computing Services</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0eb',
  },
  cmuHeader: {
    backgroundColor: '#c41230',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  cmuWordmark: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 4,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    color: '#c41230',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#666',
    fontSize: 14,
    marginBottom: 24,
  },
  label: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#faf9f8',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: '#333',
    fontSize: 16,
    height: 48,
    paddingHorizontal: 14,
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#c41230',
    borderRadius: 4,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
  link: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  linkHighlight: {
    color: '#c41230',
    textDecorationLine: 'underline',
  },
  error: {
    color: '#c41230',
    backgroundColor: '#fff0f0',
    borderWidth: 1,
    borderColor: '#f5c0c0',
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
    marginBottom: 16,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
    gap: 4,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerText: {
    color: '#99938d',
    fontSize: 12,
  },
});