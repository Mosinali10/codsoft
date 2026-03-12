import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

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
      <Card 
        title="Tic Tac Toe AI" 
        subtitle="Choose your symbol to begin"
        maxWidth="460px"
      >
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            marginBottom: '1.5rem',
            fontSize: '0.95rem',
            color: 'var(--muted)',
            textAlign: 'center'
          }}>
            Select Your Symbol
          </div>

          <div style={{ 
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => startGame('X')}
              style={{
                flex: 1,
                maxWidth: '120px',
                padding: '1rem',
                backgroundColor: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '1.1rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Play as X
            </button>
            <button
              onClick={() => startGame('O')}
              style={{
                flex: 1,
                maxWidth: '120px',
                padding: '1rem',
                backgroundColor: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '1.1rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Play as O
            </button>
          </div>

          <div style={{
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--muted)',
            lineHeight: '1.6'
          }}>
            <p><strong>X goes first.</strong> Choose wisely!</p>
          </div>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--muted)',
          marginTop: '2rem',
          letterSpacing: '0.02em'
        }}>
          Minimax-based Tic Tac Toe — CodSoft Internship Project
        </p>
      </Card>
    );
  }

  // Render Game Screen
  return (
    <Card 
      title="Tic Tac Toe AI" 
      subtitle={`You are ${playerSymbol} | Playing on ${difficulty}`}
      maxWidth="420px"
    >
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        .cell-animate {
          animation: scaleIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>

      {confetti && Array.from({ length: 30 }).map((_, i) => (
        <ConfettiPiece key={i} delay={i * 0.05} duration={1.5 + Math.random() * 0.5} />
      ))}

      {/* Scoreboard */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
        marginBottom: '0.75rem',
        padding: '0.75rem',
        backgroundColor: 'var(--surface)',
        borderRadius: '10px'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '0.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.25rem' }}>You</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)' }}>{scores.player}</div>
        </div>
        <div style={{
          textAlign: 'center',
          padding: '0.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.25rem' }}>AI</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>{scores.ai}</div>
        </div>
        <div style={{
          textAlign: 'center',
          padding: '0.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.25rem' }}>Draw</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)' }}>{scores.draw}</div>
        </div>
      </div>

      {/* Turn Indicator */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '0.75rem',
        fontSize: '1rem',
        fontWeight: 600,
        color: winner ? (winner === 'Draw' ? 'var(--muted)' : 'var(--accent)') : 'var(--text)',
        minHeight: '2rem',
        alignItems: 'center'
      }}>
        <div>{getTurnStatus()}</div>
      </div>

      {/* Difficulty Buttons */}
      <div style={{
        marginBottom: '0.75rem',
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {['Easy', 'Medium', 'Hard'].map((level) => (
          <button
            key={level}
            onClick={() => changeDifficulty(level)}
            disabled={isAiThinking}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: difficulty === level ? 'var(--accent)' : 'var(--surface)',
              color: difficulty === level ? 'white' : 'var(--text)',
              border: `1px solid ${difficulty === level ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: '0.9rem',
              cursor: isAiThinking ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: isAiThinking ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!isAiThinking && difficulty !== level) {
                e.target.style.backgroundColor = 'var(--border)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isAiThinking && difficulty !== level) {
                e.target.style.backgroundColor = 'var(--surface)';
              }
            }}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Game Board */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 65px)', 
        gap: '8px',
        justifyContent: 'center',
        margin: '0 auto',
        marginBottom: '0.75rem',
        padding: '12px',
        backgroundColor: 'var(--surface)',
        borderRadius: '14px',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: 'fit-content'
      }}>
        {board.map((cell, i) => {
          const isWinningCell = winningLine && winningLine.includes(i);
          const isLastMove = lastMoveIndex === i;
          return (
            <button
              key={i}
              onClick={() => handleCellClick(i)}
              disabled={!isPlayerTurn || winner || isAiThinking}
              style={{
                height: '65px',
                width: '65px',
                backgroundColor: isWinningCell ? '#22C55E' : 'var(--surface)',
                border: isWinningCell ? '3px solid #16A34A' : '1px solid var(--border)',
                borderRadius: '10px',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: isWinningCell ? '#FFFFFF' : (cell === playerSymbol ? 'var(--text)' : (cell === aiSymbol ? 'var(--accent)' : 'transparent')),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: (!isPlayerTurn || winner || isAiThinking || cell) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: isWinningCell ? '0 0 20px rgba(34, 197, 94, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.2)' : (isLastMove ? '0 0 8px rgba(34, 197, 94, 0.3)' : '0 2px 5px rgba(0,0,0,0.02)'),
                opacity: (!isPlayerTurn || winner || isAiThinking) && !cell ? 0.6 : 1,
                transform: isWinningCell ? 'scale(1.05)' : 'scale(1)',
                ...(cell && { animation: 'scaleIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)' })
              }}
              onMouseEnter={(e) => {
                if (isPlayerTurn && !winner && !isAiThinking && !cell) {
                  e.target.style.backgroundColor = 'var(--surface)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.08)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.02)';
              }}
            >
              {cell}
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex',
        gap: '0.75rem',
        justifyContent: 'center',
        marginBottom: '0.5rem'
      }}>
        <button
          onClick={restartGame}
          disabled={!winner}
          style={{
            flex: 1,
            maxWidth: '180px',
            padding: '0.6rem',
            backgroundColor: winner ? 'var(--accent)' : 'var(--surface)',
            color: winner ? 'white' : 'var(--muted)',
            border: winner ? 'none' : `1px solid var(--border)`,
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: winner ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (winner) {
              e.target.style.opacity = '0.9';
            }
          }}
          onMouseLeave={(e) => {
            if (winner) {
              e.target.style.opacity = '1';
            }
          }}
        >
          {winner ? 'Play Again' : 'Play Again'}
        </button>

        <button
          onClick={resetAll}
          style={{
            flex: 1,
            maxWidth: '200px',
            padding: '0.75rem',
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--border)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--surface)';
          }}
        >
          Change Symbol
        </button>
      </div>

      <p style={{
        textAlign: 'center',
        fontSize: '0.7rem',
        color: 'var(--muted)',
        marginTop: '0.5rem',
        letterSpacing: '0.02em'
      }}>
        Minimax-based Tic Tac Toe — CodSoft Internship Project
      </p>
    </Card>
  );
};

export default TicTacToe;
