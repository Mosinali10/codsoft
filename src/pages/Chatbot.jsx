import React, { useState, useEffect, useRef } from 'react';
import { Send, RefreshCcw, Plus, MessageSquare, Bot } from 'lucide-react';

const SYSTEM_PROMPT = "You are a helpful AI assistant. Be concise and friendly.";

const SUGGESTIONS = [
  "Explain machine learning in simple terms",
  "What is the Minimax algorithm?",
  "How does TF-IDF work?",
  "Write a Python hello world",
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessions, setSessions] = useState([
    { id: 1, title: 'New Chat', active: true },
  ]);
  const scrollRef = useRef(null);
  const historyRef = useRef([]);
  const inputRef = useRef(null);

  const isEmptyChat = messages.length === 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const userText = (text || input).trim();
    if (!userText || isTyping) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    historyRef.current = [...historyRef.current, { role: 'user', content: userText }];

    // update session title from first message
    setSessions(prev => prev.map(s =>
      s.active && s.title === 'New Chat'
        ? { ...s, title: userText.slice(0, 28) + (userText.length > 28 ? '…' : '') }
        : s
    ));

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) throw new Error('VITE_GROQ_API_KEY is not set.');

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...historyRef.current
          ]
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `API error ${res.status}`);
      }

      const data = await res.json();
      const reply = data.choices[0].message.content;
      historyRef.current = [...historyRef.current, { role: 'assistant', content: reply }];
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: `⚠️ ${err.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  const newChat = () => {
    historyRef.current = [];
    setMessages([]);
    setInput('');
    const newId = Date.now();
    setSessions(prev => [
      ...prev.map(s => ({ ...s, active: false })),
      { id: newId, title: 'New Chat', active: true }
    ]);
    inputRef.current?.focus();
  };

  return (
    <div className="chat-page">

      {/* ── Left sidebar ── */}
      <aside className="chat-sidebar">
        <button className="chat-new-btn" onClick={newChat}>
          <Plus size={15} /> New Chat
        </button>

        <p className="chat-sidebar-label">Recent chats</p>

        <div className="chat-session-list">
          {sessions.slice().reverse().map(s => (
            <div
              key={s.id}
              className={`chat-session-item${s.active ? ' active' : ''}`}
              onClick={() => setSessions(prev => prev.map(x => ({ ...x, active: x.id === s.id })))}
            >
              <MessageSquare size={13} />
              <span>{s.title}</span>
            </div>
          ))}
        </div>

        <div className="chat-sidebar-footer">
          <Bot size={14} />
          <span>Llama 3.3 · 70B</span>
        </div>
      </aside>

      {/* ── Main chat area ── */}
      <div className="chat-main">

        {/* header */}
        <div className="chat-main-header">
          <div className="chat-main-title">
            {sessions.find(s => s.active)?.title || 'New Chat'}
          </div>
          <button className="chat-clear-btn" onClick={newChat} title="New chat">
            <RefreshCcw size={15} />
          </button>
        </div>

        {/* messages or welcome */}
        <div ref={scrollRef} className="chat-messages">
          {isEmptyChat ? (
            <div className="chat-welcome">
              <div className="chat-welcome-icon">
                <Bot size={32} />
              </div>
              <h2 className="chat-welcome-title">Let's get started</h2>
              <p className="chat-welcome-sub">
                An AI-powered assistant — ask me anything.
              </p>
              <div className="chat-suggestions">
                {SUGGESTIONS.map(s => (
                  <button key={s} className="chat-suggestion-btn" onClick={() => handleSend(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} className={`chat-bubble ${msg.role}`}>
                  {msg.role === 'assistant' && (
                    <div className="chat-bubble-avatar"><Bot size={14} /></div>
                  )}
                  <div className="chat-bubble-text">{msg.text}</div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-bubble assistant">
                  <div className="chat-bubble-avatar"><Bot size={14} /></div>
                  <div className="chat-typing"><span /><span /><span /></div>
                </div>
              )}
            </>
          )}
        </div>

        {/* input bar */}
        <div className="chat-input-bar">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message here..."
            disabled={isTyping}
            className="chat-input-field"
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping || !input.trim()}
            className="chat-send-fab"
          >
            <Send size={17} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;
