import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/Card';
import { Send, RefreshCcw } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI Assistant. I can tell jokes, give quizzes, do math, share fun facts, and more! Type 'help' to see what I can do! 😊", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const sessionId = useRef(Math.random().toString(36).substring(7));

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, sessionId: sessionId.current })
      });
      const data = await res.json();
      
      // Artificial delay for realism
      setTimeout(() => {
        setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
        setIsTyping(false);
      }, 600);
    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting to the server.", sender: 'bot' }]);
    }
  };

  const clearChat = () => {
    setMessages([{ text: "Hello! I'm your AI Assistant. I can tell jokes, give quizzes, do math, share fun facts, and more! Type 'help' to see what I can do! 😊", sender: 'bot' }]);
    sessionId.current = Math.random().toString(36).substring(7); // New session
  };

  return (
    <Card 
      title="SaaS Chatbot" 
      subtitle="Intelligent keyword-based assistance"
      maxWidth="600px"
    >
      <div 
        ref={scrollRef}
        style={{ 
          height: '350px', 
          overflowY: 'auto', 
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          backgroundColor: 'var(--surface)',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          marginBottom: '0.75rem'
        }}
      >
        {messages.map((msg, i) => (
          <div 
            key={i} 
            style={{ 
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              padding: '0.75rem 1rem',
              borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
              backgroundColor: msg.sender === 'user' ? 'var(--accent)' : 'var(--surface)',
              color: msg.sender === 'user' ? 'white' : 'var(--text)',
              fontSize: '0.9375rem',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div style={{ alignSelf: 'flex-start', color: 'var(--muted)', fontSize: '0.8125rem', fontStyle: 'italic' }}>
            Assistant is typing...
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button 
          onClick={clearChat}
          style={{ 
            padding: '10px', 
            borderRadius: '10px', 
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            color: 'var(--muted)'
          }}
        >
          <RefreshCcw size={20} />
        </button>
        <div style={{ flex: 1, position: 'relative' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            style={{
              width: '100%',
              padding: '0.75rem 3rem 0.75rem 1rem',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              outline: 'none'
            }}
          />
          <button 
            onClick={handleSend}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--accent)'
            }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <p style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        color: 'var(--muted)',
        marginTop: '1rem',
        letterSpacing: '0.02em'
      }}>
        AI Chatbot Assistant — CodSoft Internship Project
      </p>
    </Card>
  );
};

export default Chatbot;
