function minFlips(grid: number[][]): number {
    const n = grid.length, m = grid[0].length
    // 判断行
    let rowTimes = 0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m / 2; j++) {
            if (grid[i][j] != grid[i][m - 1 - j]) {
                rowTimes++
            }
        }
    }
    // 判断列
    let colTimes = 0
    for (let j = 0; j < m; j++) {
        for (let i = 0; i < n / 2; i++) {
            if (grid[i][j] != grid[n - 1 - i][j]) {
                colTimes++                
            }
        }
    }
    return Math.min(rowTimes, colTimes)
};

console.log(minFlips([[1,0,0],[0,0,0],[0,0,1]]))
console.log(minFlips([[0,1],[0,1],[0,0]]))
console.log(minFlips([[1],[0]]))