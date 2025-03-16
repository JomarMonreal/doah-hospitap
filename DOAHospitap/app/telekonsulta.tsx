import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import axios from 'axios';
import { UserContext } from '@/providers/UserProvider';

const API = 'https://doah-backend.vercel.app/api/messages';

const MessagingScreen = () => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API}/user/${user.id}`);
      console.log(response)
      setMessages(response.data.sort((a, b) => new Date(b.date) - new Date(a.date))); // Sort by latest
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      userId: user.id,
      text: newMessage,
      sender: 'patient',
    };

    try {
        console.log(messageData, API)
      await axios.post(API, messageData);
      setMessages([messageData, ...messages]); // Add to UI
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <LinearGradient colors={['#AED8F8', '#6198AE']} style={styles.background}>
        <View style={styles.header}>
          <FontAwesome5 name="comments" size={30} color="#6198AE" />
          <Text style={styles.heading}>Telekonsulta</Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          inverted
          renderItem={({ item }) => (
            <View style={[styles.messageContainer, item.sender === 'patient' ? styles.right : styles.left]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
      </LinearGradient>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <FontAwesome5 name="paper-plane" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  left: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0f7fa',
  },
  right: {
    alignSelf: 'flex-end',
    backgroundColor: '#aed581',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#6198AE',
    padding: 10,
    borderRadius: 10,
  },
});

export default MessagingScreen;