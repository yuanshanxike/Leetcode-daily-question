function maxIncreaseKeepingSkyline(grid: number[][]): number {
    const row: number[] = Array(grid.length).fill(-1)
    const col: number[] = Array(grid[0].length).fill(-1)
    grid.forEach((nums, i) => {
        nums.forEach((val, j) => {
            row[i] = Math.max(row[i], val)
            col[j] = Math.max(col[j], val)
        })
    })
    let ans = 0
    grid.forEach((nums, i) => {
        nums.forEach((val, j) => {
            ans += Math.min(row[i], col[j]) - val
        })
    })
    return ans
};

console.log(maxIncreaseKeepingSkyline([[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]))
console.log(maxIncreaseKeepingSkyline([[0,0,0],[0,0,0],[0,0,0]]))