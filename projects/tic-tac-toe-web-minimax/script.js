// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let playerScore = 0;
let aiScore = 0;
let difficulty = 'hard';

// DOM elements
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');
const playerScoreEl = document.getElementById('playerScore');
const aiScoreEl = document.getElementById('aiScore');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize game
function init() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficulty = btn.getAttribute('data-level');
            difficultyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            resetGame();
        });
    });
    resetBtn.addEventListener('click', resetGame);
    resetScoreBtn.addEventListener('click', resetScore);
    loadScore();
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (board[index] !== '' || !gameActive || currentPlayer === 'O') {
        return;
    }

    makeMove(index, 'X');
    
    if (gameActive) {
        setTimeout(() => {
            aiMove();
        }, 500);
    }
}

// Make a move
function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add('taken', player.toLowerCase());
    
    checkResult();
}

// Check game result
function checkResult() {
    let roundWon = false;
    let winningCombo = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCombo = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        if (currentPlayer === 'X') {
            status.textContent = 'You win.';
            status.className = 'status win';
            playerScore++;
            playerScoreEl.textContent = playerScore;
        } else {
            status.textContent = 'AI wins.';
            status.className = 'status lose';
            aiScore++;
            aiScoreEl.textContent = aiScore;
        }
        
        // Highlight winning cells
        winningCombo.forEach(index => {
            cells[index].classList.add('winning');
        });
        
        gameActive = false;
        saveScore();
        return;
    }

    // Check for draw
    if (!board.includes('')) {
        status.textContent = 'Draw.';
        status.className = 'status draw';
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    
    if (currentPlayer === 'O') {
        status.textContent = 'AI is thinking...';
    } else {
        status.textContent = 'Your turn.';
    }
}

// AI Move based on difficulty
function aiMove() {
    if (!gameActive) return;
    
    let move;
    if (difficulty === 'easy') {
        move = findRandomMove();
    } else if (difficulty === 'medium') {
        move = findMediumMove();
    } else {
        move = findBestMove(); // Hard (Minimax)
    }
    
    makeMove(move, 'O');
}

// Easy: Random Move
function findRandomMove() {
    const available = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    return available[Math.floor(Math.random() * available.length)];
}

// Medium: Block Win or Random
function findMediumMove() {
    // 1. Try to win if possible
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        const vals = [board[a], board[b], board[c]];
        if (vals.filter(v => v === 'O').length === 2 && vals.includes('')) {
            return [a, b, c][vals.indexOf('')];
        }
    }
    // 2. Block player win
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        const vals = [board[a], board[b], board[c]];
        if (vals.filter(v => v === 'X').length === 2 && vals.includes('')) {
            return [a, b, c][vals.indexOf('')];
        }
    }
    // 3. Random
    return findRandomMove();
}

// Minimax Algorithm
function minimax(newBoard, depth, isMaximizing) {
    const score = evaluate(newBoard);
    
    // Base cases
    if (score === 10) return score - depth;
    if (score === -10) return score + depth;
    if (!newBoard.includes('')) return 0;
    
    if (isMaximizing) {
        let best = -1000;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = 'O';
                best = Math.max(best, minimax(newBoard, depth + 1, false));
                newBoard[i] = '';
            }
        }
        return best;
    } else {
        let best = 1000;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = 'X';
                best = Math.min(best, minimax(newBoard, depth + 1, true));
                newBoard[i] = '';
            }
        }
        return best;
    }
}

// Evaluate board state
function evaluate(board) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            if (board[a] === 'O') return 10;
            if (board[a] === 'X') return -10;
        }
    }
    return 0;
}

// Find best move for AI
function findBestMove() {
    let bestVal = -1000;
    let bestMove = -1;
    
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let moveVal = minimax(board, 0, false);
            board[i] = '';
            
            if (moveVal > bestVal) {
                bestMove = i;
                bestVal = moveVal;
            }
        }
    }
    
    return bestMove;
}

// Reset game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = 'Your turn. Click any square to start.';
    status.className = 'status';
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
}

// Reset score
function resetScore() {
    playerScore = 0;
    aiScore = 0;
    playerScoreEl.textContent = playerScore;
    aiScoreEl.textContent = aiScore;
    saveScore();
    resetGame();
}

// Save score to localStorage
function saveScore() {
    localStorage.setItem('ticTacToePlayerScore', playerScore);
    localStorage.setItem('ticTacToeAiScore', aiScore);
}

// Load score from localStorage
function loadScore() {
    const savedPlayerScore = localStorage.getItem('ticTacToePlayerScore');
    const savedAiScore = localStorage.getItem('ticTacToeAiScore');
    
    if (savedPlayerScore) {
        playerScore = parseInt(savedPlayerScore);
        playerScoreEl.textContent = playerScore;
    }
    
    if (savedAiScore) {
        aiScore = parseInt(savedAiScore);
        aiScoreEl.textContent = aiScore;
    }
}

// Initialize the game
init();
