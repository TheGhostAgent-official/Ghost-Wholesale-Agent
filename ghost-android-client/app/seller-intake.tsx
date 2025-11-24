import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SellerIntakeScreen() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [condition, setCondition] = useState('');
  const [timeline, setTimeline] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    // Later: send this data to your Ghost backend.
    console.log({
      address,
      beds,
      baths,
      condition,
      timeline,
      email,
    });
    router.replace('/dashboard');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tell us about your property</Text>
      <Text style={styles.subtitle}>
        Your Ghost Agent will use this info to help prepare a real offer.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Property address</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="123 Main St, City, State"
          placeholderTextColor="rgba(255,255,255,0.4)"
          style={styles.input}
        />

        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Bedrooms</Text>
            <TextInput
              value={beds}
              onChangeText={setBeds}
              keyboardType="numeric"
              placeholder="3"
              placeholderTextColor="rgba(255,255,255,0.4)"
              style={styles.input}
            />
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Bathrooms</Text>
            <TextInput
              value={baths}
              onChangeText={setBaths}
              keyboardType="numeric"
              placeholder="1.5"
              placeholderTextColor="rgba(255,255,255,0.4)"
              style={styles.input}
            />
          </View>
        </View>

        <Text style={styles.label}>Property condition</Text>
        <TextInput
          value={condition}
          onChangeText={setCondition}
          placeholder="Needs nothing / minor repairs / full rehab"
          placeholderTextColor="rgba(255,255,255,0.4)"
          style={[styles.input, styles.multiline]}
          multiline
        />

        <Text style={styles.label}>How soon are you hoping to sell?</Text>
        <TextInput
          value={timeline}
          onChangeText={setTimeline}
          placeholder="ASAP / 30 days / 60+ days"
          placeholderTextColor="rgba(255,255,255,0.4)"
          style={styles.input}
        />

        <Text style={styles.label}>Best email for your offer</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.chatHeader}>How the agent will talk to you</Text>
        <Text style={styles.chatBody}>
          Once this connects to your Ghost Agent brain, this area will become a
          live conversation where the agent asks follow-up questions and walks
          you to an offer. For now we’re just collecting the basics.
        </Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={handleContinue}>
        <Text style={styles.primaryButtonText}>Submit & return to dashboard</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => router.replace('/dashboard')}>
        <Text style={styles.secondaryButtonText}>Cancel</Text>
      </Pressable>
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
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#0B1020',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.3)',
  },
  label: {
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
    marginBottom: 12,
  },
  multiline: {
    borderRadius: 14,
    minHeight: 70,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  rowItem: {
    flex: 1,
  },
  chatHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
  },
  chatBody: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 18,
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
    fontSize: 14,
  },
  secondaryButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: 'rgba(148,163,184,0.9)',
    fontSize: 13,
  },
});
