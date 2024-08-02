// Get references to the board cells and status
const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const resetButton = document.querySelector('.reset-button');

let currentPlayer = 'X'; // Starting player
let board = ['', '', '', '', '', '', '', '', '']; // Game board state
let gameActive = true; // Flag to check if the game is active

// Winning conditions for Tic Tac Toe
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

// Handle cell click events
function handleClick(event) {
    const cellIndex = event.target.getAttribute('data-index');
    
    if (board[cellIndex] || !gameActive) return;
    
    // Update board state and cell display
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer.toLowerCase()); // Add X or O class

    // Check for win condition
    if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    
    // Check for draw
    if (board.every(cell => cell)) {
        status.textContent = "It's a draw!";
        gameActive = false;
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a win condition
function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Reset the game state
function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']; // Clear the board
    gameActive = true; // Set game to active
    currentPlayer = 'X'; // Reset to starting player
    status.textContent = "Player X's turn"; // Reset status text
    cells.forEach(cell => {
        cell.textContent = ''; // Clear cell text
        cell.classList.remove('x', 'o'); // Remove X and O classes
    });
}

// Add event listeners to cells and reset button
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

