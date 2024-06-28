/**
 * 付费油漆匠总的刷墙的时间只需要满足 T >= N - 免费刷墙的数量。
 * 也就是刷每堵墙所需的时间（等于这段时间内可以免费刷墙的堵数）t + 1 (付费刷的这一堵墙) 进行累加求和满足 ∑(ti + 1) >= N
 * 问题就转化成了从 time 中选择一部分的墙体，使得每一堵墙所需刷漆花费时间 + 1 的总和恰好满足 ∑(ti + 1) >= N，并且满足 N 减去其中任意的 ti + 1 后：∑(ti + 1) - ∀(t1 + 1) < N。
 * 也就是不会让付费油漆匠“多刷”一堵墙，在付费油漆匠工作的时间中，免费的油漆匠尽量去刷其他的墙。
 * 那么问题变成了0-1背包（或硬币兑换）问题的变形：从很多堵墙中选择一些堵墙，在满足：∑(ti + 1) >= N 的前提下，求最少的花费总和 COST。
 * 
 * 0-index:
 * 设 dp[i][j] 表示：只考虑选择前 i 堵墙的情况下，剩余还需要刷墙的数量为 j 时对应的最少 cost,
 * 我们需要求解的是 dp[N - 1][N], 表示前 N 堵墙中还有 N 堵墙需要刷时最少的 cost。
 * 状态转移(第 i 堵墙选不选为付费刷, 需要注意：不进行付费刷时，也不能够额外进行免费刷。所以在不选择付费刷的情况下，剩余要刷的墙的堵数是不会发生变化的)：
 * dp[i][j] = min(dp[i - 1][j - time[i] - 1] + cost[i], dp[i - 1][j])。
 * （对于记忆化搜索：递归边界：当 j < 0 时返回 0，表示已经可以把所有墙都刷完，不再需要额外的 cost。）
 * dp 初始值: 
 * dp 表的第一行中，dp[0][0] = 0（表示没有需要刷的墙时，cost 为 0）, 0 < j <= time[0] + 1 的部分都是 cost[0]（表示付费刷 1 堵墙，同时并行免费刷 time[0] 堵墙 的范围内，只需要花费 cost[0]）, 
 * 其余部分设置一个题目的 cost 总和上限(5 * 10^8)（表示只考虑付费刷第 0 号墙，同时在 time[0] 时间内免费刷其它墙，也不能把剩余墙刷完，cost 无限大）
 * 
 * 非优化空间 dp：
 * @param cost 
 * @param time 
 */
function paintWalls(cost: number[], time: number[]): number {
    const n = cost.length
    const dp: number[][] = Array.from({ length: n }, () => Array<number>(n + 1).fill(5e8))
    dp[0][0] = 0
    for (let j = 1; j <= time[0] + 1; j++) {
        dp[0][j] = cost[0]
    }
    for (let i = 1; i < n; i++) {
        dp[i][0] = 0
        for (let j = 1; j <= n; j++) {
            dp[i][j] = dp[i - 1][j]
            if (j >= time[i] + 1) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - time[i] - 1] + cost[i])
            } else {
                dp[i][j] = Math.min(dp[i][j], cost[i])  // 之前计算的只考虑前 i - 1 堵墙的最小 cost 需要与只考虑第 i 堵墙付费刷的方案进行比较
            }
        }
    }
    return dp[n - 1][n]
};

console.log(paintWalls([1,2,3,2], [1,2,3,2]))
console.log(paintWalls([2,3,4,2], [1,1,1,1]))
console.log(paintWalls([2,3,4,2,1,5], [1,1,1,1,5,1]))  // 1
console.log(paintWalls([8,7,5,15], [1,1,2,1]))  // 12
console.log(paintWalls([7,8,5,15], [1,1,2,1]))  // 12