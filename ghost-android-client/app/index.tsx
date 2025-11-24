import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.appTitle}>Ghost Agent</Text>
        <Text style={styles.subTitle}>Client Console</Text>

        <Text style={styles.heroText}>
          Automate every call, lead, and follow-up with an AI agent that sounds human
          and closes deals while you sleep.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome</Text>
          <Text style={styles.cardBody}>
            Create your Ghost Agent account so you can connect your business number,
            track conversations, and manage leads from one clean, professional dashboard.
          </Text>

          <Link href="/auth" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Sign In / Create Account</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <Text style={styles.footerText}>
          Powered by Ghost Agency · Built for closer-level conversations.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F9FAFB',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: '#A5B4FC',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  heroText: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: 'rgba(15,23,42,0.95)',
    borderWidth: 1,
    borderColor: 'rgba(129,140,248,0.5)',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 32,
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
  },
});
