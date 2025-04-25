/**
 * 方法一
 * 排序（O(n * log(n))） + 前缀和（O(n)） + 枚举（O(n)） * 二分查找（O(log(n))）
 * 时间复杂度：O(n * log(n))
 * @param flowers 
 * @param newFlowers 
 * @param target 
 * @param full 
 * @param partial 
 * @returns 
 */
function maximumBeauty(flowers: number[], newFlowers: number, target: number, full: number, partial: number): number {
    flowers.sort((a, b) => a - b)
    const n = flowers.length
    const s = Array(n + 1).fill(0)  // 排序后的 flowers 的前缀和数组，便于计算区间内的花的总数量
    for (let i = 1; i <= n; i++) {
        s[i] = s[i - 1] + flowers[i - 1]
    }
    let x = flowers.filter(f => f >= target).length // 已经达到(或超过) target 的花园数量
    let ans = 0
    for (; x <= n; x++) {
        newFlowers -= x == 0 ? 0 : Math.max(target - flowers[n - x], 0)  // 判断 "x == 0" 是为了防止 flowers[n - x] 越界
        if (newFlowers < 0) {  // 剩余可栽的花数量必须 >= 0
            break
        }
        // 剩余花用来提升前面花数量没到 target 的花园中的最少花数量
        // 二分查找（左开右闭）
        // 红：flowers[mid] * (mid + 1) - s[mid + 1] <= newFlowers，蓝：flowers[mid] * (mid + 1) - s[mid + 1] > newFlowers
        let l = -1, r = n - x - 1
        while (l < r) {
            const mid = Math.ceil((l + r) / 2) // (l + r) >> 1
            if (flowers[mid] * (mid + 1) - s[mid + 1] <= newFlowers) {  // 二分答案，求解满足条件(最小值为 flowers[mid]，所需最少花数量不大于剩余花数量)的最大 mid
                l = mid
            } else {
                r = mid - 1
            }
        }
        let y = 0  // 把 [0 ... l] 填平后，剩余花的数量还能把 [0 ... l] 提升到的高度（不能达到 target）
        if (l != -1) {
            const cost = flowers[l] * (l + 1) - s[l + 1]  // 把 [0 ... l] 填平需要消耗的剩余花数量
            y = Math.min(flowers[l] + Math.floor((newFlowers - cost) / (l + 1)), target - 1)
        }
        ans = Math.max(ans, x * full + y * partial)
    }
    return ans
}

console.log(maximumBeauty([1,3,1,1], 7, 6, 12, 1))
console.log(maximumBeauty([2,4,5,3], 10, 5, 2, 6))

// function lowBound(arr: number[], t: number): number {
//     // 红：< t, 蓝：>= t
//     // 左开右闭
//     let l = -1, r = arr.length - 1
//     while (l < r) {
//         console.debug([l, r])
//         const mid = Math.ceil((l + r) / 2)
//         if (arr[mid] < t) {
//             l = mid
//         } else {  // arr[mid] >= t
//             r = mid - 1
//         }
//     }
//     return r + 1
// }

// function lowBound(arr: number[], t: number): number {
//     // 红：< t, 蓝：>= t
//     // 左闭右开
//     let l = 0, r = arr.length
//     while (l < r) {
//         const mid = Math.floor((l + r) / 2)
//         if (arr[mid] < t) {
//             l = mid + 1
//         } else {  // arr[mid] >= t
//             r = mid
//         }
//     }
//     return r
// }

// function upBound(arr: number[], t: number): number {
//     // 红：<= t, 蓝：> t
//     // 左开右闭
//     let l = -1, r = arr.length - 1
//     while (l < r) {
//         const mid = Math.ceil((l + r) / 2)
//         if (arr[mid] <= t) {
//             l = mid
//         } else {
//             r = mid - 1
//         }
//     }
//     return l
// }

// console.log(lowBound([1,1,1,1,2,2,3,4,5,6,11,23], 2))  // 4
// console.log(lowBound([1,1,1,1,2,2,2,2,2,2,2,3,4,5,6,11,23], 2))  // 4
// console.log(lowBound([1,1,1,1,2,2,2,2,2,2,2,3,4,5,6,11,23], 1))  // 0
// console.log(upBound([1,1,1,1,2,2,2,2,2,2,2,3,4,5,6,11,23], 1))  // 3
// console.log(upBound([1,1,1,1,2,2,2,2,2,2,2,3,4,5,6,11,23], 2))  // 10

/**
 * 方法二
 * 贪心 + 排序（O(n * log(n))） + 双指针（O(n)）
 * 时间复杂度：O(n * log(n)) ，瓶颈在排序上
 * @param flowers 
 * @param newFlowers 
 * @param target 
 * @param full 
 * @param partial 
 * @returns 
 */
function maximumBeauty_2(flowers: number[], newFlowers: number, target: number, full: number, partial: number): number {
    const n = flowers.length

    // 如果全部种满，还剩下多少朵花？
    let leftFlowers = newFlowers - target * n  // 先减掉
    for (let i = 0; i < n; i++) {
        flowers[i] = Math.min(flowers[i], target)
        leftFlowers += flowers[i] // 把已有的加回来
    }

    // 没有种花，所有花园都已种满
    if (leftFlowers == newFlowers) {
        return n * full  // 答案只能是 n*full（注意不能减少花的数量）
    }

    // 可以全部种满
    if (leftFlowers >= 0) {
        // 两种策略取最大值：留一个花园种 target-1 朵花，其余种满；或者，全部种满
        return Math.max((target - 1) * partial + (n - 1) * full, n * full)
    }

    flowers.sort((a, b) => a - b)

    let ans = 0, preSum = 0, j = 0
    // 枚举 i，表示后缀 [i, n-1] 种满（i=0 的情况上面已讨论）
    for (let i = 1; i <= n; i++) {
        // 撤销，flowers[i-1] 不变成 target
        leftFlowers += target - flowers[i - 1]
        if (leftFlowers < 0) {  //  剩余花不能为负数(花不够)，需要继续撤销
            continue
        }

        // 满足以下条件说明 [0, j] 都可以种 flowers[j] 朵花
        while (j < i && flowers[j] * j <= preSum + leftFlowers) {
            preSum += flowers[j]
            j++
        }

        // 计算总美丽值
        // 在前缀 [0, j-1] 中均匀种花，这样最小值最大
        const avg = Math.floor((leftFlowers + preSum) / j) // 由于上面特判了，这里 avg 一定小于 target
        const totalBeauty = avg * partial + (n - i) * full
        ans = Math.max(ans, totalBeauty)
    }

    return ans
};

console.log(maximumBeauty_2([1,3,1,1], 7, 6, 12, 1))
console.log(maximumBeauty_2([2,4,5,3], 10, 5, 2, 6))