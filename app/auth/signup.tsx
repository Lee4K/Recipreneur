import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Stack, Link, router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SignupScreen() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      const { error, user } = await signUp(email, password);
      if (error) throw error;
      
      if (user) {
        Alert.alert(
          'Success', 
          'Registration successful! Please check your email to confirm your account.',
          [{ text: 'OK', onPress: () => router.replace('/auth/login') }]
        );
      }
    } catch (error) {
      Alert.alert('Signup Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Sign Up', headerShown: true }} />
      
      <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
      <ThemedText style={styles.subtitle}>Sign up to start your audiobook journey</ThemedText>

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

      <TextInput
        style={[
          styles.input,
          { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5' }
        ]}
        placeholder="Confirm Password"
        placeholderTextColor={colorScheme === 'dark' ? '#9BA1A6' : '#687076'}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={[
          styles.button,
          { backgroundColor: Colors[colorScheme].tint }
        ]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <ThemedText style={styles.buttonText}>Create Account</ThemedText>
        )}
      </TouchableOpacity>

      <ThemedView style={styles.footer}>
        <ThemedText>Already have an account? </ThemedText>
        <Link href="/auth/login" asChild>
          <TouchableOpacity>
            <ThemedText type="link">Login</ThemedText>
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