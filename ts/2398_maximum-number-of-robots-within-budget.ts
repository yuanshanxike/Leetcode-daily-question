/**
 * 需要计算的总开销为 max(chargeTimes) + k * sum(runningCosts)。
 *  因为只能选择连续的机器人运行，
 *  sum(runningCosts) 可以通过(预处理过的)前缀和快速求解，而 max(chargeTimes) 可以使用 滑动窗口 + 单调队列 来进行维护。
 *  对于给定的 k，可以通过滑动窗口来求解 min(max(chargeTimes) + k * sum(runningCosts))。
 *
 *  也可以预见，k 越小能找到更小的总开销值。
 *  证明：假设 k = k1（k1 > 1）时，通过滑动窗口求解得到的 min(max(chargeTimes) + k * sum(runningCosts)) 对应着 max(chargeTimes) == a, sum(runningCosts) == b，选择的连续数组为 [i, i + k1 - 1].
 *  此时，让 k - 1 得到 k1-1 个连续的机器人，我们一定可以从之前的 [i, i + k1 - 1] 连续数组中，删除“头”或“尾”, 此时 a 不一定会减小，但是 b 一定会减小（题目给定的两个数组都是正数），再加上 b 的倍数 k 也减小。
 *  所以能找到的最小总开销值是一定会减小的。
 *  所以总开销值与 k 相关，有单调性，可以通过二分查找求解找到 k。
 */
function maximumRobots(chargeTimes: number[], runningCosts: number[], budget: number): number {
    const n = chargeTimes.length
    const preSumRC = new Array(n + 1).fill(0)  // 前缀和数组
    for (let i = 0; i < n; i++) {
        preSumRC[i + 1] = preSumRC[i] + runningCosts[i]
    }

    // Leetcode 239 每次得到的值与前缀和结合计算，改一下返回值
    function minCostWindow(nums: number[], k: number): number {
        const n = nums.length
        const monoQue: number[] = []
        let l = 0, r = 0
        monoQue.push(0)
        let minCost: number = 1e15

        function pushNewElementIdx(i: number) {
            while (monoQue.length > 0 && nums[monoQue[monoQue.length - 1]] < nums[i]) {
                monoQue.pop()
            }
            monoQue.push(i)
        }

        while (r < n - 1 && r - l + 1 < k) {
            r++
            pushNewElementIdx(r)
        }
        minCost = Math.min(minCost, nums[monoQue[0]] + (preSumRC[r + 1] - preSumRC[l]) * k)

        while (r < n - 1) {
            l++, r++
            if (monoQue[0] < l) {
                monoQue.shift()
            }
            pushNewElementIdx(r)

            minCost = Math.min(minCost, nums[monoQue[0]] + (preSumRC[r + 1] - preSumRC[l]) * k)
        }
        return minCost;
    }

    let l = 0, r = n
    let ans = 0
    while (l < r + 1) {
        const k = Math.floor((l + r) / 2)
        const cost = minCostWindow(chargeTimes, k)
        if (cost <= budget) {
            ans = Math.max(ans, k)
        }

        if (cost < budget) {
            l = k + 1
        } else {
            r = k - 1
        }
    }
    return ans
};

console.log(maximumRobots([3,6,1,3,4], [2,1,3,4,5], 25))
console.log(maximumRobots([11,12,19], [10,8,7], 19))
console.log(maximumRobots([100000,100000,100], [5,485,1], 101))

/**
 * 上面的算法可以进一步优化：
 * 注意到上面的做法的核心其实是 单调队列 + 滑动窗口 计算总开销值，二分和前缀和只是辅助加快计算的。
 * 每次二分寻找的 k 作为滑动窗口的定长。
 * 如果将滑动窗口变为非定长的，结合单调队列，维护“窗口值”不会 budget，并记录滑动窗口长度最大值。
 * 就能在 O(n) 的复杂度内求解出答案。
 * 而且因为滑动窗口本身可以维护子数组的和，所以也不需要预先求出前缀和了。
 */
namespace L2398_faster {
    function maximumRobots(chargeTimes: number[], runningCosts: number[], budget: number): number {
        const n = chargeTimes.length
        const monoQue: number[] = []
        let l = 0 // 左闭右开
        let curSum: number = 0
        let maxK = 0

        function calculateCost(r: number): number {
            return monoQue.length > 0 ? chargeTimes[monoQue[0]] + curSum * (r - l) : 0
        }

        // 窗口建立 + 右移
        for (let r = 1; r <= n; r++) { // 右移窗口右指针
            while (monoQue.length > 0 && chargeTimes[monoQue[monoQue.length - 1]] < chargeTimes[r - 1]) {
                monoQue.pop()
            }
            monoQue.push(r - 1)
            curSum += runningCosts[r - 1]

            while (l < r - 1 && calculateCost(r) > budget) {
                curSum -= runningCosts[l++] // 右移窗口左指针 
                if (monoQue[0] < l) monoQue.shift() // 丢弃窗口左边的元素
            }

            if (calculateCost(r) <= budget) {
                maxK = Math.max(maxK, r - l)
            }
        }
        return maxK
    }

    console.log(maximumRobots([3, 6, 1, 3, 4], [2, 1, 3, 4, 5], 25))
    console.log(maximumRobots([11, 12, 19], [10, 8, 7], 19))
    console.log(maximumRobots([100000, 100000, 100], [5, 485, 1], 101))
}