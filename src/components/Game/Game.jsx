import { React, useState } from "react";

function Square({ value, handleSquareClick }) {
  return (
    <button
      onClick={handleSquareClick}
      className="bg-white text-black border border-gray-400 h-12 w-12 leading-9 text-lg rounded-sm"
    >
      {value}
    </button>
  );
}

function Board({ squares, isXNext, onPlay }) {
  const handleSquareClick = (index) => {
    const newSquares = squares.slice();
    if (squares[index] || calCulateWinner(squares)) {
      return;
    }
    newSquares[index] = isXNext ? "X" : "O";
    onPlay(newSquares);
  };

  const winner = calCulateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isXNext ? "X" : "O");
  }

  return (
    <div>
      <h3 className="mb-4">{status}</h3>
      <div className="grid grid-cols-3 max-w-44 gap-2 mx-auto">
        {squares?.map((value, index) => (
          <Square
            key={index}
            value={value}
            handleSquareClick={() => handleSquareClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

// Game component

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill("")]);
  const [isXNext, setIsXNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    setIsXNext(!isXNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setIsXNext(move % 2 === 0);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = `Go to start the game`;
    }
    return (
      <li key={move} className="mb-2">
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="flex items-start justify-center gap-24">
      <Board squares={currentSquares} isXNext={isXNext} onPlay={handlePlay} />

      {/* History of the game */}
      <div>
        <h1>History</h1>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calCulateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
