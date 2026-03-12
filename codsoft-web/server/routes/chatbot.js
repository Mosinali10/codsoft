const express = require('express');
const router = express.Router();

const conversationContext = new Map();

const jokes = [
  { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything!" },
  { setup: "What do you call fake spaghetti?", punchline: "An impasta!" },
  { setup: "Why don't eggs tell jokes?", punchline: "They'd crack each other up!" },
  { setup: "What do you call a fish with no eyes?", punchline: "Fsh!" },
  { setup: "Why don't programmers like nature?", punchline: "It has too many bugs!" },
  { setup: "Why do Java developers wear glasses?", punchline: "Because they don't C#!" }
];

const quizQuestions = [
  { question: "What's the capital of France?", answer: ["paris"], hint: "City of Love" },
  { question: "What's 2 + 2?", answer: ["4", "four"], hint: "Basic math" },
  { question: "What's the largest planet?", answer: ["jupiter"], hint: "Roman god" },
  { question: "What's the capital of Japan?", answer: ["tokyo"], hint: "Sushi capital" },
  { question: "What's H2O?", answer: ["water"], hint: "You drink it" },
  { question: "Who painted Mona Lisa?", answer: ["leonardo da vinci", "da vinci", "leonardo"], hint: "Renaissance artist" }
];

const funFacts = [
  "Honey never spoils! 3000-year-old honey was found still edible! 🍯",
  "Octopuses have three hearts! 🐙",
  "Bananas are berries, but strawberries aren't! 🍌",
  "Sharks existed before trees! 🦈"
];

const motivationalQuotes = [
  "Believe you can and you're halfway there! 💪",
  "The only way to do great work is to love what you do. ❤️",
  "Success is not final, failure is not fatal. 🌟"
];

function evaluateMath(expression) {
  try {
    const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
    if (sanitized !== expression) return null;
    const result = Function('"use strict"; return (' + sanitized + ')')();
    return isFinite(result) ? result : null;
  } catch {
    return null;
  }
}

function fuzzyMatch(str1, str2) {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  return s1.includes(s2) || s2.includes(s1) || s1 === s2;
}

function getContext(sessionId) {
  if (!conversationContext.has(sessionId)) {
    conversationContext.set(sessionId, {
      lastQuestion: null,
      lastJoke: null,
      correctAnswers: 0,
      totalQuestions: 0,
      userName: null,
      lastTopic: null
    });
  }
  return conversationContext.get(sessionId);
}

router.post('/', (req, res) => {
  const { message, sessionId = 'default' } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const msg = message.toLowerCase().trim();
  const context = getContext(sessionId);
  let response = "";

  // Joke handler
  if (context.lastJoke) {
    const reactions = ['haha', 'lol', 'funny', 'good', 'nice', 'love', '😂', 'hilarious', 'great'];
    const isYes = msg.match(/^(yes|yeah|yup|yep|sure|ok|okay|y|yahh|ya|yea)$/);
    
    if (isYes || msg.includes('another') || msg.includes('more')) {
      const joke = jokes[Math.floor(Math.random() * jokes.length)];
      context.lastJoke = joke;
      response = `${joke.setup}\n\n${joke.punchline}`;
      return res.json({ response });
    } else if (reactions.some(r => msg.includes(r))) {
      response = "Glad you liked it! 😄 Want another joke or try a quiz?";
      context.lastJoke = null;
      context.lastTopic = 'joke';
      return res.json({ response });
    } else if (msg.length < 30) {
      response = `😄 Creative! The punchline was: "${context.lastJoke.punchline}"\n\nAnother?`;
      context.lastJoke = null;
      context.lastTopic = 'joke';
      return res.json({ response });
    }
    context.lastJoke = null;
  }

  // Quiz handler
  if (context.lastQuestion) {
    const correctAnswers = context.lastQuestion.answer;
    const isCorrect = correctAnswers.some(ans => fuzzyMatch(msg, ans));
    
    if (isCorrect) {
      context.correctAnswers++;
      context.totalQuestions++;
      context.lastTopic = 'quiz';
      const percentage = Math.round((context.correctAnswers / context.totalQuestions) * 100);
      response = `🎉 Correct! Score: ${context.correctAnswers}/${context.totalQuestions} (${percentage}%)\n\nAnother?`;
      context.lastQuestion = null;
      return res.json({ response });
    } else if (msg.includes('hint')) {
      response = `💡 Hint: ${context.lastQuestion.hint}`;
      return res.json({ response });
    } else if (msg.includes('skip') || msg.match(/^(no|nope)$/)) {
      context.totalQuestions++;
      context.lastTopic = 'quiz';
      response = `Answer: ${context.lastQuestion.answer[0]}\n\nScore: ${context.correctAnswers}/${context.totalQuestions}`;
      context.lastQuestion = null;
      return res.json({ response });
    } else {
      context.totalQuestions++;
      context.lastTopic = 'quiz';
      response = `❌ Wrong! Answer: ${context.lastQuestion.answer[0]}\n\nScore: ${context.correctAnswers}/${context.totalQuestions}`;
      context.lastQuestion = null;
      return res.json({ response });
    }
  }

  // Name learning
  if (msg.match(/(?:my name is|i'm|call me)\s+(\w+)/i)) {
    const nameMatch = msg.match(/(?:my name is|i'm|call me)\s+(\w+)/i);
    context.userName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
    response = `Nice to meet you, ${context.userName}! 😊`;
  }
  // Greetings
  else if (msg.match(/^(hi|hello|hey|sup|yo)$/)) {
    const greeting = context.userName ? `Hello ${context.userName}!` : "Hello!";
    response = `${greeting} What can I do for you? 😊`;
  }
  // Jokes
  else if (msg.match(/(joke|funny|laugh)/)) {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    context.lastJoke = joke;
    context.lastTopic = 'joke';
    response = `${joke.setup}\n\n${joke.punchline}`;
  }
  // Quiz
  else if (msg.match(/(quiz|question|test)/)) {
    const question = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    context.lastQuestion = question;
    context.lastTopic = 'quiz';
    response = `🧠 ${question.question}\n\n(Type 'hint' or 'skip')`;
  }
  // Score
  else if (msg.match(/(score|stats)/)) {
    if (context.totalQuestions === 0) {
      response = "No quiz attempts yet! Type 'quiz' to start! 🧠";
    } else {
      const percentage = Math.round((context.correctAnswers / context.totalQuestions) * 100);
      response = `📊 Stats:\n✅ ${context.correctAnswers}\n❌ ${context.totalQuestions - context.correctAnswers}\n📈 ${percentage}%`;
    }
  }
  // Fun fact
  else if (msg.match(/(fun fact|fact|interesting)/)) {
    response = funFacts[Math.floor(Math.random() * funFacts.length)];
  }
  // Motivation
  else if (msg.match(/(motivate|inspire)/)) {
    response = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  }
  // Math
  else if (msg.match(/\d+\s*[\+\-\*\/]\s*\d+/)) {
    const mathMatch = msg.match(/[\d\+\-\*\/\(\)\.\s]+/);
    const result = evaluateMath(mathMatch[0]);
    response = result !== null ? `🧮 ${result}` : "Can't calculate that. Try '5 + 3'";
  }
  // Time
  else if (msg.includes('time')) {
    response = `🕐 ${new Date().toLocaleTimeString()}`;
  }
  // Date
  else if (msg.includes('date') || msg.includes('today')) {
    response = `📅 ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`;
  }
  // Help
  else if (msg.includes('help') || msg === '?') {
    response = `I can:\n✨ Tell jokes\n🧠 Quiz you\n🧮 Do math\n📚 Share facts\n💪 Motivate\n\nTry: 'joke', 'quiz', '5+3'`;
  }
  // Yes/No context-aware
  else if (msg.match(/^(yes|yeah|yup|yep|sure|ok|y|yahh|ya)$/)) {
    if (context.lastTopic === 'quiz') {
      const question = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
      context.lastQuestion = question;
      response = `🧠 ${question.question}\n\n(Type 'hint' or 'skip')`;
    } else if (context.lastTopic === 'joke') {
      const joke = jokes[Math.floor(Math.random() * jokes.length)];
      context.lastJoke = joke;
      response = `${joke.setup}\n\n${joke.punchline}`;
    } else {
      response = "What would you like? Try 'joke', 'quiz', or 'help'! 😊";
    }
  }
  // Thanks
  else if (msg.includes('thank')) {
    response = "You're welcome! 😊";
  }
  // Bye
  else if (msg.includes('bye')) {
    response = "Goodbye! 👋";
  }
  // Surprise
  else if (msg.match(/(surprise|random|anything)/)) {
    const options = [
      () => { const j = jokes[Math.floor(Math.random() * jokes.length)]; context.lastJoke = j; return `🎲 ${j.setup}\n\n${j.punchline}`; },
      () => { const q = quizQuestions[Math.floor(Math.random() * quizQuestions.length)]; context.lastQuestion = q; return `🎲 ${q.question}`; },
      () => `🎲 ${funFacts[Math.floor(Math.random() * funFacts.length)]}`
    ];
    response = options[Math.floor(Math.random() * options.length)]();
  }
  // Default
  else {
    const defaults = [
      "Not sure about that. Try 'joke', 'quiz', or 'help'! 😊",
      "Hmm, didn't get that. Want a joke or quiz? 🤖",
      "Try 'surprise me' or 'help' to see what I can do! ✨"
    ];
    response = defaults[Math.floor(Math.random() * defaults.length)];
  }

  res.json({ response });
});

module.exports = router;
