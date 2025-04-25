/**
 * 模 k 分组 + 组内 dp 计算可行组合数量 + 组间组合数量使用乘法原理
 * 
 * 两个数如果 % k 得到的结果不同，那么它们之间的绝对差一定不会等于 k。
 * 
 * 设 a 为长度为 m 的一个 nums 中数模 k 后的分组。
 * 定义 f[i+1] 表示在 a[0] 到 a[i] 中选数的方案数。
 * 
 * 时间复杂度为 O(n * log(n))，主要瓶颈在排序上
 * @param nums 
 * @param k 
 */
function beautifulSubsets(nums: number[], k: number): number {
    const n = nums.length
    nums.sort((a, b) => a - b)
    const groups = new Map<number, Map<number, number>>()
    
    // 分组：元素按模k的值分组，同一组内的元素可能形成差k的链
    for (const num of nums) {
        const mod = num % k
        if (!groups.has(mod)) {
            groups.set(mod, new Map<number, number>())
        }
        const g = groups.get(mod)!
        if (!g.has(num)) {
            g.set(num, 1)
        } else {
            g.set(num, g.get(num)! + 1)
        }
    }

    let ans = 1
    for (const [mod, group] of groups) {
        // 处理每个组，计算该组的合法子集数目
        let m = group.size
        let f = Array(m + 1).fill(0)
        f[0] = 1  // 空集也算是这个分组中的有效组合（因为可以不选该组合中的数字）
        let i = 1, pre = 0
        for (const [cur, cnt] of group) {
            if (i > 1 && cur - pre == k) {
                f[i] = f[i - 1] + f[i - 2] * (2 ** cnt - 1)  // 两种 case（加法原理）: f[i+1] = f[i] + f[i−1] * (2^ci − 1)
            } else {
                f[i] = f[i - 1] << cnt  // f[i+1] = f[i] * 2^ci
            }
            pre = cur
            i++
        }
        ans *= f[m] // 每组方案数相乘
    }
    return ans - 1  // 减去所有分组全选空集的情况
};

console.log(beautifulSubsets([2,4,6], 2))
console.log(beautifulSubsets([1], 1))
console.log(beautifulSubsets([4,2,5,9,10,3], 1))
console.log(beautifulSubsets([10,4,5,7,2,1], 3))