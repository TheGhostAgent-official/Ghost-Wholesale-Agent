import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { GHOST_AGENT_API_BASE } from './config';

const ROLE_AGENT = 'agent';
const ROLE_SELLER = 'seller';

export default function App() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);
  const [error, setError] = useState(null);

  // Start a new Ghost session on first load
  useEffect(() => {
    startGhostSession();
  }, []);

  async function startGhostSession() {
    try {
      setBooting(true);
      setError(null);

      const res = await fetch(\`\${GHOST_AGENT_API_BASE}/session/start\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        throw new Error('Ghost brain returned ' + res.status);
      }

      const data = await res.json();
      setSessionId(data.sessionId);

      if (data.replyText) {
        setMessages([
          {
            id: 'm-1',
            from: ROLE_AGENT,
            text: data.replyText,
            ts: new Date().toISOString(),
          },
        ]);
      }
    } catch (e) {
      console.error('Error starting session', e);
      setError('Could not contact Ghost Agent server.');
    } finally {
      setBooting(false);
    }
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || !sessionId || loading) return;

    const myMessage = {
      id: 'm-' + Date.now(),
      from: ROLE_SELLER,
      text: trimmed,
      ts: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, myMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(\`\${GHOST_AGENT_API_BASE}/session/turn\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: trimmed,
        }),
      });

      if (!res.ok) {
        throw new Error('Ghost brain returned ' + res.status);
      }

      const data = await res.json();
      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
      }

      if (data.replyText) {
        const agentMessage = {
          id: 'm-' + Date.now() + '-agent',
          from: ROLE_AGENT,
          text: data.replyText,
          ts: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, agentMessage]);
      }
    } catch (e) {
      console.error('Error sending turn', e);
      setError('Problem talking to Ghost Agent. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function renderItem({ item }) {
    const isAgent = item.from === ROLE_AGENT;
    return (
      <View
        style={[
          styles.bubbleRow,
          isAgent ? styles.bubbleRowAgent : styles.bubbleRowSeller,
        ]}
      >
        <View
          style={[
            styles.bubble,
            isAgent ? styles.bubbleAgent : styles.bubbleSeller,
          ]}
        >
          <Text style={styles.bubbleFrom}>
            {isAgent ? 'Ghost Agent' : 'You'}
          </Text>
          <Text style={styles.bubbleText}>{item.text}</Text>
        </View>
      </View>
    );
  }

  const disabled = !sessionId || loading || booting;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Ghost Wholesale Agent</Text>
          <Text style={styles.subtitle}>Android Chat Wrapper</Text>
        </View>

        <View style={styles.chatContainer}>
          {booting ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" />
              <Text style={styles.statusText}>Connecting to Ghost brain…</Text>
            </View>
          ) : (
            <>
              {error && (
                <Text style={styles.errorText}>
                  {error}
                </Text>
              )}
              <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
              />
            </>
          )}
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type as the seller…"
            value={input}
            onChangeText={setInput}
            editable={!disabled}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[styles.sendButton, disabled && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={disabled}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.sendText}>Send</Text>
            )}
          </TouchableOpacity>
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
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    marginTop: 2,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 8,
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 8,
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 4,
  },
  bubbleRow: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  bubbleRowAgent: {
    justifyContent: 'flex-start',
  },
  bubbleRowSeller: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
  },
  bubbleAgent: {
    backgroundColor: '#111827',
    borderBottomLeftRadius: 2,
  },
  bubbleSeller: {
    backgroundColor: '#16a34a',
    borderBottomRightRadius: 2,
  },
  bubbleFrom: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    marginBottom: 2,
  },
  bubbleText: {
    color: '#ffffff',
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.1)',
    backgroundColor: '#050816',
  },
  input: {
    flex: 1,
    backgroundColor: '#1f2933',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    color: '#ffffff',
    marginRight: 8,
  },
  sendButton: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  sendText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
