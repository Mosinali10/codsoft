const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const msg = message.toLowerCase();
  let response = "I'm not sure how to help with that. Try asking for a joke, a quiz, the time, or to calculate something!";

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    response = "Hello! I'm your SaaS Assistant. How can I help you today?";
  } else if (msg.includes('joke')) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "What do you call fake spaghetti? An impasta!"
    ];
    response = jokes[Math.floor(Math.random() * jokes.length)];
  } else if (msg.includes('quiz')) {
    response = "I'm not ready for a full quiz yet, but here's a quick one: What's the capital of France? (Spoiler: It's Paris!)";
  } else if (msg.includes('time')) {
    response = `The current server time is ${new Date().toLocaleTimeString()}.`;
  } else if (msg.includes('calculate')) {
    response = "I can't do complex math yet, but I know 2 + 2 is 4!";
  } else if (msg.includes('who are you')) {
    response = "I am a simple Chatbot built with Node.js and React.";
  }

  res.json({ response });
});

module.exports = router;
