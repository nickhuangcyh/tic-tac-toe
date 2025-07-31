// 載入測試專用的遊戲邏輯
const { debounce } = require("../game-logic");

describe("工具函數", () => {
  beforeEach(() => {
    // 清除模擬
    jest.clearAllMocks();
  });

  describe("debounce 函數", () => {
    test("應該正確防抖動", (done) => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 100);

      // 多次調用
      debouncedFn();
      debouncedFn();
      debouncedFn();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 150);
    });

    test("應該正確傳遞參數", (done) => {
      let receivedArgs = null;
      const debouncedFn = debounce((...args) => {
        receivedArgs = args;
      }, 100);

      debouncedFn("test", 123, { key: "value" });

      setTimeout(() => {
        expect(receivedArgs).toEqual(["test", 123, { key: "value" }]);
        done();
      }, 150);
    });

    test("應該在延遲期間清除之前的超時", (done) => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 100);

      // 第一次調用
      debouncedFn();

      // 在延遲期間再次調用
      setTimeout(() => {
        debouncedFn();
      }, 50);

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 200);
    });

    test("應該處理不同的延遲時間", (done) => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 50);

      debouncedFn();
      debouncedFn();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 100);
    });
  });
});
