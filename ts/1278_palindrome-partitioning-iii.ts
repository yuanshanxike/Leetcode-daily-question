/**
 * 动态规划，dp[i][cnt] 表示将 s[0..i] 分成 cnt 个回文串的最小修改次数。
 * 需要预处理填写 modifyCnt[i][j]，表示 s[i .. j] 变成回文字符串所需要的最少修改字符数。(时间复杂度：O(n^3)，可以像 132 题那样通过 dp 处理，可以把复杂度降低到 O(n^2)).
 * 状态转移方程：dp[i][cnt] = Math.min(dp[j][cnt - 1] + modifyCnt[j + 1][i]), 其中 0 <= j < i < n, 1 <= cnt <= k.
 * @param s 
 * @param k 
 * @returns 
 */
function palindromePartition(s: string, k: number): number {
    const n = s.length
    const modifyCnt = Array.from({ length: n }, () => Array(n).fill(0))
    // 预处理 modifyCnt[i][j]
    // for (let j = 0; j < n; j++) {
    //     for (let i = 0; i <= j; i++) {
    //         modifyCnt[i][j] = countPalindrome(s, i, j)
    //     }
    // }
    // 使用 dp 进行预处理
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            if (i === j) {
                modifyCnt[i][j] = 0
            } else if (i + 1 === j) {   // 相邻两个字符如果相等则构成回文字符串
                modifyCnt[i][j] = s[i] === s[j] ? 0 : 1
            } else {
                modifyCnt[i][j] = modifyCnt[i + 1][j - 1] + (s[i] === s[j] ? 0 : 1)
            }
        }
    }

    // 计算 dp 值
    const dp = Array.from({ length: n }, () => Array(k + 1).fill(Infinity))
    for (let i = 0; i < n; i++) {
        dp[i][1] = modifyCnt[0][i]  // 边界值
    }
    for (let cnt = 2; cnt <= k; cnt++) {
        for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
                dp[i][cnt] = Math.min(dp[i][cnt], dp[j][cnt - 1] + modifyCnt[j + 1][i])
            }
        }
    }
    return dp[n - 1][k]
};

function countPalindrome(s: string, left: number, right: number): number {
    let count = 0
    while (left < right) {
        if (s[left] !== s[right]) {
            count++
        }
        left++
        right--
    }
    return count
}

console.log(palindromePartition("abc", 2))
console.log(palindromePartition("aabbc", 3))
console.log(palindromePartition("leetcode", 8))

