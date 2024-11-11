/**
 * 区间 dp
 * 首先需要对 cuts 进行排序。
 * 设 f(i, j) 表示：在区间 [cuts[i], cuts[j]] 中进行切割的最小成本。
 * 那么状态转移方程是 f(i, j) = min(f(i, k) + f(k, j)) + cuts[j] - cuts[i], 其中 i + 1 <= k <= j - 1.
 * 递归入口：f(0, m - 1), m 是 cuts 的长度, 每次在范围内枚举 k, 将区间一分为二。
 * 递归出口：j - i <= 1, 此时区间中间没有可以进行切割的部分，返回 0.
 * 注意：不需要在 [0, n] 的区间进行计算，因为 cuts(合法的切割位置) 只是其中离散的很小的一部分，只需要在 cuts 上进行区间 dp 即可（保证了每次都能够命中合法的切割位置）。
 * @param n 
 * @param cuts 
 */
function minCost(n: number, cuts: number[]): number {
    cuts.push(0, n)  // 加入不可切割的首尾端，用于方便计算棍子长度
    cuts.sort((a, b) => a - b)

    const memo: Record<number, number> = {}
    
    function f(i: number, j: number): number {
        if (j - i <= 1) return 0

        const key = i * 100 + j
        if (memo[key] != undefined) return memo[key] 

        let minCost = Infinity
        for (let k = i + 1; k <= j - 1; k++) {
            minCost = Math.min(f(i, k) + f(k, j) + cuts[j] - cuts[i], minCost)
        }
        memo[key] = minCost < Infinity ? minCost : 0

        return memo[key]
    }

    return f(0, cuts.length - 1)
};

console.log(minCost(7, [1,3,4,5]))
console.log(minCost(9, [5,6,1,4,2]))