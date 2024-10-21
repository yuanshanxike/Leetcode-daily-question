/**
 * dp[i][j] 表示 [0...i] 的范围内恰好拥有 j 个逆序对的排列数量。假设 [0...i - 1] 中有 m 个大于下标 i 处的元素。那么状态转移方程为：
 * dp[i][j] = (0 <= m <= min(i, j))Σ dp[i - 1][j - m]
 * 
 * 用前缀和优化时间复杂度
 * 
 * @param n 
 * @param k 
 */
// function kInversePairs(n: number, k: number): number {
//     const mod = 1e9 + 7
//     const dp = Array.from({ length: n }, () => Array(k + 1).fill(0))
//     dp[0][0] = 1
//     for (let i = 1; i < n; i++) {
//         // 用前缀和优化下一个循环中的嵌套循环
//         for (let j = 1; j <= k; j++) {
//             dp[i - 1][j] = (dp[i - 1][j] + dp[i - 1][j - 1]) % mod
//         }

//         for (let j = 0; j <= k; j++) {
//             // O(min(n, k)) 的嵌套循环，乘上外面的循环复杂度就是 O(n*k*min(n, k)) 
//             // for (let m = 0; m <= Math.min(i, j); m++) {
//             //     dp[i][j] = (dp[i][j] + dp[i - 1][j - m]) % mod
//             // }

//             // 利用前缀和计算区间和，O(1) 的复杂度，乘上外面的循环复杂度就是 O(n*k)
//             dp[i][j] = (dp[i - 1][j] - (j - Math.min(i, j) > 0 ? dp[i - 1][j - Math.min(i, j) - 1] : 0) + mod) % mod
//         }
//     }
//     return dp[n - 1][k]
// };

/**
 * 在上面做法的基础上，
 * 将二维 dp 数组优化成滚动数组，降低空间复杂度
 * @param n 
 * @param k 
 */
function kInversePairs(n: number, k: number): number {
    const mod = 1e9 + 7
    let dp0 = Array(k + 1).fill(0)
    dp0[0] = 1
    for (let i = 1; i < n; i++) {
        const dp = Array(k + 1).fill(0)
        for (let j = 1; j <= k; j++) {
            dp0[j] = (dp0[j] + dp0[j - 1]) % mod
        }

        for (let j = 0; j <= k; j++) {
            dp[j] = (dp0[j] - (j - Math.min(i, j) > 0 ? dp0[j - Math.min(i, j) - 1] : 0) + mod) % mod
        }

        dp0 = dp
    }
    return dp0[k]
}

console.log(kInversePairs(3, 0))
console.log(kInversePairs(3, 1))
console.log(kInversePairs(1000, 1000))