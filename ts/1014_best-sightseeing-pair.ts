/**
 * 一个(对于本题)没用的优化：
 * 可以预见得分最高的观光组合一定是在最高评分到次高评分之间的区间内的。
 * 因为区间内的评分虽然比区间边界更低，但距离更短，可能通过缩短距离而获得更高的评分；
 * 而不可能是区间外的两个景点构成的组合，因为它们之间的距离更远，且评分更低，总得分只会更低。
 * 
 * 做法：
 * 在这个查找区间内，从左往右，对于每个遍历到的景点到其左边每个景点的距离都是线性增长的（每向后遍历一个数会增加 1 的距离）。
 * 这启发我们可以使用动态规划的思想来维护前 i 个数的“评分、距离之差”的最大值。具体来说：
 * dp[i] 表示前 i 个数分别的评分 - 其到第 i + 1 个数的距离的最大值。
 * 状态转移方程为 dp[i] = max(values[i] - 1, dp[i - 1] - 1)   // 表示计算新遇到的数字是否会更新“评分、距离之差”的最大值, 前 i 个元素的相对距离都会 +1
 * 每次计算状态的同时，维护 values[i] + dp[i - 1] 的最大值 total.
 * 遍历完成后的 total 就是答案。
 * 边界值：dp[-1] = 0 (total 的初始值为 values[0]), dp[0] = values[0] - 1
 * 
 * 优化：因为在 dp 数组中， dp[i] 与 total 的计算只与 dp[i - 1] 有关，dp 数组可以优化成一个滚动变量
 * @param values 
 */
function maxScoreSightseeingPair(values: number[]): number {
    const n = values.length
    const dp = Array(n)
    let total = values[0]
    dp[0] = values[0] - 1
    for (let i = 1; i < n; i++) {
        total = Math.max(total, values[i] + dp[i - 1])
        dp[i] = Math.max(dp[i - 1] - 1, values[i] - 1)
    }
    return total
};

console.log(maxScoreSightseeingPair([8,1,5,2,6]))
console.log(maxScoreSightseeingPair([1,2]))