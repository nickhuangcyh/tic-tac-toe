// 迪士尼魔法井字棋遊戲管理
class DisneyTicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'minnie'; // 米妮先開始
        this.gameActive = true;
        
        // 迪士尼元素
        this.gameStatus = document.getElementById('game-status');
        this.resetButton = document.getElementById('reset-btn');
        this.cells = document.querySelectorAll('.disney-cell');
        this.playerCards = {
            minnie: document.getElementById('player-minnie'),
            donald: document.getElementById('player-donald')
        };
        
        // 統計元素
        this.stats = {
            minnieWins: document.getElementById('minnie-wins'),
            donaldWins: document.getElementById('donald-wins'),
            draws: document.getElementById('draws')
        };
        
        // 魔法效果容器
        this.magicEffects = document.getElementById('magic-effects');
        
        // 統計數據
        this.gameStats = {
            minnieWins: parseInt(localStorage.getItem('minnieWins') || '0'),
            donaldWins: parseInt(localStorage.getItem('donaldWins') || '0'),
            draws: parseInt(localStorage.getItem('draws') || '0')
        };
        
        // 玩家符號
        this.playerSymbols = {
            minnie: '❤️',
            donald: '⭐'
        };
        
        // 玩家名稱
        this.playerNames = {
            minnie: '米妮',
            donald: '唐老鴨'
        };
        
        this.winningConditions = [
            [0, 1, 2], // 第一行
            [3, 4, 5], // 第二行
            [6, 7, 8], // 第三行
            [0, 3, 6], // 第一列
            [1, 4, 7], // 第二列
            [2, 5, 8], // 第三列
            [0, 4, 8], // 主對角線
            [2, 4, 6]  // 副對角線
        ];
        
        this.init();
    }
    
    // 初始化遊戲
    init() {
        this.updateGameStatus();
        this.updatePlayerCards();
        this.updateStats();
        this.addEventListeners();
        this.createMagicStars();
    }
    
    // 添加事件監聽器
    addEventListeners() {
        // 為每個格子添加點擊事件
        if (this.cells) {
            this.cells.forEach((cell, index) => {
                if (cell) {
                    cell.addEventListener('click', () => this.handleCellClick(index));
                }
            });
        }
        
        // 重新開始按鈕事件
        if (this.resetButton) {
            this.resetButton.addEventListener('click', () => this.resetGame());
        }
    }
    
    // 處理格子點擊
    handleCellClick(index) {
        // 檢查格子是否已被占用或遊戲是否結束
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        // 更新棋盤狀態
        this.board[index] = this.currentPlayer;
        this.updateCellDisplay(index);
        
        // 檢查遊戲結果
        this.checkGameResult();
    }
    
    // 更新格子顯示
    updateCellDisplay(index) {
        const cell = this.cells && this.cells[index];
        if (cell) {
            cell.textContent = this.playerSymbols[this.currentPlayer];
            cell.setAttribute('data-player', this.currentPlayer);
            if (cell.classList) {
                cell.classList.add('filled');
            }
            
            // 添加魔法放置動畫
            this.createMagicPlaceEffect(cell);
            cell.style.animation = 'none';
            cell.offsetHeight; // 觸發重排
            cell.style.animation = 'magicPlace 0.5s ease-out';
        }
    }
    
    // 檢查遊戲結果
    checkGameResult() {
        let roundWon = false;
        let winningCells = [];
        
        // 檢查所有勝利條件
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                roundWon = true;
                winningCells = condition;
                break;
            }
        }
        
        if (roundWon) {
            this.handleWin(winningCells);
            return;
        }
        
        // 檢查平局
        if (!this.board.includes('')) {
            this.handleDraw();
            return;
        }
        
        // 切換玩家
        this.switchPlayer();
    }
    
    // 處理勝利
    handleWin(winningCells) {
        this.gameActive = false;
        const winnerName = this.playerNames[this.currentPlayer];
        this.gameStatus.textContent = `🎉 恭喜${winnerName}獲得迪士尼魔法勝利！✨`;
        this.gameStatus.style.color = '#FFE066';
        
        // 更新統計
        this.gameStats[`${this.currentPlayer}Wins`]++;
        this.saveAndUpdateStats();
        
        // 高亮勝利格子
        winningCells.forEach(index => {
            this.cells[index].classList.add('winning');
        });
        
        // 播放魔法勝利動畫
        setTimeout(() => {
            this.celebrateMagicWin();
            this.createFireworks();
        }, 300);
    }
    
    // 處理平局
    handleDraw() {
        this.gameActive = false;
        this.gameStatus.textContent = '👫 友誼勝過一切！平局啦～';
        this.gameStatus.style.color = '#9F7AEA';
        
        // 更新統計
        this.gameStats.draws++;
        this.saveAndUpdateStats();
        
        // 播放平局動畫
        setTimeout(() => {
            this.createFriendshipEffect();
        }, 300);
    }
    
    // 切換玩家
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'minnie' ? 'donald' : 'minnie';
        this.updateGameStatus();
        this.updatePlayerCards();
    }
    
    // 更新遊戲狀態顯示
    updateGameStatus() {
        if (this.gameActive && this.gameStatus) {
            const playerName = this.playerNames[this.currentPlayer];
            this.gameStatus.textContent = `${playerName}的回合 ✨`;
            this.gameStatus.style.color = this.currentPlayer === 'minnie' ? '#FF6B9D' : '#4ECDC4';
        }
    }
    
    // 更新玩家卡片狀態
    updatePlayerCards() {
        // 移除所有active類
        Object.values(this.playerCards).forEach(card => {
            if (card && card.classList) {
                card.classList.remove('active');
            }
        });
        
        // 為當前玩家添加active類
        const currentCard = this.playerCards[this.currentPlayer];
        if (currentCard && currentCard.classList) {
            currentCard.classList.add('active');
        }
    }
    
    // 更新統計顯示
    updateStats() {
        if (this.stats.minnieWins) {
            this.stats.minnieWins.textContent = this.gameStats.minnieWins;
        }
        if (this.stats.donaldWins) {
            this.stats.donaldWins.textContent = this.gameStats.donaldWins;
        }
        if (this.stats.draws) {
            this.stats.draws.textContent = this.gameStats.draws;
        }
    }
    
    // 保存並更新統計
    saveAndUpdateStats() {
        localStorage.setItem('minnieWins', this.gameStats.minnieWins.toString());
        localStorage.setItem('donaldWins', this.gameStats.donaldWins.toString());
        localStorage.setItem('draws', this.gameStats.draws.toString());
        this.updateStats();
    }
    
    // 魔法勝利慶祝動畫
    celebrateMagicWin() {
        if (typeof document !== 'undefined' && document.querySelector) {
            const container = document.querySelector('.disney-container');
            if (container) {
                container.style.animation = 'magicCelebrate 1.2s ease-in-out';
                
                // 重置動畫
                setTimeout(() => {
                    container.style.animation = '';
                }, 1200);
            }
        }
    }
    
    // 重新開始遊戲
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'minnie'; // 米妮先開始
        this.gameActive = true;
        
        // 清空所有格子
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.removeAttribute('data-player');
            cell.classList.remove('filled', 'winning');
            cell.style.animation = '';
        });
        
        // 清除魔法效果
        if (this.magicEffects) {
            this.magicEffects.innerHTML = '';
        }
        
        // 重置狀態顯示
        this.updateGameStatus();
        this.updatePlayerCards();
        
        // 魔法重置按鈕動畫
        this.createMagicResetEffect();
        this.resetButton.style.animation = 'magicButtonPress 0.4s ease-out';
        setTimeout(() => {
            this.resetButton.style.animation = '';
        }, 400);
    }
    
    // ===== 迪士尼魔法效果方法 =====
    
    // 創建魔法星星背景
    createMagicStars() {
        if (!this.magicEffects) return;
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.textContent = '✨';
                star.style.position = 'absolute';
                star.style.fontSize = '16px';
                star.style.color = '#9F7AEA';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animation = `float ${3 + Math.random() * 3}s ease-in-out infinite`;
                star.style.animationDelay = Math.random() * 2 + 's';
                star.style.pointerEvents = 'none';
                
                this.magicEffects.appendChild(star);
                
                // 5秒後移除
                setTimeout(() => {
                    if (star.parentNode) {
                        star.parentNode.removeChild(star);
                    }
                }, 5000);
            }, i * 500);
        }
    }
    
    // 創建棋子放置魔法效果
    createMagicPlaceEffect(cell) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '20px';
        sparkle.style.color = this.currentPlayer === 'minnie' ? '#FF6B9D' : '#4ECDC4';
        sparkle.style.left = '50%';
        sparkle.style.top = '50%';
        sparkle.style.transform = 'translate(-50%, -50%)';
        sparkle.style.animation = 'sparkle 0.8s ease-out';
        sparkle.style.pointerEvents = 'none';
        
        cell.style.position = 'relative';
        cell.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 800);
    }
    
    // 創建煙火效果
    createFireworks() {
        if (!this.magicEffects) return;
        
        const colors = ['#FF6B9D', '#4ECDC4', '#FFE066', '#9F7AEA'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.textContent = '🎆';
                firework.style.position = 'absolute';
                firework.style.fontSize = '24px';
                firework.style.left = 20 + Math.random() * 60 + '%';
                firework.style.top = 20 + Math.random() * 60 + '%';
                firework.style.animation = `fireworkBurst 1.5s ease-out`;
                firework.style.pointerEvents = 'none';
                
                this.magicEffects.appendChild(firework);
                
                setTimeout(() => {
                    if (firework.parentNode) {
                        firework.parentNode.removeChild(firework);
                    }
                }, 1500);
            }, i * 200);
        }
    }
    
    // 創建友誼效果
    createFriendshipEffect() {
        if (!this.magicEffects) return;
        
        const hearts = ['💖', '💝', '💕', '💗'];
        
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = hearts[i % hearts.length];
                heart.style.position = 'absolute';
                heart.style.fontSize = '20px';
                heart.style.left = 10 + Math.random() * 80 + '%';
                heart.style.top = 10 + Math.random() * 80 + '%';
                heart.style.animation = `heartFloat 2s ease-out`;
                heart.style.pointerEvents = 'none';
                
                this.magicEffects.appendChild(heart);
                
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 2000);
            }, i * 300);
        }
    }
    
    // 創建重置魔法效果
    createMagicResetEffect() {
        if (!this.resetButton) return;
        
        const magic = document.createElement('div');
        magic.textContent = '🪄';
        magic.style.position = 'absolute';
        magic.style.fontSize = '16px';
        magic.style.left = '50%';
        magic.style.top = '50%';
        magic.style.transform = 'translate(-50%, -50%)';
        magic.style.animation = 'magicWand 0.6s ease-out';
        magic.style.pointerEvents = 'none';
        
        this.resetButton.style.position = 'relative';
        this.resetButton.appendChild(magic);
        
        setTimeout(() => {
            if (magic.parentNode) {
                magic.parentNode.removeChild(magic);
            }
        }, 600);
    }
}

// 迪士尼魔法動畫定義（通過 JavaScript 注入）
const disneyStyle = document.createElement('style');
disneyStyle.textContent = `
    @keyframes magicPlace {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.3) rotate(180deg);
        }
        100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
        }
    }
    
    @keyframes magicCelebrate {
        0%, 100% {
            transform: scale(1) rotate(0deg);
        }
        25% {
            transform: scale(1.1) rotate(5deg);
        }
        50% {
            transform: scale(1.05) rotate(-3deg);
        }
        75% {
            transform: scale(1.1) rotate(3deg);
        }
    }
    
    @keyframes magicButtonPress {
        0% {
            transform: scale(1);
        }
        25% {
            transform: scale(1.1) rotate(5deg);
        }
        50% {
            transform: scale(0.9) rotate(-5deg);
        }
        100% {
            transform: scale(1) rotate(0deg);
        }
    }
    
    @keyframes fireworkBurst {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 0.8;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 0;
        }
        50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translateY(-40px) scale(0.8);
            opacity: 0;
        }
    }
    
    @keyframes magicWand {
        0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) rotate(180deg) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) rotate(360deg) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(disneyStyle);

// 初始化迪士尼魔法遊戲
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        new DisneyTicTacToe();
    });
}

// 支持 Node.js 模組導出以供測試使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        TicTacToe: DisneyTicTacToe, // 向後兼容
        DisneyTicTacToe 
    };
}