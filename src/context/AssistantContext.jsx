import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const AssistantContext = createContext(null);

const PAGE_CONTEXTS = {
  '/chatbot':     'The user is on the AI Chatbot page — a rule-based chat interface.',
  '/movies':      'The user is on the Movie Recommender page — they can search for movies and get content-based recommendations.',
  '/tictactoe':   'The user is on the Tic Tac Toe page — they play against a Minimax AI with Easy, Medium, and Hard difficulty.',
  '/temperature': 'The user is on the Temperature Converter page — it converts between Celsius, Fahrenheit, and Kelvin in real time.',
};

const BASE_SYSTEM = `You are a helpful AI assistant embedded in the CodSoft dashboard.
Be concise, friendly, and context-aware. When relevant, give tips about the current tool the user is viewing.`;

export function AssistantProvider({ children }) {
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm your dashboard assistant. Ask me anything, or I can help you with the current tool. 👋" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const historyRef              = useRef([]);
  const location                = useLocation();

  const toggle = useCallback(() => setIsOpen(o => !o), []);
  const close  = useCallback(() => setIsOpen(false), []);

  const clearChat = useCallback(() => {
    historyRef.current = [];
    setMessages([
      { role: 'assistant', text: "Hi! I'm your dashboard assistant. Ask me anything, or I can help you with the current tool. 👋" }
    ]);
  }, []);

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim() || isTyping) return;

    const pageCtx = PAGE_CONTEXTS[location.pathname] ?? '';
    const systemPrompt = `${BASE_SYSTEM}\n\nCurrent page context: ${pageCtx}`;

    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);
    historyRef.current = [...historyRef.current, { role: 'user', content: userText }];

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) throw new Error('VITE_GROQ_API_KEY is not set.');

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            ...historyRef.current,
          ],
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `API error ${res.status}`);
      }

      const data  = await res.json();
      const reply = data.choices[0].message.content;

      historyRef.current = [...historyRef.current, { role: 'assistant', content: reply }];
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: `⚠️ ${err.message}` }]);
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, location.pathname]);

  return (
    <AssistantContext.Provider value={{ isOpen, toggle, close, messages, isTyping, sendMessage, clearChat }}>
      {children}
    </AssistantContext.Provider>
  );
}

export const useAssistant = () => useContext(AssistantContext);
