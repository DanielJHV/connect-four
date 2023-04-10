'use strict';

let playerRed = 'Red';
let playerYellow = 'Yellow';

let currPlayer = playerRed;
let gameOver = false;
let board;
let currColumns;

const rows = 6;
const columns = 7;

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
  } else {
    tile.classList.add('yellow-piece');
    currPlayer = playerRed;
  }
  // Update row height:
  r -= 1;
  // Update array:
  currColumns[c] = r;
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
