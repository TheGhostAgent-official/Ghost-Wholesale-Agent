import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type ChatMessage = {
  id: number;
  from: 'seller' | 'agent';
  text: string;
};

export default function SellerChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      from: 'agent',
      text: "Hey there 👋 I'm your Ghost Agent. Tell me a little about the property you want to sell.",
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextId = messages.length ? messages[messages.length - 1].id + 1 : 1;

    // Add seller message
    const sellerMsg: ChatMessage = {
      id: nextId,
      from: 'seller',
      text: trimmed,
    };

    // Very simple fake agent reply (for now)
    const agentMsg: ChatMessage = {
      id: nextId + 1,
      from: 'agent',
      text: "Got it 👍 I'll use this info to help generate an offer on your home.",
    };

    setMessages(prev => [...prev, sellerMsg, agentMsg]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Sell Your Home</Text>
          <Text style={styles.subtitle}>
            Chat with your Ghost Agent to get an offer on your property.
          </Text>
        </View>

        <View style={styles.card}>
          <ScrollView
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
          >
            {messages.map(msg => (
              <View
                key={msg.id}
                style={[
                  styles.bubble,
                  msg.from === 'seller' ? styles.sellerBubble : styles.agentBubble,
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    msg.from === 'seller' ? styles.sellerText : styles.agentText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Describe your property, timeline, or situation..."
              placeholderTextColor="#A0AEC0"
              value={input}
              onChangeText={setInput}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendLabel}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Once your offer is generated, you'll be able to review, accept, or decline it
            right from this app.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#050816',
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    color: '#F9FAFB',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    color: '#A0AEC0',
    marginTop: 4,
  },
  card: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    borderRadius: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.35)',
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  bubble: {
    maxWidth: '82%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 8,
  },
  sellerBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4C51BF',
    borderBottomRightRadius: 4,
  },
  agentBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#111827',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(75, 85, 99, 0.8)',
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 19,
  },
  sellerText: {
    color: '#F9FAFB',
  },
  agentText: {
    color: '#E5E7EB',
  },
  inputRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(31, 41, 55, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#020617',
    color: '#F9FAFB',
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.9)',
    fontSize: 13,
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#4C51BF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendLabel: {
    color: '#F9FAFB',
    fontWeight: '600',
    fontSize: 13,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
