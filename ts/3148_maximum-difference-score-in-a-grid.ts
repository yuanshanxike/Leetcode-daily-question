/**
 * 方法一：动态规划
 * 
 * 定义 dp[i][j] 表示到达 grid[i][j] 处能取得的最大分数，
 * 则可以容易得到状态转移方程为：
 * dp[i][j] = max(
 *     max(dp[0][j] + grid[i][j] - grid[0][j], dp[1][j] + grdi[i][j] - grid[1][j], ..., dp[i - 1][j] + grid[i][j] - grid[i -1][j]),
 *     max(dp[i][0] + grid[i][j] - grid[i][0], dp[i][1] + grid[i][j] - grid[i][1], ..., dp[i][j - 1] + grid[i][j] - grid[i][j - 1]),
 *     grid[i][j] - grid[0][j], grdi[i][j] - grid[1][j], ..., grid[i][j] - grid[i - 1][j],
 *     grid[i][j] - grid[i][0], grid[i][j] - grid[i][1], ..., grid[i][j] - grid[i][j - 1]
 * )
 * 
 * 化简上式，可以提出 grid[i][j], 同时，对于每个格子 grid 对应的 dp 值，如果 dp <= 0 则不加，dp > 0 则加上。化简为：
 * dp[i][j] = max(
 *     -grid[0][j] + (dp[0][j] > 0 ? dp[0][j] : 0), -grid[1][j] + (dp[1][j] > 0 ? dp[1][j] : 0), ..., -grid[i - 1][j] + (dp[i- 1][j] > 0 ? dp[i - 1][j] : 0),
 *     -grid[i][0] + (dp[i][0] > 0 ? dp[i][0] : 0), -grid[i][1] + (dp[i][1] > 0 ? dp[i][1] : 0), ..., -grid[i][j - 1] + (dp[i][j - 1] > 0 ? dp[i][j - 1] : 0)
 * ) + grid[i][j]
 * 
 * 对于每个 -grid[k][j] + dp[k][j] > 0 ? dp[k][j] : 0 和 -grid[i][k] + dp[i][k] > 0 ? dp[i][k] : 0,
 * 在我们从左上到右下遍历数组的时候就能够计算出其大小，并可以分别用一个 row 数组和一盒 col 数组，维护当前 grid[i][j] 对应行和列中上述 max 内比较得出的最大值，
 * 再加上 grid[i][j] 的值就是 dp[i][j].
 * 避免了每个 grid[i][j] 都要去算 0...i 和 0...j 的每一项计算结果中的最大值（同一行/同一列 的数据会有大量相同项的重复计算）
 * 
 * 因为按照题目要求，grid[0][0] 是无法作为重点的，所以可以定义初始边界条件 dp[0][0] = -INFINITY_MAX
 * 
 * 时间复杂度：O(mn)
 * @param grid 
 */
function maxScore(grid: number[][]): number {
    const m = grid.length, n = grid[0].length
    // const MIN_VAL = -1e5
    const MIN_VAL = -1e6
    const dp = Array.from({ length: m }, () => Array(n).fill(MIN_VAL))
    const row = Array(m).fill(MIN_VAL)  // 记录行最小值
    const col = Array(n).fill(MIN_VAL)  // 记录列最小值
    let ans = MIN_VAL
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i == 0 && j == 0) continue

            /** 同一行/同一列 重复计算了 前面/上面 相同的项 */
            // for (let k = 0; k < i; k++) {
            //     let val = -grid[k][j] + (dp[k][j] > 0 ? dp[k][j] : 0)
            //     dp[i][j] = Math.max(dp[i][j], val)
            // }
            // for (let k = 0; k < j; k++) {
            //     let val = -grid[i][k] + (dp[i][k] > 0 ? dp[i][k] : 0)
            //     dp[i][j] = Math.max(dp[i][j], val)
            // }
            // dp[i][j] += grid[i][j]

            /** 每项只计算一次，每次只更新该项所在行和列的最大值 */
            dp[i][j] = Math.max(row[i], col[j]) + grid[i][j]
            const val = -grid[i][j] + (dp[i][j] > 0 ? dp[i][j] : 0)
            row[i] = Math.max(row[i], val)
            col[j] = Math.max(col[j], val)

            ans = Math.max(ans, dp[i][j])
        }
    }
    return ans
};

// console.log(maxScore([[9,5,7,3],[8,9,6,1],[6,7,14,3],[2,5,3,1]]))
// console.log(maxScore([[4,3,2],[3,2,1]]))

namespace L3148_another_slotion {
    /**
     * 方法二：二维前缀和
     * 
     * 假设走过的路径点上的值为 x0, x1, x2, x3, ..., xn，可以计算总的得分为：
     *  (x1 - x0) + (x2 - x1) + (x3 - x2) + ... + (xn - xn-1) = xn - x0
     * 所以得分只会与起点(x0)和终点(xn)有关。
     * 
     * 定义 f[i + 1][j + 1] 表示左上角在 (0, 0), 右下角在 (i, j) 的子矩阵中的最小值。
     * 
     * f[i + 1][j + 1] = min(grid[i][j], f[i][j + 1], f[i + 1][j])
     * 可以递推计算出以 (0,0) 为左上角，每一个点为右下角的矩阵的最小值。
     * 
     * 因为题目要求起点和终点不能重合，所以对于以每个点为终点时，要计算的是:
     * grid[i][j] - min(f[i][j - 1], f[i - 1][j])
     * 
     * 在递推的同时，统计上式的最大值即可.
     * @param grid 
     */
    function maxScore(grid: number[][]): number {
        const m = grid.length, n = grid[0].length
        const MAX_VAL = Number.MAX_VALUE
        const f = Array.from({ length: m }, (_, i) => Array.from({ length: n }, (_, j) => grid[i][j]))
        let ans = -MAX_VAL
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue
                f[i][j] = Math.min(i > 0 ? f[i - 1][j] : MAX_VAL, j > 0 ? f[i][j - 1] : MAX_VAL)
                ans = Math.max(ans, grid[i][j] - f[i][j])
                f[i][j] = Math.min(f[i][j], grid[i][j])
            }
        }
        return ans
    }

    console.log(maxScore([[9,5,7,3],[8,9,6,1],[6,7,14,3],[2,5,3,1]]))
    console.log(maxScore([[4,3,2],[3,2,1]]))
}