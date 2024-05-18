function maxDivScore(nums: number[], divisors: number[]): number {
    // const set = new Set()
    // let ans = 1e9
    // let maxCount = 0
    // for (const d of divisors) {
    //     if (set.has(d)) continue
    //     let count = 0
    //     for (const num of nums) {
    //         if (num % d == 0) count++
    //     }
    //     if (count == maxCount && d < ans || count > maxCount) {
    //         ans = d
    //         maxCount = count
    //     }
    //     set.add(d)
    // }
    // return ans

    // 可以通过排序进行优化
    nums.sort((a, b) => b - a) // 降序
    divisors.sort((a, b) => a - b)  // 升序
    let dup = 0
    for (const i in nums) { // 统计重复元素数量
        if (+i > 0 && nums[+i - 1] == nums[+i]) dup++ 
    }
    let ans = 1e9
    let maxCount = -1
    for (const d of divisors) {
        // maxCount - dup 表示不重复的能被整除的数量（可能会被减去更多，甚至成为负数，但不影响条件判断的正确性）
        // maxCount - dup 的上界所对应的情况是：num中所有重复的数都是上一个数(divisors[i-1])的倍数，此时刚好就是num中不重复的所有divisors[i-1]的倍数。
        // 那么 maxCount - dup 个不重复的非零倍数从小到达排列也只能是 d, 2d, 3d, ..., (maxCount - dup)d；
        // 所以对于当前的 d，如果上一个比他小的数对应的不重复的“整除分数” 倍的 d 已经比数组num中的最大倍数值(num[0])还要大的话，
        // 去除重复项的 num 数组是不可能够“装”的，所以其对应的非重复的“整除分数”一定比 maxCount - dup 要小
        // 此时即使加回重复项数量 dup 还原到实际对应的“整除分数”(count)也就肯定也是小于 maxCount。
        // 所以后面更大的 d 就不用看了，不等式一定成立，所以可以直接 break 掉外层的循环。
        if ((maxCount - dup) * d > nums[0]) break
        let count = 0
        for (const n of nums) {
            if (n < d) break // num 数组现在是递减的，一个数的整数倍数不可能比它自身小，所以当小于时 break 掉内层的循环
            if (n % d == 0) count++
        }
        if (count > maxCount) {
            ans = d
            maxCount = count
        }
    }
    return ans
}

console.log(maxDivScore([4,7,9,3,9], [5,2,3]))
console.log(maxDivScore([20,14,21,10], [5,7,5]))
console.log(maxDivScore([12], [10,16]))