import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function RoleSelector() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Ghost Agent</Text>
      <Text style={styles.subtitle}>Tell us how you plan to use the app.</Text>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => router.replace('/seller-dashboard')}
      >
        <Text style={styles.optionText}>I'm looking to sell my home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => router.replace('/dashboard')}
      >
        <Text style={styles.optionText}>I'm a real estate investor</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/auth')}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#050816',
  },
  title: {
    fontSize: 28,
    color: '#F9FAFB',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#A5B4FC',
    textAlign: 'center',
    marginBottom: 40,
  },
  optionButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '600',
  },
  back: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 20,
  },
});
