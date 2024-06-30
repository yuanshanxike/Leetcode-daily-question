// /**
//  * 原始时间复杂度：O(2^n)，可以使用记忆化进行剪枝。
//  * 注意：memory(HashMap) 的 key 不能使用 [pos: number, remain: number] 这样的元组（或者叫数组），
//  * 在 get、set、has 时会显著消耗性能
//  * @param nums 
//  * @param target 
//  * @returns 
//  */
// function findTargetSumWays(nums: number[], target: number): number {
//     const n = nums.length
//     const memory = new Map<string, number>()
//     function getKey(pos: number, remain: number) {
//         return pos + ',' + remain
//     }
//     function dfs(pos: number, remain: number): number {
//         const key = getKey(pos, remain)
//         if (memory.has(key)) return memory.get(key)!
//         if (pos == n) return remain == 0 ? 1 : 0
//         if (nums[pos] == 0) {
//             var ways = dfs(pos + 1, remain) * 2
//         } else {
//             ways = dfs(pos + 1, remain - nums[pos]) // 正数 case
//             ways += dfs(pos + 1, remain + nums[pos]) // 负数 case
//         }
//         memory.set(key, ways)
//         return ways
//     }
//     return dfs(0, target)
// };

/**
 * 另辟蹊径 + 优化：将问题转化为选或不选的问题：
 * 数组中的每个元素，要么为正、要么为负。使用交换律和结合律，将所有正数优先相加得到 sumPos，所有负数优先相加得到 sumNeg,
 * 数组中的 0 相加总是等于 0，如果将原数组分成两个集合，一个只能有正数或0，一个只能有负数或0。
 * 那么这些 0 要么放在第一个集合，要么放在第二个集合，假设一共有 m 个 0，那么 0 的放法有 2^m 种。
 * 
 * 这些数值满足以下关系：
 * sum = abs(sumPos) + abs(sumNeg)，
 * 其中 abs(sumPos) = sumPos, abs(sumNeg) = sum - sumPos
 * 根据题意有 sumPos + sumNeg = target
 * => sumPos - abs(sumNeg) = target
 * => sumPos - (sum - sumPos) = target
 * => sumPos = (sum + target) / 2
 * 
 * 所以现在把问题转化为了：在 nums 中找出一些非负数，使得他们的和为 sumPos，求能找出多少种这样的组合？
 * (找出的组合的数字前面加上“＋”，其余非零的数字前面加上“-”，就是原问题的描述)
 * 
 * 对于“能找出多少种这样的组合”的问题，是一种选或不选的问题。
 * 直接暴力求解的时间复杂度是 2^n，套用 0-1 背包 dp 的模型进行优化，时间复杂度就能降低到平方的级别。
 * 定义：dp[i][t] 表示前 i 个元素中，和为 t 的非空集合个数。
 * 那么这些非空集合就可能会分为 包含第 i 个元素的 和 不包含第 i 个元素的 两种。
 * 那么状态转移方程可以表示为 dp[i][t] = dp[i-1][t] + dp[i-1][t - nums[i]]。
 * 
 * 时间复杂度：O(n*target)
 * 
 * *空间复杂度和背包问题一样，可以优化压缩到 O(target)
 * 
 * @param nums 
 * @param target 
 */
function findTargetSumWays(nums: number[], target: number): number {
    const n = nums.length
    let m = 0
    const sum = nums.reduce((pre: number, cur: number) => {
        if (cur == 0) m++  // 求和时顺便统计 0 的个数 
        return pre + cur
    }, 0)
    const subarraySum = (sum + target) / 2
    if (subarraySum != Math.floor(subarraySum)) return 0 // subarraySum 如果为非整数，我们不能通过正整数元素相加得到，直接排除所有方案
    if (subarraySum > sum || subarraySum < 0) return 0 // 子集和大于原数组和或者小于0的情况也不存在，直接返回 0
    if (subarraySum == 0 || subarraySum == sum) {
        return m == 0 ? 1 // 数组中没有 0，且数组和等于 target 或者 等于其相反数的情况，需要全部元素同号，对应着一种情况
            : 2 ** m // m > 0，数组中含有 0，且数组和等于 target 或者 等于其相反数的情况，需要非 0 元素全部元素同号。此时所有的 0 既可以分配为正也可以分配为负，对应着 2^m 种情况
    }
    const dp: number[][] = Array.from({ length: n + 1 }, () => Array<number>(subarraySum + 1).fill(0))
    dp[0][0] = 1 // 初始值：表示空集的和为 0 (对应着原问题中数组元素全是负数的情况)
    // 状态转移（递推）
    for (let i = 0; i < n; i++) {
        for (let t = 0; t <= subarraySum; t++) {
            dp[i + 1][t] = dp[i][t]
            if (t >= nums[i]) {
                dp[i + 1][t] += dp[i][t - nums[i]]
            }
        }
    }
    return dp[n][subarraySum]
}

console.log(findTargetSumWays([1, 1, 1, 1, 1], 3))
console.log(findTargetSumWays([1], 1))
console.log(findTargetSumWays([25, 33, 27, 23, 46, 16, 10, 27, 33, 2, 12, 2, 29, 44, 49, 40, 32, 46, 7, 50], 4))
console.log(findTargetSumWays([7, 7, 17, 1, 46, 38, 8, 32, 35, 18, 43, 48, 9, 17, 6, 6, 42, 10, 2, 0], 38))
console.log(findTargetSumWays([7, 7, 17, 1, 46, 38, 8, 32, 35, 18, 43, 48, 9, 17, 6, 6, 42, 0, 0, 0], 38))
console.log(findTargetSumWays([7, 7, 17, 1, 46, 38, 0, 0, 0, 18, 43, 48, 9, 17, 6, 6, 42, 0, 0, 0], 37))
console.log(findTargetSumWays([0, 0, 0, 0], 0))
console.log(findTargetSumWays([0, 0, 0, 0], 1))
console.log(findTargetSumWays([1000], -1000))
console.log(findTargetSumWays([100], -200))