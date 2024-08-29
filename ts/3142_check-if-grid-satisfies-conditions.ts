function satisfiesConditions(grid: number[][]): boolean {
    const m = grid.length, n = grid[0].length
    let colVal = -1
    for (let j = 0; j < n; j++) {
        if (colVal == grid[0][j]) return false
        colVal = grid[0][j]
        for (let i = 1; i < m; i++) {
            if (grid[i][j] != colVal) return false
        }
    }
    return true
};

console.log(satisfiesConditions([[1,0,2],[1,0,2]]))
console.log(satisfiesConditions([[1,1,1],[0,0,0]]))
console.log(satisfiesConditions([[1],[2],[3]]))