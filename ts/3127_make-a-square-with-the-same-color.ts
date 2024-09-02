function canMakeSquare(grid: string[][]): boolean {
    for (const [x, y] of [[0, 0], [0, 1], [1, 0], [1, 1]]) {
        let cnt = 0
        for (let i = x; i < x + 2; i++) {
            for (let j = y; j < y + 2; j++) {
                if (grid[i][j] == 'W') cnt++
            }
        }
        if (cnt != 2) return true
    }
    return false
};