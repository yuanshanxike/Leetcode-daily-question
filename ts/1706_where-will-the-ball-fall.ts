function findBall(grid: number[][]): number[] {
    const n = grid.length, m = grid[0].length

    const memo = new Map<number, number>()
    function dfs(i: number, j: number): number {
        if (j < 0 || j >= m) return -1
        if (i >= n) return j
        const key = i * m + j
        if (memo.has(key)) return memo.get(key)!

        if (grid[i][j] == 1 && grid[i][j + 1] == -1 || grid[i][j] == -1 && grid[i][j - 1] == 1) { // 遇到 \/ 
            memo.set(key, -1)
            return -1
        }

        if (grid[i][j] == 1) {  // 向右
            memo.set(key, dfs(i + 1, j + 1))
        } else {  // 向左
            memo.set(key, dfs(i + 1, j - 1))
        }
        return memo.get(key)!
    }

    const ans = Array(m).fill(0)
    for (let j = 0; j < m; j++) {
        ans[j] = dfs(0, j)
    }
    return ans
};

console.log(findBall([[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]]))
console.log(findBall([[-1]]))
console.log(findBall([[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1],[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1]]))