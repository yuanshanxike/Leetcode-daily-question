/**
 * 根据游戏规则，不管起始点 aliceIndex 的二进制值 nums[aliceIndex] 是 0 还是 1.
 * 如果其左边或者右边相邻的一位至少有一个 1，那其 第一次 操作就是将其左边或者右边的值通过规则 2 挪到自己的脚下；
 * 如果其左边或者右边相邻的一位都是 0，分类讨论：
 * 如果 maxChanges > 0, 那其需要至少两次操作才能使得 Alice 能拾起一个 1，具体为第一次在相邻的下标执行操作 1，第二次执行操作 2 把第一次操作生成的 1 挪过来。
 * 如果 maxChanges == 0, 那需要找到 aliceIndex 左边或者右边最近的 1（假设下标为 nextIndex）。那么需要执行 |nextIndex - aliceIndex| 次操作 2，将这个 1 挪过来。
 * 
 * 所以可以得出结论：在相邻的一位有 1 时，优先进行操作 2 将这个 1 挪过来；
 * 如果相邻位置没有 1 时，如果 changes 的次数有剩余，优先执行在其相邻位置生成 1 然后挪过来的操作，此时 changes - 1, 需要两次操作；
 * 否则，将距离其最近的 1 挪过来，需要操作的次数等于移动的距离。
 * 
 * 那么现在问题就变成了：如何确定 aliceIndex 这个初始位置，使得总的操作次数最少？
 * 
 * 其实更进一步地，我们可以把 生成 1 后再移过来 和 把原本就存在数组中的 1 移过来 分成两个步骤来单独进行计算。
 * 首先需要明确的是 k 和 数组中连续序列长度 之间的关系，比如 k 的值如果小于 3，而数组中连续序列长度大于或等于 3，此时只需要移动相邻的 1 过来，而不需要使用到 changes。
 * 接着，是需要使用到 changes 的情况，分为是否能把 maxChanges 都用完，
 * 用不完时，仅需移动相邻位置的 1 ，然后剩下的使用生成移动来达到目标；
 * 都用完时，不够的还需要取更远位置的 1 移动过来以达成目标，这时候，就可以把 纯移动 和 生成再移动 分为两个步骤来计算：
 * 首先，maxChanges 肯定会被用完，所以对应这 maxChanges * 2 次操作。这时，还需要移动 k - maxChanges 个 1 才能够达成目标。
 * 这就需要计算出距离 aliceIndex 最近的 k - maxChanges 个 1 到 aliceIndex 的距离之和。
 * 两个步骤的数值相加就是一个可能的答案。
 * 需要枚举以每个 1 为 aliceIndex 时，通过以上两个步骤算出的最小值，就是答案。（这可以通过滑动窗口来解决）
 * 
 * @param nums 
 * @param k 
 * @param maxChanges 
 */
function minimumMoves(nums: number[], k: number, maxChanges: number): number {
    const n = nums.length
    let max1series = 0
    let each1serise = 0
    nums.forEach((val, idx) => {
        if (val == 0) {
            max1series = Math.max(each1serise, max1series)
            each1serise = 0
        } else {
            if (idx > 0 && nums[idx - 1] == 1) each1serise++
            else each1serise = 1
        }
    })
    max1series = Math.max(each1serise, max1series)
    if (max1series == 0) return k * 2  // 全为 0
    const seriesLen = Math.min(max1series, 3)
    if (k <= seriesLen) return k - 1 // 不需要动用 changes 就能 cover 目标
    if (seriesLen + maxChanges >= k) return seriesLen - 1 + (k - seriesLen) * 2 // 通过操作移动相邻的元素到脚下，以及不断在相邻位置新建 1 在移过来的两步操作。这两种操作就能够完成目标

    /**
     * 预处理每个 1 到其前面所有的 1 和 到其后面所有的 1 的距离之和：
     * 使用前缀和的思想，可以在访问到每个节点（值为 1 的元素）时，累加其前面前一个节点的“前面所有的 1 的距离之和” 再加上 当前节点的下标 i 倍的与前一个节点的距离，
     * 结果就是当前节点到其前面所有节点的距离之和。
     * (正序和倒序各计算一次)
     */
    const preAllSum: [sum: number, dist: number][] = [] // sum: 前/后缀和，dist: 当前的 1 距离数组 nums 第一个元素 nums[0] 的距离
    const sufAllSum: [sum: number, dist: number][] = []
    for (let i = 0; i < n; i++) {
        if (nums[i] == 1) {
            if (!preAllSum.length) preAllSum.push([0, i])
            else {
                const lastIdx = preAllSum.length - 1  // 前缀和数组中的 lastIndex
                const [preSum, dist] = preAllSum[lastIdx]
                preAllSum.push([preSum + (lastIdx + 1) * (i - dist), i])
            }
        }
    }
    for (let i = n - 1; i >= 0; i--) {
        if (nums[i] == 1) {
            if (!sufAllSum.length) sufAllSum.push([0, i])
            else {
                const lastIdx = sufAllSum.length - 1  // 后缀和数组中的 lastIndex
                const [sufSum, dist] = sufAllSum[lastIdx]
                sufAllSum.push([sufSum + (lastIdx + 1) * (dist - i), i])  // 和前缀和不同的是：遍历时所遇到的 dist 是从大到小的，两个节点间的距离计算应该颠倒过来
            }
        }
    }

    // 每次滑动且符合条件后暴力计算，在大数据且极端的情况会达到 O(n^2) 的复杂度，会 TLE

    // function caculateCenterOne(sum: number, l: number, r: number): number {
    //     const halfSum = Math.ceil(sum / 2)
    //     let center = 0
    //     let cnt = 0
    //     for(let i = l; i <= r; i++) {
    //         if (nums[i] == 1) cnt++
    //         if (cnt == halfSum) {
    //             center = i
    //             break
    //         }
    //     }
    //     return center
    // }

    // // 测算中心到两端，离各个 1 之间的距离，从小到大累加
    // function measureCenterDistanceSum(center: number, l: number, r: number): number {
    //     let sumDistance = 0
    //     for (let d = 1; d <= Math.max(r - center, center - l); d++) {
    //         // 从中心向两端扩散
    //         if (center - d >= l && nums[center - d] == 1) sumDistance += d
    //         if (center - d <= r && nums[center + d] == 1) sumDistance += d
    //     }
    //     return sumDistance
    // }

    let sumDistance = (10 ** 10) + 1

    // 滑动窗口
    // let l = 0, r = 0, count = 0 // 用左右边界的下标和"1"计数器来模拟滑动窗口
    // let minL = 0, minR = 0 // 记录最小长度滑动窗口的左右边界下标
    // const needOneCountInWindow = k - maxChanges
    // for (; r < n; r++) {
    //     if (nums[r] == 1) {
    //         count++
    //         if (nums[l] == 0) l = r
    //     }
    //     while (count > needOneCountInWindow && l <= r) {
    //         if (nums[++l] == 1) {
    //             count--
    //             break
    //         }
    //     }
    //     if (count == needOneCountInWindow) {
    //         const center = caculateCenterOne(needOneCountInWindow, l, r)
    //         const newSumDistance = measureCenterDistanceSum(center, l, r)
    //         if (newSumDistance < sumDistance) {
    //             sumDistance = newSumDistance
    //             minL = l
    //             minR = r
    //         }
    //     }
    // }
    const slidingWindow: number[] = []
    const needOneCountInWindow = k - maxChanges
    let r = -1 // 滑动窗口右边界在 preAllSum 中对应的下标
    for (let i = 0; i < n; i++) {
        if (nums[i] == 1) {
            slidingWindow.push(i)
            r++
        }
        while (slidingWindow.length > needOneCountInWindow && slidingWindow.length) {
            slidingWindow.shift()
        }
        if (slidingWindow.length == needOneCountInWindow) {
            const len = slidingWindow.length
            const l = r - (len - 1)
            const center = l + Math.floor((len - 1) / 2)
            const sufLastIdx = sufAllSum.length - 1
            // 求前/后缀和的逆运算, 分别求出 center 到 left 区间 和 center 到 right 区间 的每个元素与 center 的距离之和，再把前、后距离之和相加，就是区间中，中心的 1 到两边的每个 1 的距离之和
            const centerDistance = preAllSum[center][0] - preAllSum[l][0] - l * (preAllSum[center][1] - preAllSum[l][1])
                + sufAllSum[sufLastIdx - center][0] - sufAllSum[sufLastIdx - r][0] - (sufLastIdx - r) * (sufAllSum[sufLastIdx - r][1] - sufAllSum[sufLastIdx - center][1])
            if (centerDistance < sumDistance) sumDistance = centerDistance
        }
    }

    return sumDistance + maxChanges * 2
};

console.log(minimumMoves([1,1,0,0,0,1,1,0,0,1], 3, 1))  // 3
console.log(minimumMoves([0,0,0,0], 2, 3))  // 4
console.log(minimumMoves([1,1,0,0,0,1,1,0,0,1], 3, 1))  // 3
console.log(minimumMoves([0,1,1,1,0,1,0,1], 5, 0))  // 9
console.log(minimumMoves([0,1,1,1,0,1,0,1], 5, 3))  // 6
console.log(minimumMoves([0,1,1,1,0,1,0,1], 6, 3))  // 8
console.log(minimumMoves([0,1,1,1,0,1,0,1], 7, 3))  // 11
console.log(minimumMoves([0,1,1,1,0,1,0,1], 8, 3))  // 15
console.log(minimumMoves([1,0,1,1], 4, 3))  // 5
console.log(minimumMoves([1,0,1,1], 6, 3))  // 9
console.log(minimumMoves([0,1,1,1,0,1,0], 6, 3))  // 8
console.log(minimumMoves([1,0,1,0,0,1,1,0,0], 6, 3))  // 10
console.log(minimumMoves([1,0,1,0,0,1,1,0,0], 7, 3))  // 15
console.log(minimumMoves([1,1], 1, 2))  // 0
console.log(minimumMoves([1,1,1], 2, 0))  // 1
console.log(minimumMoves([1,1,1,1], 5, 4))  // 6
console.log(minimumMoves([1,1,1,1,1], 5, 0)) // 6
console.log(minimumMoves([1,0,1,1,0,1], 6, 2)) // 10
console.log(minimumMoves([1,1,0,1,1], 5, 1)) // 8
console.log(minimumMoves([0,1,1,0,1,0,1,0,1], 8, 5)) // 13
console.log(minimumMoves([0,1,0,1,0,0,1,1,0,1], 7, 3)) // 13
console.log(minimumMoves([1,1,1,0,1,1,1,0,0,1,0,1,1,1,1,1,0,0,1,0,0,0,1,1,0], 10, 2)) // 26