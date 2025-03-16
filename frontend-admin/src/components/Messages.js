import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Messages.css';

const API = 'https://doah-backend.vercel.app/api';

const Messages = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Get all messages to extract unique user IDs
                const response = await axios.get(`${API}/messages/`);
                const uniqueUserIds = [...new Set(response.data.map(msg => msg.userId))];

                // Fetch user details for each userId
                const userPromises = uniqueUserIds.map(async (userId) => {
                    const userRes = await axios.get(`${API}/user/${userId}`);
                    return { _id: userId, name: userRes.data.name};
                });

                const usersData = await Promise.all(userPromises);
                setUsers(usersData.filter(user => user.name));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            fetchMessages(selectedUser._id);
        }
    }, [selectedUser]);

    const fetchMessages = async (userId) => {
        try {
            const response = await axios.get(`${API}/messages/user/${userId}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const messageData = { userId: selectedUser._id, text: newMessage, sender: 'doctor' };
            await axios.post(`${API}/messages/`, messageData);
            setMessages([...messages, messageData]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="messages-container">
            <div className="users-list">
                <h2>Recent Chats</h2>
                {users.map(user => (
                    <div 
                        key={user._id} 
                        className={`user-item ${selectedUser?._id === user._id ? 'active' : ''}`}
                        onClick={() => setSelectedUser(user)}
                    >
                        {user.name}
                    </div>
                ))}
            </div>
            <div className="chat-window">
                {selectedUser ? (
                    <>
                        <h2>Chat with {selectedUser.name}</h2>
                        <div className="messages-box">
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender === 'doctor' ? 'sent' : 'received'}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="message-input">
                            <input 
                                type="text" 
                                placeholder="Type a message..." 
                                value={newMessage} 
                                onChange={(e) => setNewMessage(e.target.value)}
                                style={{ flex:  1}}
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </>
                ) : (
                    <p>Select a user to start chatting</p>
                )}
            </div>
        </div>
    );
};

export default Messages;
