function differenceOfDistinctValues(grid: number[][]): number[][] {
    const m = grid.length
    const n = grid[0].length

    const ans = Array.from({ length: m }, () => new Array(n).fill(0))

    const set = new Set()

    function scanTopLeft(i: number, j: number) {
        set.clear()
        while (i < m && j < n) {
            set.add(grid[i][j])
            grid[i][j] = set.size
            i++
            j++
        }
    }

    function scanBottomRight(i: number, j: number) {
        set.clear()
        while (i >= 0 && j >= 0) {
            set.add(grid[i][j])
            ans[i][j] = set.size
            i--
            j--
        }
    }

    const topArray = Array.from({ length: n - 2 }, (_, j) => [0, j + 1] as [number, number])
    const rightArray = Array.from({ length: m - 2 }, (_, i) => [i + 1, n - 1] as [number, number])
    const bottomArray = Array.from({ length: n - 2 }, (_, j) => [m - 1, j + 1] as [number, number])
    const leftArray = Array.from({ length: m - 2 }, (_, i) => [i + 1, 0] as [number, number])

    for (const [i, j] of [... rightArray, [m - 1, n - 1] as const, ... bottomArray]) {
        scanBottomRight(i, j)
    }

    for (const [i, j] of [... topArray, [0, 0] as const, ... leftArray]) {
        scanTopLeft(i, j)
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            ans[i][j] = Math.abs((i + 1 < m && j + 1 < n ? ans[i + 1][j + 1] : 0) - (i - 1 >= 0 && j - 1 >= 0 ? grid[i - 1][j - 1] : 0))
        }
    }

    return ans
};

console.log(differenceOfDistinctValues([[1, 2, 3], [3, 1, 5], [3, 2, 1]]))
console.log(differenceOfDistinctValues([[0]]))
console.log(differenceOfDistinctValues([[1, 1, 1], [1, 1, 1], [1, 1, 1]]))
