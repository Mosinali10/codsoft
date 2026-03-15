import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  // Game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState(null); // 'X' or 'O'
  const [aiSymbol, setAiSymbol] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [winningLine, setWinningLine] = useState(null);
  const [winner, setWinner] = useState(null);
  const [difficulty, setDifficulty] = useState('Medium');
  const [gameStarted, setGameStarted] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [scores, setScores] = useState({ player: 0, ai: 0, draw: 0 });
  const [confetti, setConfetti] = useState(false);
  const [lastMoveIndex, setLastMoveIndex] = useState(null);

  // Helper Functions
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return { winner: null, line: null };
  };

  const isBoardFull = (squares) => squares.every(cell => cell !== null);

  // Optimized Minimax with depth limit
  const minimax = (board, depth, isMaximizing, aiSym, playerSym, maxDepth = 4) => {
    const result = calculateWinner(board);
    const winner = result.winner;

    if (winner === aiSym) return 10 - depth;
    if (winner === playerSym) return depth - 10;
    if (isBoardFull(board)) return 0;
    if (depth >= maxDepth) return 0; // Depth limit for performance

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = aiSym;
          const score = minimax(board, depth + 1, false, aiSym, playerSym, maxDepth);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = playerSym;
          const score = minimax(board, depth + 1, true, aiSym, playerSym, maxDepth);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getAiMove = async (currentBoard, diffLevel, ai, player) => {
    const emptySquares = currentBoard
      .map((cell, idx) => cell === null ? idx : null)
      .filter(idx => idx !== null);

    if (emptySquares.length === 0) return null;

    if (diffLevel === 'Easy') {
      return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }

    if (diffLevel === 'Medium') {
      // Try to win
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          const testBoard = currentBoard.slice();
          testBoard[i] = ai;
          if (calculateWinner(testBoard).winner === ai) return i;
        }
      }
      // Try to block
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          const testBoard = currentBoard.slice();
          testBoard[i] = player;
          if (calculateWinner(testBoard).winner === player) return i;
        }
      }
      // Otherwise random
      return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }

    if (diffLevel === 'Hard') {
      // Create a promise for minimax calculation
      const minimaxPromise = new Promise((resolve) => {
        let bestMove = null;
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (currentBoard[i] === null) {
            const testBoard = currentBoard.slice();
            testBoard[i] = ai;
            const score = minimax(testBoard, 0, false, ai, player, 4);
            testBoard[i] = null;
            if (score > bestScore) {
              bestScore = score;
              bestMove = i;
            }
          }
        }
        resolve(bestMove);
      });

      // Create a timeout promise
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve(null), 3000); // 3 second timeout
      });

      // Race the minimax calculation against the timeout
      const result = await Promise.race([minimaxPromise, timeoutPromise]);
      
      // If minimax timed out or failed, return random move
      return result !== null ? result : emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }
  };

  // Start Game Handler
  const startGame = (symbol) => {
    setPlayerSymbol(symbol);
    setAiSymbol(symbol === 'X' ? 'O' : 'X');
    setIsPlayerTurn(symbol === 'X');
    setGameStarted(true);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine(null);
    setConfetti(false);
    setLastMoveIndex(null);
  };

  // Player Move Handler
  const handleCellClick = (index) => {
    if (!gameStarted || !isPlayerTurn || board[index] || winner || isAiThinking) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    setLastMoveIndex(index);

    const result = calculateWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setScores(prev => ({ ...prev, player: prev.player + 1 }));
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2000);
    } else if (isBoardFull(newBoard)) {
      setWinner('Draw');
      setScores(prev => ({ ...prev, draw: prev.draw + 1 }));
    } else {
      setIsPlayerTurn(false);
    }
  };

  // AI Move Effect
  useEffect(() => {
    if (!gameStarted || isPlayerTurn || winner || isAiThinking) {
      return;
    }

    const makeAiMove = async () => {
      setIsAiThinking(true);
      
      // Add realistic thinking delay (5 seconds)
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      try {
        const aiMove = await getAiMove(board, difficulty, aiSymbol, playerSymbol);
        if (aiMove !== null) {
          const newBoard = board.slice();
          newBoard[aiMove] = aiSymbol;
          setBoard(newBoard);
          setLastMoveIndex(aiMove);

          const result = calculateWinner(newBoard);
          if (result.winner) {
            setWinner(result.winner);
            setWinningLine(result.line);
            setScores(prev => ({ ...prev, ai: prev.ai + 1 }));
          } else if (isBoardFull(newBoard)) {
            setWinner('Draw');
            setScores(prev => ({ ...prev, draw: prev.draw + 1 }));
          } else {
            setIsPlayerTurn(true);
          }
        }
      } catch (error) {
        console.error('AI move error:', error);
        // Fallback to random move if something goes wrong
        const emptySquares = board
          .map((cell, idx) => cell === null ? idx : null)
          .filter(idx => idx !== null);
        if (emptySquares.length > 0) {
          const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
          const newBoard = board.slice();
          newBoard[randomMove] = aiSymbol;
          setBoard(newBoard);
          setLastMoveIndex(randomMove);
          setIsPlayerTurn(true);
        }
      } finally {
        setIsAiThinking(false);
      }
    };

    makeAiMove();
  }, [isPlayerTurn, board, gameStarted, winner, difficulty, aiSymbol, playerSymbol]);

  // Restart Game Handler
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine(null);
    setIsPlayerTurn(playerSymbol === 'X');
    setConfetti(false);
    setLastMoveIndex(null);
  };

  // Change Difficulty Handler
  const changeDifficulty = (level) => {
    setDifficulty(level);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine(null);
    setIsPlayerTurn(playerSymbol === 'X');
    setConfetti(false);
    setLastMoveIndex(null);
    setIsAiThinking(false);
  };

  // Change Symbol Handler
  const changeSymbol = (symbol) => {
    setPlayerSymbol(symbol);
    setAiSymbol(symbol === 'X' ? 'O' : 'X');
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine(null);
    setIsPlayerTurn(symbol === 'X');
    setConfetti(false);
    setLastMoveIndex(null);
  };

  // Reset Everything Handler
  const resetAll = () => {
    setBoard(Array(9).fill(null));
    setPlayerSymbol(null);
    setAiSymbol(null);
    setIsPlayerTurn(false);
    setWinningLine(null);
    setWinner(null);
    setGameStarted(false);
    setIsAiThinking(false);
    setConfetti(false);
    setLastMoveIndex(null);
  };

  const getTurnStatus = () => {
    if (!gameStarted) return 'Select Your Symbol';
    if (isAiThinking) return '🤖 AI is thinking...';
    if (winner === 'Draw') return "🤝 It's a draw. Great match!";
    if (winner === aiSymbol) return '🤖 AI wins! Better luck next time.';
    if (winner === playerSymbol) return '🎉 Congratulations! You beat the AI!';
    if (winner) return `🎉 Winner: ${winner}`;
    return isPlayerTurn ? '👤 Your Turn' : '🤖 AI Turn';
  };

  // Confetti Component
  const ConfettiPiece = ({ delay, duration }) => (
    <div
      style={{
        position: 'fixed',
        left: Math.random() * 100 + '%',
        top: '-10px',
        width: '10px',
        height: '10px',
        backgroundColor: ['#22C55E', '#3B82F6', '#F59E0B'][Math.floor(Math.random() * 3)],
        borderRadius: '50%',
        animation: `fall ${duration}s ease-in forwards`,
        animationDelay: `${delay}s`,
        zIndex: 1000,
        pointerEvents: 'none'
      }}
    />
  );

  // Render Player Selection Screen
  if (!gameStarted) {
    return (
      <div className="page-container">
        <div className="ttt-select-screen">
          <h2 className="ttt-select-title">Tic Tac Toe AI</h2>
          <p className="ttt-select-sub">Choose your symbol to begin. X goes first.</p>
          <div className="ttt-symbol-btns">
            <button className="ttt-symbol-btn" onClick={() => startGame('X')}>
              <span className="ttt-symbol-icon ttt-x">✕</span>
              <span>Play as X</span>
            </button>
            <button className="ttt-symbol-btn" onClick={() => startGame('O')}>
              <span className="ttt-symbol-icon ttt-o">○</span>
              <span>Play as O</span>
            </button>
          </div>
          <p className="project-label">Minimax-based Tic Tac Toe — CodSoft Internship Project</p>
        </div>
      </div>
    );
  }

  // Move history list (1-indexed)
  const moveLog = board
    .map((cell, i) => cell ? { idx: i, cell } : null)
    .filter(Boolean);

  // Render Game Screen
  return (
    <div className="ttt-game-page">
      {confetti && Array.from({ length: 30 }).map((_, i) => (
        <ConfettiPiece key={i} delay={i * 0.05} duration={1.5 + Math.random() * 0.5} />
      ))}

      {/* ── Top scoreboard ── */}
      <div className="ttt-scoreboard">
        <div className="ttt-score-block ttt-score-player">
          <div className="ttt-score-label">PLAYER — 1</div>
          <div className="ttt-score-num">{String(scores.player).padStart(2, '0')}</div>
        </div>
        <div className="ttt-score-block ttt-score-tie">
          <div className="ttt-score-label">TIE</div>
          <div className="ttt-score-num">{scores.draw}</div>
        </div>
        <div className="ttt-score-block ttt-score-ai">
          <div className="ttt-score-label">PLAYER — 2 (AI)</div>
          <div className="ttt-score-num">{String(scores.ai).padStart(2, '0')}</div>
        </div>
      </div>

      {/* ── Main area: board + move log ── */}
      <div className="ttt-arena">
        {/* Left controls */}
        <div className="ttt-side-controls">
          <div className="ttt-side-group">
            <div className="ttt-status-pill" style={{
              color: winner ? (winner === 'Draw' ? 'var(--muted)' : 'var(--accent)') : 'var(--text)'
            }}>
              {getTurnStatus()}
            </div>
          </div>

          <div className="ttt-side-group">
            <div className="ttt-side-label">Difficulty</div>
            <div className="diff-group" style={{ flexDirection: 'column', gap: '0.35rem' }}>
              {['Easy', 'Medium', 'Hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => changeDifficulty(level)}
                  disabled={isAiThinking}
                  className={`diff-btn${difficulty === level ? ' active' : ''}`}
                  style={{ padding: '0.4rem 0.75rem', textAlign: 'left' }}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="ttt-side-group">
            <button
              onClick={restartGame}
              disabled={!winner}
              className={winner ? 'btn btn-primary' : 'btn btn-ghost'}
              style={{ width: '100%', fontSize: '0.8rem' }}
            >
              Play Again
            </button>
            <button
              onClick={resetAll}
              className="btn btn-ghost"
              style={{ width: '100%', fontSize: '0.8rem', marginTop: '0.35rem' }}
            >
              Change Symbol
            </button>
          </div>
        </div>

        {/* Board */}
        <div className="ttt-board-area">
          <div className="ttt-board">
            {board.map((cell, i) => {
              const isWinningCell = winningLine && winningLine.includes(i) && cell !== null;
              return (
                <button
                  key={i}
                  className={`ttt-cell${isWinningCell ? ' winning' : ''}${cell ? ' filled' : ''}`}
                  onClick={() => handleCellClick(i)}
                  disabled={!isPlayerTurn || winner || isAiThinking}
                  style={{
                    animation: cell ? 'scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1)' : undefined,
                  }}
                >
                  {cell === 'X' && <span className="ttt-x">✕</span>}
                  {cell === 'O' && <span className="ttt-o">○</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Move log */}
        <div className="ttt-move-log">
          <div className="ttt-move-log-header">
            YOUR MOVES <span className="ttt-move-chevron">∨</span>
          </div>
          <div className="ttt-move-list">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`ttt-move-item${moveLog[i] ? ' played' : ''}`}>
                # MOVE {i + 1}
                {moveLog[i] && (
                  <span className="ttt-move-sym">
                    {moveLog[i].cell === playerSymbol ? '(You)' : '(AI)'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="project-label" style={{ marginTop: '1rem' }}>
        Minimax-based Tic Tac Toe — CodSoft Internship Project
      </p>
    </div>
  );
};

export default TicTacToe;
