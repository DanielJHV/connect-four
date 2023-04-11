'use strict';

const winner = document.querySelector('.winner-text');
const restartBtn = document.querySelector('.restart-btn');

let playerRed = 'Red';
let playerYellow = 'Yellow';

let currPlayer = playerRed;
let gameOver = false;
let board;
let currColumns;

const rows = 6;
const columns = 7;

const setWinner = function (r, c) {
  if (board[r][c] == playerRed) {
    winner.textContent = 'Red wins!';
  } else {
    winner.textContent = `Yellow wins!`;
  }
  winner.style.color = '#1385f2';
  gameOver = true;
  restartBtn.classList.remove('hidden');
};

const checkDraw = function () {
  let isEmpty;
  if (!gameOver) {
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows; r++) {
        if (board[r][c] === ' ') {
          isEmpty = true;
          return;
        } else {
          isEmpty = false;
        }
      }
    }
    if (!isEmpty) {
      winner.textContent = `It's a draw`;
      winner.style.color = '#1385f2';
      gameOver = true;
      restartBtn.classList.remove('hidden');
    }
  }
};

const checkWinner = function () {
  // Check horizontally
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] !== ' ') {
        if (
          board[r][c] === board[r][c + 1] &&
          board[r][c + 1] === board[r][c + 2] &&
          board[r][c + 2] === board[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }

    // Check vertically
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows - 3; r++) {
        if (board[r][c] !== ' ') {
          if (
            board[r][c] === board[r + 1][c] &&
            board[r + 1][c] === board[r + 2][c] &&
            board[r + 2][c] === board[r + 3][c]
          ) {
            setWinner(r, c);
            return;
          }
        }
      }
    }

    //Check diagonally
    for (let r = 3; r < rows; r++) {
      for (let c = 0; c < columns - 3; c++) {
        if (board[r][c] !== ' ') {
          if (
            board[r][c] === board[r - 1][c + 1] &&
            board[r - 1][c + 1] === board[r - 2][c + 2] &&
            board[r - 2][c + 2] === board[r - 3][c + 3]
          ) {
            setWinner(r, c);
            return;
          }
        }
      }
    }

    // Check anti-diagonally
    for (let r = 0; r < rows - 3; r++) {
      for (let c = 0; c < columns - 3; c++) {
        if (board[r][c] !== ' ') {
          if (
            board[r][c] === board[r + 1][c + 1] &&
            board[r + 1][c + 1] === board[r + 2][c + 2] &&
            board[r + 2][c + 2] === board[r + 3][c + 3]
          ) {
            setWinner(r, c);
            return;
          }
        }
      }
    }
  }
};

const setPiece = function () {
  if (gameOver) {
    return;
  }
  let coords = this.id.split('-');
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = currColumns[c];
  if (r < 0) {
    return;
  }
  board[r][c] = currPlayer;

  let tile = document.getElementById(`${r.toString()}-${c.toString()}`);

  if (currPlayer === playerRed) {
    tile.classList.add('red-piece');
    currPlayer = playerYellow;
    winner.textContent = `Yellow's turn`;
  } else {
    tile.classList.add('yellow-piece');
    currPlayer = playerRed;
    winner.textContent = `Red's turn`;
  }
  // Update row height
  r -= 1;
  // Update array
  currColumns[c] = r;
  checkWinner();
  checkDraw();
};

const setGame = function () {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(' ');
      let tile = document.createElement('div');
      tile.id = `${r.toString()}-${c.toString()}`;
      tile.classList.add('tile');
      tile.addEventListener('click', setPiece);
      document.querySelector('.board').append(tile);
    }
    board.push(row);
  }
  console.log(board);
};

window.onload = function () {
  setGame();
};

const restartGame = function () {
  restartBtn.classList.add('hidden');
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      board[r][c] = ' ';
      const tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      tile.classList.remove('red-piece');
      tile.classList.remove('yellow-piece');
    }
  }
  for (let c = 0; c < columns; c++) {
    currColumns[c] = 5;
  }
  currPlayer = playerRed;
  winner.textContent = `Red's turn`;
  winner.style.color = '#020257';
  gameOver = false;
};

restartBtn.addEventListener('click', restartGame);
