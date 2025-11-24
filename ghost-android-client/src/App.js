import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { GHOST_AGENT_API_BASE } from './config';

export default function App() {
  const [sessionId, setSessionId] = useState(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  async function startSession() {
    const res = await axios.post(`${GHOST_AGENT_API_BASE}/session/start`);
    setSessionId(res.data.sessionId);
    setMessages([{ from: 'ghost', text: res.data.replyText }]);
  }

  async function sendTurn() {
    if (!sessionId) return;

    const res = await axios.post(`${GHOST_AGENT_API_BASE}/session/turn`, {
      sessionId,
      turn: input
    });

    setMessages(prev => [
      ...prev,
      { from: 'user', text: input },
      { from: 'ghost', text: res.data.replyText }
    ]);

    setInput('');
  }

  return (
    <View style={styles.container}>
      {!sessionId ? (
        <Button title="Start Session" onPress={startSession} />
      ) : (
        <>
          <ScrollView style={styles.chat}>
            {messages.map((m, i) => (
              <Text key={i} style={m.from === 'user' ? styles.user : styles.ghost}>
                {m.text}
              </Text>
            ))}
          </ScrollView>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type to Ghost Agent..."
          />
          <Button title="Send" onPress={sendTurn} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 60 },
  chat: { flex: 1, marginBottom: 10 },
  user: { textAlign: 'right', marginVertical: 4, color: 'blue' },
  ghost: { textAlign: 'left', marginVertical: 4, color: 'green' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 }
});
