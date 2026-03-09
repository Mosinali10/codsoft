# 🤖 Interactive Chatbot in C

A feature-rich command-line chatbot implemented in C with quiz games, jokes, calculator, and conversational abilities.

## 📋 Description

This is an interactive chatbot written in C that can engage in conversations, tell jokes, conduct quizzes, perform calculations, and provide the current time. It uses keyword matching for intent recognition and maintains conversation context.

## 🛠️ Technologies Used

- **C Programming Language**
- **Standard C Libraries**:
  - `stdio.h` - Input/output operations
  - `string.h` - String manipulation
  - `stdlib.h` - Memory allocation and utilities
  - `time.h` - Time functions
  - `ctype.h` - Character handling
  - `math.h` - Mathematical operations

## ✨ Features

### 💬 Conversational AI
- Greetings and basic conversation
- Keyword-based intent recognition
- Context-aware responses
- Case-insensitive input processing

### 🎮 Interactive Quiz
- Multiple-choice questions
- Score tracking
- Input validation
- Progressive difficulty

### 😄 Joke Telling
- 10 different jokes
- Two-part joke delivery (setup and punchline)
- Random joke selection
- Interactive joke flow

### 🧮 Calculator
- Basic arithmetic operations (+, -, *, /)
- Input validation
- Error handling for division by zero
- Large number protection

### ⏰ Time Display
- Shows current system time
- Formatted output

## 🚀 How to Run

### Prerequisites

- GCC compiler or any C compiler
- Terminal/Command prompt

### Compilation

```bash
gcc chatbot.c -o chatbot -lm
```

Note: `-lm` flag links the math library

### Running the Chatbot

```bash
./chatbot
```

On Windows:
```bash
chatbot.exe
```

### Usage Examples

#### Starting a Conversation
```
Hello! How can I assist you today?
You: hi
Bot: Hello! How can I assist you today?, type exit to end conversation
```

#### Playing a Quiz
```
You: quiz
Bot: Starting the quiz...

Let's start the quiz!
Answer each question with the corresponding number.

What is 2 + 2?
1) 3 2) 4 3) 5 4) 6

Your answer: 2
Correct!
```

#### Telling Jokes
```
You: tell me a joke
Bot: Why don't scientists trust atoms?
You: why
Bot: Because they make up everything!
```

#### Using Calculator
```
You: calculate
Bot: Sure! Please enter an arithmetic expression to calculate.
You: 15 + 25
Bot: Result: 40.00
```

#### Getting Time
```
You: what's the time
Bot: The current time is: Sun Mar 08 14:30:45 2026
```

## 🎯 Key Functions

### Core Functions
- `get_response()` - Main response handler
- `clean_input()` - Normalizes user input
- `compare_keywords()` - Keyword matching

### Feature Functions
- `start_quiz()` - Quiz game logic
- `tell_joke()` - Joke selection and delivery
- `continue_joke()` - Punchline delivery
- `calculate()` - Arithmetic calculator
- `after_quiz()` - Post-quiz interaction

## 🎮 Available Commands

| Command | Description |
|---------|-------------|
| `hi`, `hello`, `hey` | Greet the bot |
| `quiz` | Start a quiz game |
| `jokes`, `tell me a joke` | Get a random joke |
| `calculate`, `math` | Use calculator |
| `what's the time` | Get current time |
| `suggest something` | See available features |
| `exit` | End conversation |

## 📊 Quiz Questions

The quiz includes questions on:
- Basic arithmetic
- General knowledge
- Multiple-choice format
- Immediate feedback

## 😄 Joke Collection

10 jokes covering:
- Science humor
- Programming jokes
- Wordplay
- General humor

## 📈 Future Improvements

- [ ] Add more quiz questions and categories
- [ ] Implement difficulty levels
- [ ] Add more jokes and categorize them
- [ ] Enhance calculator with advanced operations (power, sqrt, etc.)
- [ ] Add conversation history
- [ ] Implement natural language processing
- [ ] Add user profile and preferences
- [ ] Create GUI version
- [ ] Add weather information (with API)
- [ ] Implement reminder/alarm features
- [ ] Add unit conversion features
- [ ] Support for multiple languages
- [ ] Add machine learning for better responses
- [ ] Implement sentiment analysis
- [ ] Add voice input/output capabilities

## 🐛 Known Issues

- Minor typo in joke: "Becauseq" should be "Because" (line in scarecrow joke)
- Calculator limited to basic operations
- No persistent conversation memory

## 💡 Code Improvements

### Suggested Enhancements

1. **Fix the typo**:
   ```c
   // Line with typo
   {"Why did the scarecrow win an award?", "Becauseq he was outstanding in his field!"}
   // Should be
   {"Why did the scarecrow win an award?", "Because he was outstanding in his field!"}
   ```

2. **Add more robust input validation**
3. **Implement conversation state machine**
4. **Add configuration file for responses**
5. **Improve error messages**

## 🧠 Learning Points

This project demonstrates:
- **String Processing**: Keyword matching and parsing
- **State Management**: Conversation flow control
- **Random Number Generation**: Joke selection
- **Input Validation**: Error handling
- **Modular Design**: Function organization
- **User Experience**: Interactive CLI design

## 👤 Author

**Mosin Ali**  
CodSoft Internship Project

## 📄 License

This project is part of the CodSoft internship program.

---

*Chat, play, and calculate - all in one bot!* 💬🎮🧮
