import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.appTitle}>Ghost Agent</Text>
        <Text style={styles.screenTitle}>Settings</Text>
        <Text style={styles.subtitle}>Connect your business number and manage console defaults.</Text>

        {/* Connect Number card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Business Number</Text>
          <Text style={styles.cardText}>
            Connect your main business line so Ghost Agent can place and receive calls on your behalf.
          </Text>

          <TouchableOpacity style={styles.primaryButton} disabled>
            <Text style={styles.primaryButtonText}>Connect Number (coming soon)</Text>
          </TouchableOpacity>

          <Text style={styles.helperText}>
            You’ll be able to link Twilio, Telnyx, or a forwarded number here.
          </Text>
        </View>

        {/* Account section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account</Text>
          <Text style={styles.cardText}>
            Update plan, team members, and notification preferences (placeholder for now).
          </Text>
        </View>

        <Link href="/dashboard" asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>← Back to Dashboard</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  appTitle: {
    color: '#C4B5FD',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  screenTitle: {
    color: '#F9FAFB',
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    color: '#A5B4FC',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#0B1020',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  cardTitle: {
    color: '#E5E7EB',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardText: {
    color: '#9CA3AF',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 8,
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#F9FAFB',
    fontSize: 13,
    fontWeight: '600',
  },
  helperText: {
    color: '#6B7280',
    fontSize: 11,
  },
  secondaryButton: {
    marginTop: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#374151',
    paddingVertical: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#E5E7EB',
    fontSize: 13,
    fontWeight: '500',
  },
});
