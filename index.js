 // Gameboard Module
 const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
  };

  const setCell = (index, marker) => {
      if (board[index] === "") {
          board[index] = marker;
          return true;
      }
      return false;
  };

  return { getBoard, resetBoard, setCell };
})();

// Player Factory
const Player = (name, marker) => {
  return { name, marker };
};

// Game Controller Module
const GameController = (() => {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  let currentPlayer = player1;
  let isGameOver = false;

  const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWinner = () => {
      const board = Gameboard.getBoard();
      const winConditions = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6]
      ];

      for (const condition of winConditions) {
          const [a, b, c] = condition;
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              return board[a];
          }
      }

      if (!board.includes("")) {
          return "draw";
      }

      return null;
  };

  const playTurn = (index) => {
      if (isGameOver || !Gameboard.setCell(index, currentPlayer.marker)) {
          return;
      }

      renderBoard();

      const winner = checkWinner();
      if (winner) {
          isGameOver = true;
          alert(winner === "draw" ? "It's a draw!" : `${currentPlayer.name} wins!`);
          return;
      }

      switchPlayer();
  };

  const restartGame = () => {
      Gameboard.resetBoard();
      currentPlayer = player1;
      isGameOver = false;
      renderBoard();
  };

  return { playTurn, restartGame };
})();

// Display Controller
const renderBoard = () => {
  const gameboardDiv = document.getElementById("gameboard");
  gameboardDiv.innerHTML = "";

  Gameboard.getBoard().forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      if (cell) {
          cellDiv.textContent = cell;
          cellDiv.classList.add("taken");
      }

      cellDiv.addEventListener("click", () => {
          GameController.playTurn(index);
      });

      gameboardDiv.appendChild(cellDiv);
  });
};

document.getElementById("restartBtn").addEventListener("click", () => {
  GameController.restartGame();
});

renderBoard();