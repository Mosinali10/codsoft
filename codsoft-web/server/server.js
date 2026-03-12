const express = require('express');
const cors = require('cors');
const chatbotRoutes = require('./routes/chatbot');
const movieRoutes = require('./routes/movie');

const app = express();
const PORT = process.env.PORT || 5000;

// Security: CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://yourdomain.com'
    : 'http://localhost:5173',
  credentials: true
}));

// Security: Limit request body size
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/chat', chatbotRoutes);
app.use('/api/recommend', movieRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
