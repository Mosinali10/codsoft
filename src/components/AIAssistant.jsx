import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Trash2, Bot } from 'lucide-react';
import { useAssistant } from '../context/AssistantContext';

const PAGE_LABELS = {
  '/chatbot':     'Chatbot',
  '/movies':      'Movie Recommender',
  '/tictactoe':   'Tic Tac Toe',
  '/temperature': 'Temperature Converter',
};

export default function AIAssistant() {
  const { isOpen, toggle, close, messages, isTyping, sendMessage, clearChat } = useAssistant();
  const [input, setInput]   = useState('');
  const scrollRef           = useRef(null);
  const inputRef            = useRef(null);
  const location            = useLocation();
  const pageLabel           = PAGE_LABELS[location.pathname] ?? 'Dashboard';

  // auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // focus input when panel opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <>
      {/* ── Floating toggle button ── */}
      <button
        onClick={toggle}
        aria-label="Toggle AI Assistant"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 200,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          color: 'white',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(34,197,94,0.45)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(34,197,94,0.55)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(34,197,94,0.45)';
        }}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* ── Panel ── */}
      <div
        style={{
          position: 'fixed',
          bottom: '5rem',
          right: '1.5rem',
          zIndex: 199,
          width: '360px',
          maxHeight: '520px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          boxShadow: '0 16px 48px rgba(15,23,42,0.14), 0 4px 12px rgba(15,23,42,0.08)',
          overflow: 'hidden',
          // slide-in animation via transform + opacity
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.875rem 1rem',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--card-bg)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '8px',
              backgroundColor: 'rgba(34,197,94,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Bot size={17} color="var(--accent)" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', lineHeight: 1.2 }}>AI Assistant</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 500 }}>
                {pageLabel}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button
              onClick={clearChat}
              title="Clear chat"
              style={{
                padding: '5px', border: 'none', background: 'transparent',
                color: 'var(--muted)', borderRadius: '6px', display: 'flex',
                alignItems: 'center', transition: 'color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--background)'; e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; }}
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={close}
              title="Close"
              style={{
                padding: '5px', border: 'none', background: 'transparent',
                color: 'var(--muted)', borderRadius: '6px', display: 'flex',
                alignItems: 'center', transition: 'color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--background)'; e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.875rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            backgroundColor: 'var(--background)',
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className="fade-in"
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                padding: '0.55rem 0.8rem',
                borderRadius: msg.role === 'user' ? '14px 14px 3px 14px' : '14px 14px 14px 3px',
                backgroundColor: msg.role === 'user' ? 'var(--accent)' : 'var(--surface)',
                color: msg.role === 'user' ? 'white' : 'var(--text)',
                fontSize: '0.875rem',
                lineHeight: 1.55,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {msg.text}
            </div>
          ))}

          {isTyping && (
            <div className="chat-typing" style={{ alignSelf: 'flex-start' }}>
              <span /><span /><span />
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{
          padding: '0.75rem',
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--card-bg)',
          flexShrink: 0,
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={`Ask about ${pageLabel}...`}
            disabled={isTyping}
            style={{
              flex: 1,
              padding: '0.6rem 0.875rem',
              borderRadius: '10px',
              border: '1.5px solid var(--border)',
              outline: 'none',
              fontSize: '0.875rem',
              backgroundColor: 'var(--surface)',
              color: 'var(--text)',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              opacity: isTyping ? 0.6 : 1,
            }}
            onFocus={e => {
              e.target.style.borderColor = 'var(--accent)';
              e.target.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.12)';
            }}
            onBlur={e => {
              e.target.style.borderColor = 'var(--border)';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            style={{
              flexShrink: 0,
              width: '36px', height: '36px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: isTyping || !input.trim() ? 'var(--border)' : 'var(--accent)',
              color: isTyping || !input.trim() ? 'var(--muted)' : 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background-color 0.15s',
              cursor: isTyping || !input.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
