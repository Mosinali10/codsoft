# ⭕ Tic Tac Toe Game with AI

An unbeatable Tic Tac Toe game implemented in C with an AI opponent using the Minimax algorithm.

## 📋 Description

This is a command-line Tic Tac Toe game where you play against an AI that uses the Minimax algorithm to make optimal moves. The AI is unbeatable - the best you can do is draw!

## 🛠️ Technologies Used

- **C Programming Language**
- **Minimax Algorithm** - Game theory decision-making
- **Recursive Backtracking** - For move evaluation

## ✨ Features

- **Intelligent AI Opponent**
  - Uses Minimax algorithm
  - Makes optimal moves
  - Unbeatable gameplay
- **Clean Game Board Display**
  - ASCII art board
  - Clear position markers
- **Win Detection**
  - Checks all winning conditions
  - Detects draws
- **Player vs AI Mode**
  - Human plays as 'X'
  - AI plays as 'O'

## 🚀 How to Run

### Prerequisites

- GCC compiler or any C compiler
- Terminal/Command prompt

### Compilation

```bash
gcc tic_tac_toe.c -o tic_tac_toe
```

### Running the Game

```bash
./tic_tac_toe
```

On Windows:
```bash
tic_tac_toe.exe
```

### How to Play

1. The game displays a 3x3 board
2. You play as 'X' (goes first)
3. Enter a number from 1-9 to place your mark:
   ```
   | 1 | 2 | 3 |
   |---|---|---|
   | 4 | 5 | 6 |
   |---|---|---|
   | 7 | 8 | 9 |
   ```
4. The AI automatically makes its move as 'O'
5. First to get 3 in a row wins!

### Example Gameplay

```
| X | O |   |
|---|---|---|
|   | X |   |
|---|---|---|
| O |   |   |

Player X, enter your move (1-9): 9
```

## 🎯 How the AI Works

### Minimax Algorithm

The AI uses the Minimax algorithm, which:

1. **Evaluates all possible moves** recursively
2. **Assumes optimal play** from both players
3. **Assigns scores** to game states:
   - +1 for AI win
   - -1 for player win
   - 0 for draw
4. **Chooses the move** that maximizes AI's score while minimizing player's score

### Algorithm Complexity

- **Time Complexity**: O(9!) in worst case (first move)
- **Space Complexity**: O(9) for recursion depth
- **Optimization**: Alpha-beta pruning could be added

## 🏆 Game Rules

1. Players alternate turns
2. Mark an empty cell on your turn
3. First to get 3 marks in a row (horizontal, vertical, or diagonal) wins
4. If all 9 cells are filled with no winner, it's a draw

## 📈 Future Improvements

- [ ] Add difficulty levels (Easy, Medium, Hard)
- [ ] Implement alpha-beta pruning for optimization
- [ ] Add two-player mode
- [ ] Create GUI version using SDL or GTK
- [ ] Add move history and undo feature
- [ ] Implement game statistics tracking
- [ ] Add color-coded output
- [ ] Create web version using WebAssembly
- [ ] Add sound effects
- [ ] Implement different board sizes (4x4, 5x5)
- [ ] Add tournament mode
- [ ] Save/load game state

## 🧠 Code Structure

### Key Functions

- `print_board()` - Displays the current game board
- `check_win()` - Checks if there's a winner
- `check_draw()` - Checks if the game is a draw
- `minimax()` - Implements the Minimax algorithm
- `find_best_move()` - Finds the optimal move for AI
- `play_game()` - Main game loop

### Win Conditions

The game checks 8 possible winning combinations:
- 3 horizontal rows
- 3 vertical columns
- 2 diagonals

## 💡 Learning Points

This project demonstrates:
- **Game Theory**: Minimax algorithm implementation
- **Recursion**: Deep recursive function calls
- **C Programming**: Arrays, functions, control structures
- **Algorithm Design**: Optimal decision-making
- **User Input Handling**: Validation and error checking

## 👤 Author

**Mosin Ali**  
CodSoft Internship Project

## 📄 License

This project is part of the CodSoft internship program.

---

*Challenge the unbeatable AI! Can you force a draw?* 🎮
