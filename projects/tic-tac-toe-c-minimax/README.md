# Tic Tac Toe (C, Minimax AI)

## Project Description

This project is a command-line Tic Tac Toe game written in C. You play as `X` against an AI (`O`) that selects optimal moves using the minimax algorithm.

## Features

- Play vs minimax AI
- Win and draw detection
- ASCII board display
- Simple 1–9 input mapping for moves

## Technology Stack

- C (GCC/Clang compatible)

## How to Run the Project

From the repository root:

```bash
cd projects/tic-tac-toe-c-minimax/src
gcc tic_tac_toe.c -o tic_tac_toe
```

Run:

- macOS/Linux:

```bash
./tic_tac_toe
```

- Windows:

```bash
tic_tac_toe.exe
```

## Example Output or Screenshots

Example board and prompt:

```
| X | O |   |
|---|---|---|
|   | X |   |
|---|---|---|
| O |   |   |

Player X, enter your move (1-9):
```

If you add screenshots later, place them in `screenshots/` and link them here.

## Project Structure (optional)

```
.
├── README.md
├── src/
│   └── tic_tac_toe.c
├── scripts/
│   ├── demo_tictactoe.py
│   └── auto_demo_tictactoe.py
└── screenshots/
```
