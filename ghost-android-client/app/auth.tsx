import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'create'>('create');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sellIntent, setSellIntent] = useState<'ready' | 'curious'>('ready');

  const isCreate = mode === 'create';

  function handleSubmit() {
    // 🔒 For now this just simulates auth and goes to the seller dashboard.
    // Later we’ll plug this into a real backend / auth provider.
    if (!email || !password) {
      console.log('Email and password required');
      return;
    }

    router.replace('/dashboard');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.appTitle}>Ghost Agent</Text>
      <Text style={styles.appSubtitle}>Client Console</Text>

      <View style={styles.card}>
        {/* Tabs: Sign In / Create Account */}
        <View style={styles.tabRow}>
          <Pressable
            onPress={() => setMode('signin')}
            style={[styles.tab, mode === 'signin' && styles.tabActive]}
          >
            <Text style={[styles.tabText, mode === 'signin' && styles.tabTextActive]}>
              Sign In
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setMode('create')}
            style={[styles.tab, mode === 'create' && styles.tabActive]}
          >
            <Text style={[styles.tabText, mode === 'create' && styles.tabTextActive]}>
              Create Account
            </Text>
          </Pressable>
        </View>

        <Text style={styles.cardTitle}>
          {isCreate ? 'Create your Ghost Agent account' : 'Welcome back'}
        </Text>
        <Text style={styles.cardBody}>
          {isCreate
            ? 'Set up your console so our AI agent can help you get a real offer on your home.'
            : 'Sign in to see your offers, conversations, and next steps.'}
        </Text>

        {/* Only ask this when creating an account */}
        {isCreate && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Are you looking to sell your home?</Text>
            <View style={styles.chipRow}>
              <Pressable
                onPress={() => setSellIntent('ready')}
                style={[
                  styles.chip,
                  sellIntent === 'ready' && styles.chipActive,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    sellIntent === 'ready' && styles.chipTextActive,
                  ]}
                >
                  Yes, I want to sell
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setSellIntent('curious')}
                style={[
                  styles.chip,
                  sellIntent === 'curious' && styles.chipActive,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    sellIntent === 'curious' && styles.chipTextActive,
                  ]}
                >
                  I’m just exploring
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="you@example.com"
            placeholderTextColor="rgba(255,255,255,0.4)"
            style={styles.input}
          />

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor="rgba(255,255,255,0.4)"
            style={styles.input}
          />
        </View>

        <Pressable onPress={handleSubmit} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>
            {isCreate ? 'Create Account' : 'Sign In'}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.replace('/')} style={styles.secondaryLink}>
          <Text style={styles.secondaryLinkText}>← Back to Home</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#050816',
  },
  container: {
    padding: 24,
    paddingTop: 64,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#0B1020',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#4C5CFF',
  },
  tabText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardBody: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: '#4C5CFF',
    borderColor: '#4C5CFF',
  },
  chipText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  inputLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'rgba(15,23,42,0.95)',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.5)',
    fontSize: 14,
  },
  primaryButton: {
    marginTop: 4,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#5B7CFF',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryLink: {
    marginTop: 14,
    alignItems: 'center',
  },
  secondaryLinkText: {
    color: 'rgba(148,163,184,0.9)',
    fontSize: 13,
  },
});
