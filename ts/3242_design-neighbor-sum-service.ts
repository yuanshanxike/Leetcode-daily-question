class NeighborSum {
    private grid: number[][]
    private n: number
    private element2Pos: Record<number, [number, number]> = {}

    constructor(grid: number[][]) {
        this.grid = grid
        this.n = grid.length
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                this.element2Pos[grid[i][j]] = [i, j]
            }
        }
    }

    adjacentSum(value: number): number {
        const [x, y] = this.element2Pos[value]
        let ret = 0
        if (x > 0) ret += this.grid[x - 1][y]
        if (x < this.n - 1) ret += this.grid[x + 1][y]
        if (y > 0) ret += this.grid[x][y - 1]
        if (y < this.n - 1) ret += this.grid[x][y + 1]
        return ret
    }

    diagonalSum(value: number): number {
        const [x, y] = this.element2Pos[value]
        let ret = 0
        if (x > 0 && y > 0) ret += this.grid[x - 1][y - 1]
        if (x < this.n - 1 && y > 0) ret += this.grid[x + 1][y - 1]
        if (x > 0 && y < this.n - 1) ret += this.grid[x - 1][y + 1]
        if (x < this.n - 1 && y < this.n - 1) ret += this.grid[x + 1][y + 1]
        return ret
    }
}

/**
 * Your NeighborSum object will be instantiated and called as such:
 * var obj = new NeighborSum(grid)
 * var param_1 = obj.adjacentSum(value)
 * var param_2 = obj.diagonalSum(value)
 */