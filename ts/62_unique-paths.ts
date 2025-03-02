function uniquePaths(m: number, n: number): number {
    const dp = Array.from({ length: m }, () => Array(n).fill(0))
    dp[0][0] = 1

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i == 0 && j == 0) continue
            dp[i][j] = (dp[i - 1]?.[j] ?? 0) + (dp[i][j - 1] ?? 0)
        }
    }

    return dp[m - 1][n - 1]
};

console.log(uniquePaths(3, 7))
console.log(uniquePaths(3, 2))
console.log(uniquePaths(7, 3))
console.log(uniquePaths(3, 3))