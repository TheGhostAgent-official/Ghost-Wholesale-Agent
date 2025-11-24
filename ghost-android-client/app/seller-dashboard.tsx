import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function SellerDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Home Offer</Text>
      <Text style={styles.sub}>We’ll guide you through the process.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Status</Text>
        <Text style={styles.cardValue}>Pending Intake</Text>
        <Text style={styles.desc}>Answer a few questions so we can prepare your offer.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/seller-intake')}
        >
          <Text style={styles.buttonText}>Start Intake</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.replace('/auth')}>
        <Text style={styles.logout}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 26,
    color: '#F9FAFB',
    fontWeight: '800',
    marginBottom: 4,
  },
  sub: {
    color: '#A5B4FC',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#0B1020',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  cardTitle: {
    color: '#E5E7EB',
    fontSize: 16,
    fontWeight: '700',
  },
  cardValue: {
    color: '#a78bfa',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
  desc: {
    color: '#9CA3AF',
    fontSize: 13,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  logout: {
    textAlign: 'center',
    marginTop: 40,
    color: '#6B7280',
  },
});
