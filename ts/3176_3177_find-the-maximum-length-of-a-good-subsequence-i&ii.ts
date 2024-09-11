/**
 * 动态规划(优化降低维度，在其中某个维度上维护最大值)：
 * （递推过程类似于 0/1 背包空间优化）
 * 定义 dp[x][j] 表示当前以 x 结尾的、至多有 j 对“相邻不同”数对的子序列的最大长度
 * @param nums 
 * @param k 
 */
function maximumLength(nums: number[], k: number): number {
    const dpMap = new Map<number, number[]>()
    const mx = Array(k + 1).fill(0)
    for (const num of nums) {
        if (!dpMap.has(num)) {
            dpMap.set(num, Array(k + 1).fill(0))
        }
        const dp = dpMap.get(num)!
        for (let j = k; j >= 0; j--) {
            dp[j] += 1  // 情况①：用与子序列末尾元素相同的子序列长度加上 1 来更新为新的子序列（如果当前末尾元素为 num 的子序列不存在，则作为新的子序列，长度为 1），要求“相邻不同”数对的对数不超过 j 对。
            if (j > 0) {
                dp[j] = Math.max(dp[j], mx[j - 1] + 1) // 情况②：当前与子序列末尾元素不同的“相邻不同”数对的对数不超过 j - 1 对的最长子序列长度加上 1。与上述情况① 比较取最大值。
                // 准确来说，当寻找情况① 时，不应该使用 mx[j - 1] + 1 来进行更新的。但如果此时子序列末尾元素与 num 相同的子序列就是最长的子序列长度，那么此时一定有 dp[j] + 1 >= mx[j - 1] + 1（因为此时有 mx[j - 1] == dp[num][j - 1]），所以这个错误的更新项并不能成功更新数据
            }
            mx[j] = Math.max(mx[j], dp[j])  // 维护 dp[⋅][j] 的最大值
        }
    }
    return mx[k];  // 至多有（不超过） k 对“相邻不同”数对的子序列的最大长度
};

console.log(maximumLength([1,2,1,1,3], 2));
console.log(maximumLength([1,2,3,4,5,1], 0));
console.log(maximumLength([1,2,2,4,2,3], 0));
console.log(maximumLength([1,2,2,4,1,1], 0));