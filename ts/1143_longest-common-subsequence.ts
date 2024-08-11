/**动态规划，和 “1035. 不相交的线” 完全一致 */
function longestCommonSubsequence(text1: string, text2: string): number {
    const m = text1.length, n = text2.length
    const dp = Array.from({ length: m }, () => Array(n).fill(0))
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const sameChr = text1[i] == text2[j] ? 1 : 0
            if (i != 0 && j != 0) dp[i][j] = Math.max(dp[i - 1][j - 1] + sameChr, dp[i - 1][j], dp[i][j - 1])
            else {  // i == 0 || j == 0
                if (i > 0) { // j == 0
                    dp[i][j] = Math.max(dp[i - 1][j], sameChr)
                }
                else if (j > 0) { // i == 0
                    dp[i][j] = Math.max(dp[i][j - 1], sameChr)
                }
                else { // i == 0 && j == 0
                    dp[i][j] = sameChr
                }
            }
        }
    }
    return dp[m - 1][n - 1]
};

console.log(longestCommonSubsequence('abcde', 'ace'))
console.log(longestCommonSubsequence('abc', 'abc'))
console.log(longestCommonSubsequence('abc', 'def'))