// 模擬 localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// 模擬 window.confirm
global.confirm = jest.fn();

// 模擬 console.log
global.console = {
  ...console,
  log: jest.fn(),
};
