import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Stack, Link, router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      
      // On successful login, navigate to the main app
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Login Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Login', headerShown: true }} />
      
      <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
      <ThemedText style={styles.subtitle}>Sign in to continue to your audiobooks</ThemedText>

      <TextInput
        style={[
          styles.input,
          { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5' }
        ]}
        placeholder="Email"
        placeholderTextColor={colorScheme === 'dark' ? '#9BA1A6' : '#687076'}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5' }
        ]}
        placeholder="Password"
        placeholderTextColor={colorScheme === 'dark' ? '#9BA1A6' : '#687076'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={[
          styles.button,
          { backgroundColor: Colors[colorScheme].tint }
        ]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <ThemedText style={styles.buttonText}>Login</ThemedText>
        )}
      </TouchableOpacity>

      <ThemedView style={styles.footer}>
        <ThemedText>Don't have an account? </ThemedText>
        <Link href="/auth/signup" asChild>
          <TouchableOpacity>
            <ThemedText type="link">Sign Up</ThemedText>
          </TouchableOpacity>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: '#000', // This will be adjusted by the ThemedText component
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
});