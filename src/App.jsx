import React, { useState, useEffect } from "react";
import "./App.css";

const BOARD_SIZE = 3;

const initialState = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null));

const App = () => {
  const [board, setBoard] = useState(initialState);
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!isPlayerX && !winner) {
      // Computer's turn
      setTimeout(() => {
        makeComputerMove();
      }, 500); // Delay for a better user experience
    }
  }, [isPlayerX, winner]);

  const checkWinner = () => {
    // Check rows
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        setWinner(board[i][0]);
        return;
      }
    }

    // Check columns
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        setWinner(board[0][i]);
        return;
      }
    }

    // Check diagonals
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      setWinner(board[0][0]);
      return;
    }

    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      setWinner(board[0][2]);
      return;
    }

    // Check for a draw
    if (!board.flat().includes(null)) {
      setWinner("Draw");
    }
  };

  const handleBoxClick = (row, col) => {
    if (!board[row][col] && isPlayerX && !winner) {
      const newBoard = board.map((row) => row.slice());
      newBoard[row][col] = "X";
      setBoard(newBoard);
      checkWinner();
      setIsPlayerX(false);
    }

    if (!isPlayerX && !winner) {
      // Computer's turn
      setTimeout(() => {
        makeComputerMove();
      }, 500); // Delay for a better user experience
    }
  };

  const makeComputerMove = () => {
    const emptyCells = [];
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (!col) {
          emptyCells.push({ row: rowIndex, col: colIndex });
        }
      });
    });

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const computerMove = emptyCells[randomIndex];
      const newBoard = board.map((row) => row.slice());
      newBoard[computerMove.row][computerMove.col] = "O";
      setBoard(newBoard);
      setIsPlayerX(true);
      checkWinner();
    }
  };

  const renderBox = (row, col) => (
    <div
      key={`${row}-${col}`}
      className="box"
      onClick={() => handleBoxClick(row, col)}
    >
      {board[row][col]}
    </div>
  );

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((col, colIndex) => renderBox(rowIndex, colIndex))
        )}
      </div>
      <div
        className={`status ${
          winner ? (winner === "Draw" ? "draw-message" : "winner-message") : ""
        }`}
      >
        {winner ? (
          winner === "Draw" ? (
            <p>It's a draw!</p>
          ) : (
            <p>{`${winner} wins!`}</p>
          )
        ) : (
          <p>{`Current Player: ${isPlayerX ? "X" : "O"}`}</p>
        )}
      </div>
    </div>
  );
};

export default App;
