# ⭕ Tic Tac Toe - Unbeatable AI

A modern web-based Tic Tac Toe game featuring an unbeatable AI opponent powered by the Minimax algorithm.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📋 Problem Statement

Create an engaging Tic Tac Toe game with an AI opponent that uses optimal game theory strategies, making it impossible to beat while providing an excellent user experience.

## ✨ Features

- **Unbeatable AI**: Uses Minimax algorithm for optimal moves
- **Score Tracking**: Persistent score across sessions
- **Smooth Animations**: Pop-in effects and winning cell highlights
- **Responsive Design**: Works on all devices
- **Modern UI**: Gradient backgrounds and clean interface
- **Game State Management**: Proper turn handling and game flow
- **Win Detection**: Checks all 8 winning combinations
- **Draw Detection**: Identifies stalemate situations
- **Local Storage**: Saves scores between sessions
- **Reset Options**: New game and score reset buttons

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling and animations
- **JavaScript (ES6)** - Game logic and AI
- **LocalStorage** - Score persistence

## 📦 Installation

### No Installation Required!

This is a pure frontend application. Simply:

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/codsoft-projects.git
cd codsoft-projects/tic-tac-toe
```

2. **Open in browser**
```bash
# Double-click index.html
# Or use a local server
python -m http.server 8000
```

## 🚀 How to Run

### Option 1: Direct Open
- Double-click `index.html`
- Opens in default browser

### Option 2: Local Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```

Then visit `http://localhost:8000`

## 📸 Screenshots

![Game Board](screenshots/game-board.png)
*Clean game board with modern design*

![Winning State](screenshots/winning-state.png)
*Highlighted winning combination*

![Score Tracking](screenshots/score-tracking.png)
*Persistent score display*

## 🎯 How to Play

1. **Start Game**:
   - You play as X (green)
   - AI plays as O (red)
   - You always go first

2. **Make Move**:
   - Click any empty square
   - Your move appears instantly

3. **AI Response**:
   - AI calculates optimal move
   - Responds after brief delay

4. **Win/Draw**:
   - Get 3 in a row to win
   - Fill all squares for draw
   - Winning cells highlight

5. **New Game**:
   - Click "New Game" to play again
   - Score persists across games

6. **Reset Score**:
   - Click "Reset Score" to clear scores
   - Starts fresh game

## 🧠 Minimax Algorithm

### How It Works

The AI uses the **Minimax algorithm** - a decision-making algorithm for two-player games.

```javascript
function minimax(board, depth, isMaximizing) {
    // Base cases: win, lose, or draw
    if (gameOver) return score;
    
    if (isMaximizing) {
        // AI's turn - maximize score
        return max(all possible moves);
    } else {
        // Player's turn - minimize score
        return min(all possible moves);
    }
}
```

### Algorithm Steps

1. **Evaluate Position**: Check if game is won, lost, or drawn
2. **Recursive Search**: Explore all possible future moves
3. **Score Assignment**:
   - AI Win: +10
   - Player Win: -10
   - Draw: 0
4. **Optimal Choice**: Select move with best score

### Why Unbeatable?

- Evaluates **all possible game states**
- Assumes **both players play optimally**
- Always chooses **best possible move**
- **Depth-based scoring** prefers faster wins

## 📊 Game Statistics

- **Total Possible Games**: 255,168
- **Possible Board States**: 5,478
- **Winning Combinations**: 8
- **Maximum Moves**: 9
- **AI Response Time**: < 500ms

## 🌐 Deployment

### GitHub Pages
```bash
# Push to GitHub
git add .
git commit -m "Add Tic Tac Toe game"
git push origin main

# Enable GitHub Pages
# Settings → Pages → Source: main branch
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Drag and drop folder to Netlify
# Or connect GitHub repository
```

## 🔮 Future Improvements

- [ ] Difficulty levels (Easy, Medium, Hard)
- [ ] Two-player mode
- [ ] Larger board sizes (4x4, 5x5)
- [ ] Different AI algorithms
- [ ] Move history and undo
- [ ] Sound effects
- [ ] Themes and customization
- [ ] Online multiplayer
- [ ] Tournament mode
- [ ] Statistics and analytics
- [ ] Leaderboard
- [ ] Mobile app version
- [ ] Voice commands
- [ ] Accessibility improvements
- [ ] Multiple game modes

## 📊 Project Structure

```
tic-tac-toe/
├── index.html           # Main HTML structure
├── style.css            # Styling and animations
├── script.js            # Game logic and AI
├── README.md           # Project documentation
└── screenshots/        # Application screenshots
```

## 🎨 Design Features

- **Gradient Background**: Purple to blue gradient
- **Card Design**: White container with shadow
- **Color Coding**: Green (X) vs Red (O)
- **Animations**: Pop-in effects, pulse on win
- **Responsive**: Mobile-friendly layout
- **Modern Fonts**: Segoe UI font family

## 🤝 Contributing

Contributions welcome! Please submit a Pull Request.

## 👤 Author

**Mosin Ali**
- CodSoft Internship Project
- Task: Tic Tac Toe with AI

## 📄 License

Part of CodSoft internship program.

## 🙏 Acknowledgments

- CodSoft for the opportunity
- Game theory and AI community
- Web development community

---

<div align="center">
  <p>Built with ❤️ using HTML, CSS & JavaScript</p>
  <p>🎮 Challenge the Unbeatable AI!</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
