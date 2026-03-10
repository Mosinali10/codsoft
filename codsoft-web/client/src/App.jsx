import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Chatbot from './pages/Chatbot';
import MovieRecommender from './pages/MovieRecommender';
import TicTacToe from './pages/TicTacToe';
import TemperatureConverter from './pages/TemperatureConverter';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/movies" element={<MovieRecommender />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/temperature" element={<TemperatureConverter />} />
          <Route path="/" element={<Navigate to="/chatbot" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
