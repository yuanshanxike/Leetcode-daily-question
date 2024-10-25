// 能通过 3180 的做法：

/**
 * 方法一：
 * ① 去重（相同元素一定不可能被加上两次，因为题目要求选取是要严格大于的）
 * ② 去重后的元素按从小到大排序（因为 rewardValues[i] 的值要大于 x（rewardValues[j], j < i）才能加入并标记 i）。
 * ③ 通过选或不选模型，在排序后的数组上进行记忆化搜索（假设当前的位置为 i）：
 * a.可以跳过选取 i，那么 x 的大小不变;
 * b.如果当前 x < rewardValues[i]，可以选取 i，x 变为 rewardValues[i].
 * 
 * dfs(i, x) 表示：在前 i 个 (0 ~ i - 1) 奖励值中已经按照规则正确选取了总奖励为 x 的奖励的基础上，剩余奖励值中能够获取的最大总奖励。
 * 
 * 递归入口： dfs(0, 0)
 * 表示一开始的总奖励为 0，需要从第 0 个奖励求解。
 * 
 * dp[i] 表示前 i 个元素能达成 x 的最大值.
 * 那么，dp[i] 要么是从前面最大的比它小的 x 加上 rewardValues[i] 转移过来的，
 * 对于每个 dp[i] 初始化为 rewardValues[i].
 * 状态转移方程： dp[i] = max( max(j in 0 ~ i-1 if (dp[j] < rewardValues[i]) dp[j] + rewardValues[i]), dp[i - 1], dp[i] ).
 * 需要求解的是 dp[n - 1]
 * @param rewardValues 
 */
// function maxTotalReward(rewardValues: number[]): number {
//     const set = new Set(rewardValues)  // 去重
//     rewardValues = Array.from(set)
//     rewardValues.sort((a, b) => a - b)
//     const n = rewardValues.length

//     const memo: Record<number, number> = {}

//     // 选或不选
//     function dfs(i: number, x: number): number {
//         if (i >= n) return x

//         const key = x * n + i
//         if (memo[key] != undefined) return memo[key]

//         let maxVal = dfs(i + 1, x)  // 不选
//         if (rewardValues[i] > x) {
//             maxVal = Math.max(maxVal, dfs(i + 1, rewardValues[i] + x)) // 可以选的时候尝试选
//         }
//         memo[key] = maxVal
//         return maxVal
//     }

//     return dfs(0, 0)
// };

/**
 * 方法二：动态规划 (01背包)
 * 依然是先去重、排序。
 * 根据题目描述规则，总奖励最大只可能是 2 * max(rewardValues) - 1
 * 表示 rewardValues 中最大的的奖励值 + (x = 最大奖励值 - 1)
 * dp[i][x] 表示只在前 i 个奖励值中进行选择，使得总奖励值到达 x 的方案是否存在。
 * 那么状态转移方程为：
 * ① dp[i][x] = dp[i - 1][x - rewardValues[i]] if (x - rewardValues[i] < rewardValues[i])
 * ② dp[i][x] ||= dp[i - 1][x]
 */
// function maxTotalReward(rewardValues: number[]): number {
//     const set = new Set(rewardValues)  // 去重
//     rewardValues = Array.from(set)
//     rewardValues.sort((a, b) => a - b)
//     const n = rewardValues.length
//     const dp: boolean[][] = Array.from({ length: n }, () => {
//         const arr = Array(rewardValues[n - 1] * 2).fill(false)
//         arr[0] = true  // dp[*][0] = true
//         return arr
//     })
//     dp[0][rewardValues[0]] = true
//     let ans = rewardValues[n - 1]  // 只选一个最大的奖励是符合要求的
//     for (let i = 1; i < n; i++) {
//         for (let x = 0; x <= rewardValues[i] * 2 - 1; x++) {  // 对于前 i 个奖励，x 不可能超过 rewardValues[i] * 2 - 1
//             const from = x - rewardValues[i]
//             if (from >= 0 && from < rewardValues[i]) {
//                 dp[i][x] = dp[i - 1][from]
//             }
//             dp[i][x] ||= dp[i - 1][x]

//             if (dp[i][x]) ans = Math.max(ans, x)
//         }
//     }
//     return ans
// }


// 可以通过 3181 的做法：

/**
 * 在上述“方法二”的基础上继续优化，
 * 将上述的 01背包 dp 改写成数位 dp，以降低一个维度。
 * 因为数位非常大，普通的数据类型装不下，需要使用 bigInt。
 * 将 dp[i] 对应数组中的值(true/false) 看成 (1/0).
 * 那么 dp[i] 就可以等效成一个位数很长的二进制数。 
 * 
 * ① dp[i][x] ||= dp[i - 1][x] 通过滚动数组实现的过程已被自动优化；
 * ② dp[i][x] = dp[i - 1][x - rewardValues[i]] 降低一个维度之后通过滚动数组实现，然后因为已经把数组压缩到了 BigInt，
 * 可以直接通过将前一个已经计算好的 BigInt 变量的低 rewardValues[i] 位（这里相当于是限定当前 x 的范围在 [0, rewardValues[i] - 1]）左移 rewardValues[i] 位与其自身进行位或运算(|)，运算结果可以等效替换 dp[i][x].
 */
function maxTotalReward(rewardValues: number[]): number {
    const set = new Set(rewardValues)  // 去重
    rewardValues = Array.from(set)
    rewardValues.sort((a, b) => a - b)
    const n = rewardValues.length
    const dp0 = Array(rewardValues[0] + 1).fill(0)  // 只需要与初始 state 二进制的有效位数等长即可
    dp0[0] = 1
    dp0[rewardValues[0]] = 1
    let state = BigInt('0b' + dp0.reverse().join(''))  // 将初始数组 dp[0] 压缩到一个二进制的 bigInt 数字
    for (let i = 1; i < n; i++) {
        const v = BigInt(rewardValues[i])
        state |= (state & ((1n << v) - 1n)) << v  // ②
    }

    return state.toString(2).length - 1  // 0-idx. 需要返回的是最高位为 1 的位置，通过将转化为二进制字符串的长度 - 1 得到 1-idx 的最高位下标
}

console.log(maxTotalReward([1,1,3,3]))
console.log(maxTotalReward([1,6,4,3,2]))
console.log(maxTotalReward([1,6]))