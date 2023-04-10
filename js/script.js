let playerRed = 'Red';
let playerYelow = 'Yellow';

let currPlayer = playerRed;
let gameOver = false;
let board;

const rows = 6;
const columns = 7;

const setGame = function () {
  board = [];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(' ');
      let tile = document.createElement('div');
      tile.id = `${r.toString()}-${c.toString()}`;
      tile.classList.add('tile');
      document.querySelector('.board').append(tile);
    }
    board.push(row);
  }
};

window.onload = function () {
  setGame();
};
