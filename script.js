const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-btn');
const computerModeButton = document.getElementById('computer-mode-btn');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;
let isComputerMode = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameOver = true;
            message.textContent = `${currentPlayer} Wins!`;
            return true;
        }
    }
    return false;
}

function checkDraw() {
    if (!board.includes('')) {
        isGameOver = true;
        message.textContent = 'Draw!';
        return true;
    }
    return false;
}

function handleClick(event) {
    const index = event.target.getAttribute('data-index');

    if (board[index] === '' && !isGameOver) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin()) {
            return;
        }

        if (checkDraw()) {
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (isComputerMode && currentPlayer === 'O') {
            computerMove();
        }
    }
}

function computerMove() {
    let availableCells = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            availableCells.push(i);
        }
    }

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';

    if (checkWin()) {
        return;
    }

    if (checkDraw()) {
        return;
    }

    currentPlayer = 'X';
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOver = false;
    message.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

function toggleComputerMode() {
    isComputerMode = !isComputerMode;
    computerModeButton.textContent = isComputerMode ? 'Play Against Human' : 'Play Against Computer';
    restartGame();
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);
computerModeButton.addEventListener('click', toggleComputerMode);
