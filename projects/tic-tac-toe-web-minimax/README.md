# Tic Tac Toe (Web, Minimax AI)

## Project Description

This project is a browser-based Tic Tac Toe game where you play as `X` against an AI (`O`) that chooses optimal moves using the minimax algorithm. Scores persist in the browser using `localStorage`.

## Features

- Single-player mode vs minimax AI
- Win and draw detection
- Score tracking using `localStorage`
- Reset game and reset score controls

## Technology Stack

- HTML
- CSS
- JavaScript (ES6)

## How to Run the Project

From the repository root:

```bash
cd projects/tic-tac-toe-web-minimax
```

Option A: open `index.html` directly in your browser.

Option B: run a local static server (recommended to avoid browser file restrictions):

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Example Output or Screenshots

The UI displays a 3×3 grid. Click any empty cell to place `X`; the AI responds automatically as `O`. The status bar shows game state (your turn, AI thinking, win/lose/draw).

If you add screenshots later, place them in `screenshots/` and link them here.

## Project Structure (optional)

```
.
├── index.html
├── style.css
├── script.js
├── README.md
└── screenshots/
```
