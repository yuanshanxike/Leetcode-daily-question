// brute-force
// function orangesRotting(grid: number[][]): number {
//     let minutes = 0
//     while (!checkRotting(grid)) {
//         minutes++
//         if (!rotting(grid)) return -1
//     }
//     return minutes
// };

function checkRotting(grid: number[][]): boolean {
    let noFresh = true
    for (const row of grid) {
        for (const unit of row) {
            noFresh &&= unit != 1
        }
    }
    return noFresh
}

const newRotted = new Set<[number, number]>()

function rotting(grid: number[][]): boolean {
    const m = grid.length
    const n = grid[0].length
    newRotted.clear()
    for (const i in grid) {
        for (const j in grid[0]) {
            if (grid[i][j] == 2) {
                // left
                if (+j > 0 && grid[i][+j - 1] == 1) newRotted.add([+i, +j - 1])
                // top
                if (+i > 0 && grid[+i - 1][j] == 1) newRotted.add([+i - 1, +j])
                // right
                if (+j < n - 1 && grid[i][+j + 1] == 1) newRotted.add([+i, +j + 1])
                // bottom
                if (+i < m - 1 && grid[+i + 1][j] == 1) newRotted.add([+i + 1, +j])
            }
        }
    }
    newRotted.forEach(([i, j]) => {
        grid[i][j] = 2
    })
    return newRotted.size != 0
}

// 多源 BFS
function orangesRotting(grid: number[][]): number {
    const m = grid.length
    const n = grid[0].length
    let { count, set }: { count: number, set: number[][] } = countFreshAndTrackRotted(grid)
    let minutes = -1
    while (set.length > 0) {
        let nextSet: number[][] = []
        set.forEach(([i, j]) => {
            // left
            if (+j > 0 && grid[i][+j - 1] == 1) {
                nextSet.push([+i, +j - 1])
                grid[i][+j - 1] = 2
                count--
            }
            // top
            if (+i > 0 && grid[+i - 1][j] == 1) {
                nextSet.push([+i - 1, +j])
                grid[+i - 1][j] = 2
                count--
            }
            // right
            if (+j < n - 1 && grid[i][+j + 1] == 1) {
                nextSet.push([+i, +j + 1])
                grid[i][+j + 1] = 2
                count--
            }
            // bottom
            if (+i < m - 1 && grid[+i + 1][j] == 1) {
                nextSet.push([+i + 1, +j])
                grid[+i + 1][j] = 2
                count--
            }
        })
        set = [... nextSet]
        minutes++
    }
    return count == 0 ? Math.max(minutes, 0) : -1
}

function countFreshAndTrackRotted(grid: number[][]): { count: number, set: number[][] } {
    let count = 0
    let set: number[][] = [];
    for (const i in grid) {
        for (const j in grid[0]) {
            if (grid[i][j] == 1) count++
            else if (grid[i][j] == 2) set.push([+i, +j])
        }
    }
    return {
        'count': count,
        'set': set
    }
}

console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]))
console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]]))
console.log(orangesRotting([[0,2]]))