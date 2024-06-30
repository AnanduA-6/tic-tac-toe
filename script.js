const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const moveSound = document.getElementById('moveSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');

let currentPlayer = 'X';
let gameState = Array(9).fill('');
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    moveSound.play();

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        highlightWinningCells();
        winSound.play();
        gameActive = false;
    } else if (gameState.every(cell => cell !== '')) {
        statusText.textContent = `It's a Draw!`;
        drawSound.play();
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function highlightWinningCells() {
    winningConditions.forEach(condition => {
        if (condition.every(index => gameState[index] === currentPlayer)) {
            condition.forEach(index => {
                cells[index].classList.add(`${currentPlayer.toLowerCase()}-winner`);
            });
        }
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameState = Array(9).fill('');
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

statusText.textContent = `Player ${currentPlayer}'s Turn`;
