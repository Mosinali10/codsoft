import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AIAssistant from './components/AIAssistant';
import { AssistantProvider } from './context/AssistantContext';
import Dashboard from './pages/Dashboard';
import Chatbot from './pages/Chatbot';
import MovieRecommender from './pages/MovieRecommender';
import TicTacToe from './pages/TicTacToe';
import TemperatureConverter from './pages/TemperatureConverter';

function App() {
  return (
    <Router>
      <AssistantProvider>
        <Layout>
          <Routes>
            <Route path="/"            element={<Dashboard />} />
            <Route path="/chatbot"     element={<Chatbot />} />
            <Route path="/movies"      element={<MovieRecommender />} />
            <Route path="/tictactoe"   element={<TicTacToe />} />
            <Route path="/temperature" element={<TemperatureConverter />} />
          </Routes>
        </Layout>
        <AIAssistant />
      </AssistantProvider>
    </Router>
  );
}

export default App;
