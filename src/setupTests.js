// Jest setup file for DOM testing
require('@testing-library/jest-dom');

// Mock animations for testing
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
    animation: '',
    transform: ''
  })
});

// Mock offsetHeight for animation triggers
Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
  get() { return 100; }
});

// Mock setTimeout for testing async operations
global.setTimeout = jest.fn((fn) => fn());

// Color conversion utility for testing
global.hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
};

// Global test utilities
global.createMockDOM = () => {
  document.body.innerHTML = `
    <div class="container">
      <header>
        <h1>Tic Tac Toe</h1>
      </header>
      
      <main>
        <div class="game-info">
          <div id="game-status">Player X's turn</div>
          <button id="reset-btn" class="reset-button">重新開始</button>
        </div>
        
        <div class="game-board" id="game-board">
          <div class="cell" data-index="0"></div>
          <div class="cell" data-index="1"></div>
          <div class="cell" data-index="2"></div>
          <div class="cell" data-index="3"></div>
          <div class="cell" data-index="4"></div>
          <div class="cell" data-index="5"></div>
          <div class="cell" data-index="6"></div>
          <div class="cell" data-index="7"></div>
          <div class="cell" data-index="8"></div>
        </div>
      </main>
    </div>
  `;
};

// Clean up after each test
afterEach(() => {
  document.body.innerHTML = '';
  jest.clearAllMocks();
});