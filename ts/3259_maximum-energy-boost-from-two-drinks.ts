/**
 * 动态规划：dp[0/1][i] 表示第 i 个小时选择喝 A/B 时，能获取到的能量最大值。
 * 状态转移方程：
 * dp[0][i] = max(dp[0][i - 1], dp[1][i - 2]) + energyDrinkA[i]
 * dp[1][i] = max(dp[1][i - 1], dp[0][i - 2]) + energyDrinkB[i]
 * 初始状态：
 * dp[0][0] = energyDrinkA[0], dp[1][0] = energyDrinkB[0],
 * dp[0][1] = energyDrinkA[0] + energyDrinkA[1], dp[1][1] = energyDrinkB[0] + energyDrinkB[1].
 * 求解问题：max(dp[0][n - 1], dp[1][n - 1])
 * @param energyDrinkA 
 * @param energyDrinkB 
 */
function maxEnergyBoost(energyDrinkA: number[], energyDrinkB: number[]): number {
    const n = energyDrinkA.length
    const dp: number[][] = Array.from({ length: 2 }, () => Array(n - 1).fill(0))
    dp[0][0] = energyDrinkA[0], dp[1][0] = energyDrinkB[0],
    dp[0][1] = energyDrinkA[0] + energyDrinkA[1], dp[1][1] = energyDrinkB[0] + energyDrinkB[1]
    for (let i = 2; i < n; i++) {
        dp[0][i] = Math.max(dp[0][i - 1], dp[1][i - 2]) + energyDrinkA[i]
        dp[1][i] = Math.max(dp[1][i - 1], dp[0][i - 2]) + energyDrinkB[i]
    }
    return Math.max(dp[0][n - 1], dp[1][n - 1])
};

console.log(maxEnergyBoost([1,3,1], [3,1,1]))
console.log(maxEnergyBoost([4,1,1], [1,1,3]))