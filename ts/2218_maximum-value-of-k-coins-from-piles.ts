/**
 * 前缀和优化的二维 dp
 * 定义：dp[i][j] 表示从前 i 个栈中取 j 个硬币的最大值
 * @param piles 
 * @param k 
 */
function maxValueOfCoins(piles: number[][], k: number): number {
    const n = piles.length
    const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0))
    for (let i = 0; i < n; i++) {
        const pile = piles[i]
        for (let j = 0; j <= k; j++) {
            dp[i + 1][j] = dp[i][j]  // 不取第 i 个栈中的硬币
            let cur = 0
            for (let x = 0; x < Math.min(j, pile.length); x++) {  // 枚举取第 i 个栈中的 x 个硬币
                cur += pile[x]  // 顺便计算前缀和
                dp[i + 1][j] = Math.max(dp[i + 1][j], dp[i][j - x - 1] + cur)
            }
        }
    }
    return dp[n][k]
};

console.log(maxValueOfCoins([[1, 100, 3], [7, 8, 9]], 2))  // 101
console.log(maxValueOfCoins([[100],[100],[100],[100],[100],[100],[1,1,1,1,1,1,700]], 7))  // 706