/**
 * 预处理回文字符串（二维动态规划） + 一维动态规划
 * 时间复杂度 O(n^2)
 * 
 * 如果不使用 dp 预处理回文字符串，直接使用一维 dp 每次循环使用 isPalindrome 判断字符串回文，则时间复杂度会高达 O(n^3).
 * @param s 
 * @returns 
 */
function minCut(s: string): number {
    const n = s.length
    const palDp: Boolean[][] = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i == j))  // palDp[i][j] 表示 s[j .. i] 是否为回文字符串，其中每个字符都是单独的回文字符串

    // 预处理找出所有回文字符串
    for (let i = 1; i < n; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (i - 1 == j) {  // 相邻两个字符如果相等则构成回文字符串
                palDp[i][j] = s[j] == s[i]
            } else if (palDp[i - 1][j + 1]) {  // 如果 s[j + 1 .. i-1] 是回文字符串，则比较 s[j] 和 s[i] 是否相等
                palDp[i][j] = s[j] == s[i]
            }
        }
    }

    // 一维 dp
    const dp = Array.from({ length: n }, (_, k) => k)  // dp[i] 表示字符串 s[0, i] 的最小分割次数。 初始化 dp[i] 为 i，表示前 i + 1 个元素最多需要分割 i 次（每个字符都是单独的回文字符串）

    for (let i = 0; i < n; i++) {
        if (palDp[i][0]) {  // 如果当前的前缀构成回文字符串，则不需要切
            dp[i] = 0
        } else {
            // 枚举能够使得 s[j+1 .. i] 构成回文串的切割点 j，计算当前前缀需要切割的最小值
            for (let j = 0; j < i; j++) {
                if (palDp[i][j + 1]) {
                    dp[i] = Math.min(dp[i], dp[j] + 1)  // 计算从第 j 个元素之后切 1 刀（切割的后缀字符串回文）后的最少切割数，维护这个切割数的最小值
                }
            }
        }
    }

    return dp[n - 1]
};

console.log(minCut("aab"))
console.log(minCut("a"))
console.log(minCut("ab"))