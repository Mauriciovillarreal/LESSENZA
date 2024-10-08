import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../../AuthContext/AuthContext';
import "./Chat.css";

const socket = io('https://lessenza-api.onrender.com', {
  withCredentials: true,
});

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('initial-messages', (msgs) => {
      setMessages(msgs);
    });

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('initial-messages');
      socket.off('chat message');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message && user.email) {
      const msg = {
        user: user.email,
        message,
      };
      socket.emit('chat message', msg);
      setMessage('');
    }
  };

  return (
    <div className="containerChat">
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index} className={msg.user === user.email ? 'mine' : 'other'}>
            {msg.user}: {msg.message}
          </li>
        ))}
      </ul>
      <form id="messageForm" onSubmit={handleSubmit}>
        <input
          type="hidden"
          id="email"
          value={user ? user.email : ''}
          readOnly
        />
        <div className="message-input-container">
          <input
            id="m"
            className="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button type="submit" className="btn1">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Chat;