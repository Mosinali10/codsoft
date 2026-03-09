# Chatbot (C, CLI)

## Project Description

This project is a command-line chatbot written in C. It uses simple keyword matching to route user input to different features (quiz, jokes, calculator, current time) and prints responses directly to the terminal.

## Features

- Keyword-based conversation flow (case-insensitive)
- Quiz mode with scoring
- Random jokes (setup + punchline)
- Basic calculator for expressions like `15 + 25`
- Current time display

## Technology Stack

- C
- Standard C library headers (`stdio.h`, `string.h`, `stdlib.h`, `time.h`, `ctype.h`, `math.h`)

## How to Run the Project

From the repository root:

```bash
cd projects/chatbot-c-cli/src
gcc chatbot.c -o chatbot -lm
```

Run:

- macOS/Linux:

```bash
./chatbot
```

- Windows:

```bash
chatbot.exe
```

## Example Output or Screenshots

Example session:

```
Hello! How can I assist you today?
You: hi
Hello! How can I assist you today?,type exit to end conversation

You: jokes
Why don't scientists trust atoms?
You: why
Because they make up everything!
```

## Project Structure (optional)

```
.
├── README.md
├── src/
│   └── chatbot.c
├── scripts/
│   ├── demo_chatbot.py
│   └── chatbot_demo.py
└── screenshots/
```
