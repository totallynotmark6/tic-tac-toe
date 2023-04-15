import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

function Square({ value, onSquareClick }: {value: string, onSquareClick: any}) {
  return (
    <button onClick={onSquareClick} className="h-16 w-16 min-h-16 min-w-16 border">
      {value}
    </button>
  )
}

function determineWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ oIsNext, squares, onPlay }: {oIsNext: boolean, squares: string[], onPlay: any}) {
  function handleClick(i: number) {
    if (determineWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (oIsNext) {
      nextSquares[i] = 'O';
    } else {
      nextSquares[i] = 'X'
    }
    onPlay(nextSquares);
  }

  const winner = determineWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (
      oIsNext ? 'O' : 'X'
    )
  }

  return (
    <>
      <div>{status}</div>
      <div>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}></Square>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}></Square>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}></Square>
      </div>
      <div>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}></Square>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}></Square>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}></Square>
      </div>
      <div>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}></Square>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}></Square>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}></Square>
      </div>
    </>
  )
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const oIsNext = currentMove % 2 !== 0;
  const currentSquares = history[currentMove];

  function playIsMade(nextSquares: Array<string>) { // ???
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move === 0) {
      description = 'Go to game start';
    } else {
      description = 'Go to move #' + move;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })
  return (
    <div>
      <div>
        <Board oIsNext={oIsNext} squares={currentSquares} onPlay={playIsMade} />
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <div className="text-white bg-slate-950 w-screen h-screen">
      <ToastContainer theme="dark" />
      <Game />
    </div>
  );
}

export default HomePage;
// ????. you stand accused of losing.
// But council! My devotion is absolute! The-
// Enough. You have 24 hours before the Father's light leaves your body. And then, you will die. A husk. A thing. I suggest that you prove your faith. Do you understand?
// Yes, council.
// Good.
// *agony* 