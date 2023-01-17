function getBoard() {
  let board = [];
  for (i = 0; i < 9; i++) {
    let row = [];
    for (j = 0; j < 9; j++) {
      let cellValue = document.getElementById(`cell-${i}-${j}`).value;
      if (!isNaN(Number(cellValue))) {
        cellValue = Number(cellValue);
      } else {
        cellValue = 0;
      }
      row.push(cellValue);
    }
    board.push(row);
  }
  return board;
}

function findEmpty(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null;
}

function isValid(board, num, row, col) {
  // Check column
  for (let i = 0; i < board.length; i++) {
    if (board[i][col] === num && row !== i) {
      return false;
    }
  }

  // Check row
  for (let j = 0; j < board[0].length; j++) {
    if (board[row][j] === num && col !== j) {
      return false;
    }
  }

  const gridI = Math.floor(row / 3);
  const gridJ = Math.floor(col / 3);

  for (let k = gridI * 3; k < gridI * 3 + 3; k++) {
    for (let l = gridJ * 3; l < gridJ * 3 + 3; l++) {
      if (board[k][l] === num && (k !== row || l !== col)) {
        return false;
      }
    }
  }
  return true;
}

function solveSudoku(board) {
  let empty = findEmpty(board);
  if (!empty) {
    return true;
  }
  let row = empty[0];
  let col = empty[1];

  for (i = 1; i < 10; i++) {
    if (isValid(board, i, row, col)) {
      board[row][col] = i;

      if (solveSudoku(board)) {
        return true;
      }

      board[row][col] = 0;
    }
  }
  return false;
}

function updateBoard(board) {
  for (i = 0; i < board.length; i++) {
    for (j = 0; j < board[i].length; j++) {
      let cell = document.getElementById(`cell-${i}-${j}`);
      cell.value = board[i][j];
    }
  }
}

document.getElementById("solve-button").addEventListener("click", function () {
  let board = getBoard();
  if (solveSudoku(board)) {
    updateBoard(board);
  } else {
    alert("This board cannot be solved!");
  }
});

document.getElementById("clear-button").addEventListener("click", function () {
  let board = getBoard();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = 0;
      let cell = document.getElementById(`cell-${i}-${j}`);
      cell.value = "";
    }
  }
});
