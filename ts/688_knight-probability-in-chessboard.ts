/**
 * 记忆化搜索
 * @param n 
 * @param k 
 * @param row 
 * @param column 
 */
function knightProbability(n: number, k: number, row: number, column: number): number {
    const nextMove = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]]
    const memo = new Map<number, number>()

    function dfs(x: number, y: number, step: number): number {
        if (x < 0 || x >= n || y < 0 || y >= n) {
            return 0  // 出界就不是留在棋盘上，对应留在棋盘上的概率为 0
        } else if (step === k) {
            return 1  // 移动了 k 步后留在棋盘上（剩余移动步数为 0，此时一定留在棋盘上），对应留在棋盘上的概率为 1
        }
        const key = (x - 1) * n * (k + 1) + (y - 1) * (k + 1) + step
        if (memo.has(key)) {
            return memo.get(key)!
        }
        let res = 0
        for (const [dx, dy] of nextMove) {
            res += dfs(x + dx, y + dy, step + 1)
        }
        memo.set(key, res / 8)  // Σ(dfs(next) * 1/8) == 1/8 * Σ(dfs(next))
        return memo.get(key)!
    }

    return dfs(row, column, 0)
};

console.log(knightProbability(3, 2, 0, 0))
console.log(knightProbability(1, 0, 0, 0))
console.log(knightProbability(8, 30, 6, 4))
