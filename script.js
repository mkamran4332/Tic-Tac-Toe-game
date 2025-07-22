const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

// Create the cells dynamically
function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkResult();
}

function checkResult() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      statusText.textContent = `Player ${currentPlayer} wins!`;
      highlightWinner(condition);
      return;
    }
  }

  if (!gameState.includes("")) {
    gameActive = false;
    statusText.textContent = "It's a draw!";
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'Y' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function highlightWinner(indices) {
  indices.forEach(i => {
    board.children[i].style.backgroundColor = '#a5d6a7';
  });
}

resetButton.addEventListener('click', () => {
  gameState = Array(9).fill("");
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
});

createBoard();
