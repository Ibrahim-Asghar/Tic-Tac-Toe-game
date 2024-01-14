let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const cells = document.getElementById('board');
const message = document.getElementById('message');

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        cells.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (board[index] === '' && !checkWinner()) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            message.textContent = `Player ${currentPlayer} wins!`;
        } else if (!board.includes('')) {
            message.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            highlightWinnerCells(pattern);
            return true;
        }
    }

    return false;
}

function highlightWinnerCells(cells) {
    for (const index of cells) {
        document.querySelector(`.cell[data-index='${index}']`).style.backgroundColor = '#4CAF50';
    }
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    cells.innerHTML = '';
    message.textContent = '';
    createBoard();
}

createBoard();
