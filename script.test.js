/**
 * @jest-environment jsdom
 */

document.body.innerHTML = `
    <div id="game-board" class="board">
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
    </div>
    <div id="game-status" class="game-status"></div>
    <button id="restartButton">Restart Game</button>
`;

const {
    handleCellClick,
    handleResultValidation,
    handleRestartGame,
    resetGameState
} = require('./script');

describe('Tic-Tac-Toe Game', () => {
    beforeEach(() => {
        resetGameState();
    });

    test('should handle cell click and update game state', () => {
        const cell = document.querySelector('[data-cell]');
        handleCellClick({ target: cell });
        expect(cell.textContent).toBe('X');
    });

    test('should not allow clicking on a non-empty cell', () => {
        const cell = document.querySelector('[data-cell]');
        handleCellClick({ target: cell });
        handleCellClick({ target: cell });
        expect(cell.textContent).toBe('X');
    });

    test('should declare a winner', () => {
        const cells = document.querySelectorAll('[data-cell]');
        handleCellClick({ target: cells[0] }); // X
        handleCellClick({ target: cells[3] }); // O
        handleCellClick({ target: cells[1] }); // X
        handleCellClick({ target: cells[4] }); // O
        handleCellClick({ target: cells[2] }); // X
        const gameStatus = document.getElementById('game-status');
        expect(gameStatus.textContent).toBe('Player X has won!');
    });

    test('should handle a draw', () => {
        const cells = document.querySelectorAll('[data-cell]');
        handleCellClick({ target: cells[0] }); // X
        handleCellClick({ target: cells[1] }); // O
        handleCellClick({ target: cells[2] }); // X
        handleCellClick({ target: cells[4] }); // O
        handleCellClick({ target: cells[3] }); // X
        handleCellClick({ target: cells[5] }); // O
        handleCellClick({ target: cells[7] }); // X
        handleCellClick({ target: cells[6] }); // O
        handleCellClick({ target: cells[8] }); // X

        const gameStatus = document.getElementById('game-status');
        expect(gameStatus.textContent).toBe('Game ended in a draw!');
    });

    test('should restart the game', () => {
        const cell = document.querySelector('[data-cell]');
        handleCellClick({ target: cell });
        handleRestartGame();
        expect(cell.textContent).toBe('');
        const gameStatus = document.getElementById('game-status');
        expect(gameStatus.textContent).toBe("It's X's turn");
    });
});