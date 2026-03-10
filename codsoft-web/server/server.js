const express = require('express');
const cors = require('cors');
const chatbotRoutes = require('./routes/chatbot');
const movieRoutes = require('./routes/movie');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatbotRoutes);
app.use('/api/recommend', movieRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
