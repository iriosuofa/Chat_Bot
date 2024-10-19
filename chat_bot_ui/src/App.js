import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');
      fetchBotResponse(input);  // Fetch response from bot
    }
  };

  const fetchBotResponse = async (userMessage) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/send-message', {
        message: input
      });
      const botMessage = { text: response.data.response, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
    }
  };

  return (
    <div className="chat-container">
      <h1>Chatbot</h1>
      <ChatWindow messages={messages} />
      <InputField input={input} setInput={setInput} handleSendMessage={handleSendMessage} />
    </div>
  );
};


const ChatWindow = ({ messages }) => {
  const chatWindowRef = useRef(null);
  
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-window" ref={chatWindowRef}>
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
};

const Message = ({ text, sender }) => {
  return <div className={`message ${sender}`}>{text}</div>;
};

const InputField = ({ input, setInput, handleSendMessage }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default App;