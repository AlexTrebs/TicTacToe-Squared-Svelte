function flatListToMatrix(flatList) {
  const len = Math.sqrt(flatList.length);
  const matrix = [];
  let index = 0;

  for (let i = 0; i < len; i++) {
    const row = [];
    for (let j = 0; j < len; j++) {
      row.push(flatList[index]);
      index++;
    }
    matrix.push(row);
  }

  return matrix;
}

export default function calculateWinner(squares) {
  const board = flatListToMatrix(squares);
  const size = board.length;

  for (let i = 0; i < size; i++) {
    if (board[i][0] !== null && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0];
    }
    if (board[0][i] !== null && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return board[0][i];
    }
  }

  if (board[0][0] !== null && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }

  if (board[0][2] !== null && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2];
  }

  return null;
}
