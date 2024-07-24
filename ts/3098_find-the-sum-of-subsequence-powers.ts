function sumOfPowers(nums: number[], k: number): number {
    const n = nums.length
    const mod = BigInt(1e9 + 7)
    nums.sort((a, b) => a - b)  // 排序后，子序列的能量（子序列中 任意 两个元素的差值绝对值的 最小值）一定存在于相邻的两个数之间
    const memory: Map<bigint, bigint> = new Map()
    // i: 当前处理到的元素下标；j：上一个选择的元素下标（初始为 n）；
    // k: 还需要的元素数量；   mi：当前最小差值（子序列的能量）
    function dfs(i: number, j: number, k: number, mi: number): bigint {
        if (n - i < k) return BigInt(0) // 剩余的元素不够选满 k 了
        if (i == n) {
            if (k == 0) return BigInt(mi) // 选择完成
            return BigInt(0)  // 处理结束，但没有选够
        }
        const key = (BigInt(mi) << BigInt(18)) |  // mi 可能很大，所以放在比特桶的高位，其余数值的上限都是 50，6 个比特位就够了
            (BigInt(i) << BigInt(12)) |
            (BigInt(j) << BigInt(6)) |
            BigInt(k)
        if (memory.has(key)) return memory.get(key)!
        // 不选 i
        let ans = dfs(i + 1, j, k, mi)
        // 选 i
        if (j == n) { // 之前还没有选过元素
            ans += dfs(i + 1, i, k - 1, mi)
        } else {
            ans += dfs(i + 1, i, k - 1, Math.min(mi, nums[i] - nums[j]))
        }
        ans %= mod
        memory.set(key, ans)
        return ans
    }

    // 递归入口：
    return Number(dfs(0, n, k, 5e9))
}

console.log(sumOfPowers([1,2,3,4], 3))
console.log(sumOfPowers([2,2], 2))
console.log(sumOfPowers([4,3,-1], 2))
