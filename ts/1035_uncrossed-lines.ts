/**
 * 要保证相同数字连线后不会有线相交，先来研究一下声明情况下会使得线相交。
 * 从 num1 和 num2 中选择的相同数字构成的两个序列，如果顺序是一致的，就不会出现两条连线相交；
 * 如果任意交换上述两个序列的其中一个序列的两个元素，就会出现至少一个交点。
 * 
 * 如果这个问题和 “1143.最长公共子序列” 中描述的问题是完全一致的。算是一道经典的动态规划题目。
 * 
 * 定义 dp[i][j] 表示 只考虑第一个数组中的前 i 项与第二个数组的前 j 项时，存在的最大不相交的相同元素连线数量。
 * exitLine 取 0 和 1，表示当前的 nums1 中的第 i 个数和 nums2 中的第 j 个数是否相同，相同则可以直接连线取 1，而不同时则连不了线取 0.
 * 因为 dp 定义的连线都是合法的（不存在两线相交的情况），所以当需要把 exitLine 加上时，要求的 dp 只能是 dp[i - 1][j - 1]（不能包含 exitLine 连接的两个端点）。
 * 而 dp 的定义是两个数组的前 i 项和前 j 项中存在合法连线数量的最大值，所以可以确定 状态转移方程 为：
 * dp[i][j] = max(dp[i - 1][j - 1] + exitLine, dp[i - 1][j], dp[i][j - 1]).
 * 而当 i 和 j 中至少有一个为 1 时对应着边界情况：dp[i][j] = 1 or 0, 没找到 exitLine 为 1 时就是 0，找到后都是 1.
 * @param nums1 
 * @param nums2 
 * @returns 
 */
function maxUncrossedLines(nums1: number[], nums2: number[]): number {
    const m = nums1.length, n = nums2.length
    const dp = Array.from({ length: m }, () => Array(n).fill(0))
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const exitLine = nums1[i] == nums2[j] ? 1 : 0
            if (i != 0 && j != 0) dp[i][j] = Math.max(dp[i - 1][j - 1] + exitLine, dp[i - 1][j], dp[i][j - 1])
            else {  // i == 0 || j == 0
                if (i > 0) { // j == 0
                    dp[i][j] = Math.max(dp[i - 1][j], exitLine)
                }
                else if (j > 0) { // i == 0
                    dp[i][j] = Math.max(dp[i][j - 1], exitLine)
                }
                else { // i == 0 && j == 0
                    dp[i][j] = exitLine
                }
            }
        }
    }
    return dp[m - 1][n - 1]
};

console.log(maxUncrossedLines([1,4,2], [1,2,4]))
console.log(maxUncrossedLines([2,5,1,2,5], [10,5,2,1,5,2]))
console.log(maxUncrossedLines([1,3,7,1,7,5], [1,9,2,5,1]))