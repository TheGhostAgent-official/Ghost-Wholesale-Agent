import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SellerDashboardScreen() {
  const router = useRouter();

  const startChat = () => {
    router.push('/seller-chat');
  };

  const goHome = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Ghost Agent</Text>
          <Text style={styles.subtitle}>Seller Console</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Home, Your Offer</Text>
          <Text style={styles.cardBody}>
            Use this console to talk with your Ghost Agent, share details about your
            property, and receive a no-obligation cash offer.
          </Text>

          <TouchableOpacity style={styles.primaryBtn} onPress={startChat}>
            <Text style={styles.primaryLabel}>Talk to Ghost Agent</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Status</Text>
          <Text style={styles.statusText}>
            Once your conversation is complete, this area will show your offer status,
            follow-ups, and next steps toward closing.
          </Text>
        </View>

        <TouchableOpacity style={styles.linkBtn} onPress={goHome}>
          <Text style={styles.linkText}>← Back to welcome</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Powered by Ghost Agency · Built for sellers who want a simple, direct offer.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#050816',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 28,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#A0AEC0',
  },
  card: {
    borderRadius: 22,
    padding: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.45)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 18,
  },
  primaryBtn: {
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#4C51BF',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryLabel: {
    color: '#F9FAFB',
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
    marginVertical: 14,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  linkBtn: {
    marginTop: 18,
  },
  linkText: {
    fontSize: 13,
    color: '#818CF8',
  },
  footer: {
    marginTop: 18,
    fontSize: 11,
    color: '#6B7280',
  },
});
