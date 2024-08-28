/**
 * 令 dp[i] 表示前 i - 1 (0-index)个字符构成的字符串所能划分的最少平衡子字符串的数量。
 * 显然可以得出：边界（初始）值：dp[0] = 0, dp[1] = 1。
 * 状态转移方程：dp[i] = min(dp[i - 1] + 1 (第 i-1 个字符本身作为一个平衡字符串), dp[i - 2] + 1 (第 i-2 和 i-1 两个字符作为平衡字符串), 以及 dp[j = 0 ~ i-3] 中第 j 个字符到第 i-1 个字符能够构成一个平衡子字符串的情况对应的 dp[j] + 1)
 * 需要求解的是 dp[n]（表示前 n - 1 个字符构成的字符串所能划分的最少平衡子字符串的数量）
 * 
 * 时间复杂度: O(n^2)
 * 
 * *为何不用考虑以第 i - 1 个字符作为最后一位的不能构成平衡字符串的子字符串？
 * 原因：如果当前遍历到的 j，[j, i-1] 的后缀字符串如果不是一个平衡字符串，意味着需要将这一段字符串拆分成两段或更多段的平衡字符串，而由于我们是从后往前检查遍历的，
 * 此时拆分的平衡子字符串的最后一段（包含第 i-1 个字符的）的第一个字符，记为 k，k 在 (j, i-1] 范围内。而在 (j, i-1] 这一范围内任选一个能与第 i-1 个字符连成平衡子字符串的位置，
 * 这些情况下的最少平衡子字符串划分数量我们已经在之前计算过了，不需要再重复计算。
 * 再换个角度，每次在当前的字符串的最后一位添加一个字符，能够影响到我们统计数量的只有后缀平衡字符串（因为我们只统计了最少划分平衡字符串的数量），所以包含最后一个字符的后缀非平衡字符串是不需要考虑的。
 * 
 * 寻找平衡字符串的优化：设子串中有 k 种字母，字母出现次数的最大值为 maxCnt。子串是平衡的，当且仅当子串长度 i−j+1 等于 k⋅maxCnt。
 * @param s 
 */
function minimumSubstringsInPartition(s: string): number {
    const n = s.length
    const cnt: number[] = Array(26).fill(0)  // 26 个小写英文字母（出现次数）计数
    const include = new Set<string>()  // 被统计上的不同字符种类集合 (使用优化写法时，可以不要这个 set 统计不同字母的种数，改为当 cnt[chrIdx] 由 0 变为 1 时 k++)
    let maxCnt = 0  // 记录同种类字母出现的最大次数来优化
    const dp: number[] = Array(n + 1).fill(n) // 上限是每个元素划分成 1 组，共计 n 组
    dp[0] = 0 ,dp[1] = 1

    // function checkBalance(): boolean {
    //     if (include.size <= 1) return true
    //     else {
    //         let num = 0
    //         for (const c of include) {
    //             if (num == 0) num = cnt[c.charCodeAt(0) - 'a'.charCodeAt(0)]
    //             else if (cnt[c.charCodeAt(0) - 'a'.charCodeAt(0)] != num) {
    //                 return false
    //             }
    //         }
    //         return true
    //     } 
    // }

    // 优化平衡字符串检查方法
    function checkBalance(strLen: number): boolean {
        const k = include.size
        return k * maxCnt == strLen
    }

    for (let i = 2; i <= n; i++) {
        cnt.fill(0)
        include.clear()
        maxCnt = 0
        for (let j = i - 1; j >= 0; j--) {
            // count
            const chrIdx = s[j].charCodeAt(0) - 'a'.charCodeAt(0)
            cnt[chrIdx]++
            include.add(s[j])
            maxCnt = Math.max(maxCnt, cnt[chrIdx])

            // check
            if (checkBalance(i - j)) {
                // j 到 i 的字符串能够构成平衡字符串
                dp[i] = Math.min(dp[j] + 1, dp[i])
            }
        }
    }

    return dp[n]
};

console.log(minimumSubstringsInPartition('fabccddg'))  // 3
console.log(minimumSubstringsInPartition('abababaccddb'))  // 2
console.log(minimumSubstringsInPartition('ababcc'))   // 1