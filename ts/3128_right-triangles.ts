/**
 * 先遍历一遍二维数组，记录下每一行和每一列有多少个 1；
 * 然后再遍历一遍二维数组，计算以每个值为 1 的格子为直角顶点时，所能构建的直角三角形数目：
 * 等于在同一行中任选一个其他的点作为直角边的另一个端点，然后在同一列中任选一个其他的点作为另一条直角边的另一个端点。
 * 能这样构建的数目等于上述的两个端点数目相乘。把每个直角顶点能构建的直角三角形数目相加
 * @param grid 
 */
function numberOfRightTriangles(grid: number[][]): number {
    const m = grid.length
    const n = grid[0].length
    const row = new Array(m).fill(0)
    const col = new Array(n).fill(0)
    function loopExecIfValid(fun: (i: number, j: number) => void) {
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    fun(i, j)
                }
            }
        }
    }
    
    loopExecIfValid((i, j) => {
        row[i]++
        col[j]++
    })

    let ans = 0
    loopExecIfValid((i, j) => {
        ans += (row[i] - 1) * (col[j] - 1)
    })
    return ans
};

console.log(numberOfRightTriangles([[0,1,0],[0,1,1],[0,1,0]]))
console.log(numberOfRightTriangles([[1,0,0,0],[0,1,0,1],[1,0,0,0]]))
console.log(numberOfRightTriangles([[1,0,1],[1,0,0],[1,0,0]]))