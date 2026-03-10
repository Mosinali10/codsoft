import React, { useState } from 'react';
import Card from '../components/Card';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner 
    ? `Winner: ${winner}` 
    : board.every(Boolean) 
      ? "It's a Draw!" 
      : `Next Player: ${isXNext ? 'X' : 'O'}`;

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const nextBoard = board.slice();
    nextBoard[i] = isXNext ? 'X' : 'O';
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <Card 
      title="Tic Tac Toe AI" 
      subtitle="Play against a friend (or yourself) in this classic game"
      maxWidth="450px"
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '1.5rem',
        fontSize: '1.25rem',
        fontWeight: 600,
        color: winner ? 'var(--accent)' : 'var(--text)'
      }}>
        {status}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '10px',
        width: '300px',
        margin: '0 auto'
      }}>
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{
              height: '90px',
              width: '90px',
              backgroundColor: 'white',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              fontSize: '2rem',
              fontWeight: 700,
              color: cell === 'X' ? 'var(--text)' : 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
            }}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        style={{
          width: '100%',
          marginTop: '2rem',
          padding: '0.75rem',
          backgroundColor: 'var(--accent)',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontWeight: 600,
          fontSize: '1rem'
        }}
      >
        Restart Game
      </button>

      <p style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        color: 'var(--muted)',
        marginTop: '1.5rem',
        letterSpacing: '0.02em'
      }}>
        Minimax-based Tic Tac Toe — CodSoft Internship Project
      </p>
    </Card>
  );
};

export default TicTacToe;
