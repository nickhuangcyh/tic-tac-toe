// 載入測試專用的遊戲邏輯
const { GameStats } = require("../game-logic");

describe("GameStats", () => {
  let stats;

  beforeEach(() => {
    stats = new GameStats();
  });

  describe("初始化", () => {
    test("應該正確初始化統計", () => {
      expect(stats.wins).toEqual({ X: 0, O: 0 });
      expect(stats.draws).toBe(0);
    });
  });

  describe("記錄勝利", () => {
    test("應該正確記錄 X 玩家勝利", () => {
      stats.recordWin("X");
      expect(stats.wins.X).toBe(1);
      expect(stats.wins.O).toBe(0);
    });

    test("應該正確記錄 O 玩家勝利", () => {
      stats.recordWin("O");
      expect(stats.wins.O).toBe(1);
      expect(stats.wins.X).toBe(0);
    });

    test("應該正確累積勝利次數", () => {
      stats.recordWin("X");
      stats.recordWin("X");
      stats.recordWin("O");

      expect(stats.wins.X).toBe(2);
      expect(stats.wins.O).toBe(1);
    });
  });

  describe("記錄平局", () => {
    test("應該正確記錄平局", () => {
      stats.recordDraw();
      expect(stats.draws).toBe(1);
    });

    test("應該正確累積平局次數", () => {
      stats.recordDraw();
      stats.recordDraw();
      stats.recordDraw();

      expect(stats.draws).toBe(3);
    });
  });

  describe("統計數據獲取", () => {
    test("應該正確計算總遊戲數", () => {
      stats.recordWin("X");
      stats.recordWin("O");
      stats.recordDraw();

      const totalStats = stats.getStats();
      expect(totalStats.total).toBe(3);
    });

    test("應該正確返回完整統計數據", () => {
      stats.recordWin("X");
      stats.recordWin("O");
      stats.recordDraw();

      const totalStats = stats.getStats();

      expect(totalStats).toEqual({
        wins: { X: 1, O: 1 },
        draws: 1,
        total: 3,
      });
    });

    test("應該正確處理零遊戲的情況", () => {
      const totalStats = stats.getStats();

      expect(totalStats).toEqual({
        wins: { X: 0, O: 0 },
        draws: 0,
        total: 0,
      });
    });
  });

  describe("邊界條件", () => {
    test("應該處理無效的玩家名稱", () => {
      stats.recordWin("invalid");
      expect(stats.wins.invalid).toBe(1);
      expect(stats.wins.X).toBe(0);
      expect(stats.wins.O).toBe(0);
    });

    test("應該處理多次記錄同一玩家", () => {
      stats.recordWin("X");
      stats.recordWin("X");
      stats.recordWin("X");

      expect(stats.wins.X).toBe(3);
    });
  });
});
