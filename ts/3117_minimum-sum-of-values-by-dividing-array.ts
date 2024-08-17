/**
 * 定义 f[j][i + 1] 表示：将 nums[0] ... nums[i] 的元素分成 j 组的最小子数组值之和。
 * 可得到状态转移方程为：
 * f[j][i + 1] = nums[i] + min f[j - 1][k] (要求：k 的取值需要满足从 k 到 i 的 nums 的 AND 运算结果等于 andValues[j - 1])
 * min f[j - 1][k] 表示在 k 的合法取值区间 ( k <= i && (满足上述 AND 运算结果等于 andValues[j - 1]) ) 内能取到的分成 j - 1 组的最小子数组值之和。
 * 
 * 观察状态转移方程可知，对于每一个分组数，只与比其少一的分组数有关（需要用两个数组来滚动，因为 k 涉及到比 i 小的元素），所以 ‘j’ 这一维度可以省略，使用两个数组滚动计算的方式来实现。
 * 
 * 
 * 时间复杂度：O(m*n*logU)
 * 
 * @param nums 
 * @param andValues 
 */
function minimumValueSum(nums: number[], andValues: number[]): number {
    const INF_MAX = 1e9, n = nums.length
    let f = Array(n + 1).fill(INF_MAX)  // f[0][i >= 1] = ∞
    let newF = Array(n + 1).fill(0)
    f[0] = 0 // f[0][0] = 0

    for (const target of andValues) { // 结合 f、newF 滚动计算 [j] 这一个维度
        const a = Array.from(nums) // a: clone from nums. 记录 nums 的后缀 AND 值，例如 a[j], 其中 0 <= j <= i, a[j] = nums[j] & num[j + 1] & ... & nums[i - 1] & nums[i]
        // 通过"三指针"（left, right 和 i）找出 [0, i] 范围内 AND 为 target 的后缀子数组的左边界的取值范围 [left, right)。右边界每次枚举为 i
        let left = 0, right = 0
        const q: number[] = []  // 数组模拟单调队列，保存 f 下标
        let qi = 0  // 单调队列目前处理到 f[qi]

        newF[0] = INF_MAX;  // f[j >= 1][0] = ∞
        for (let i = 0; i < n; i++) {
            const x = a[i]  // 子数组值

            for (let j = i - 1; j >= 0; j--) {
                if ((a[j] & x) == a[j]) break // logTrack, 因为 a[j] 的子集（继续与 j 前面的元素求 AND）在之前(i == j 时)就已经计算过了，如果再次计算与 nums[i] (x) 的 AND (交集), a[0] ~ a[j] 的值也不会发生任何变化.
                // 上面满足条件的 break，保证了下面这个表达式在原本 O(n^2) 的二重循环中只会被计算 o(n*logU) 次（其中 U 是 nums 中元素的上限）
                a[j] &= x
            }
            // 因为 & 运算只会使得结果 AND 值不变或变小，[0, i] 中的 j 在每次计算后，a[j] 保存的是 nums[j] & nums[j + 1] & ... & nums[i]，所以 a[0], a[1], ..., a[i] 是一个非递减序列。
            // 进而可以知道：当 i 变大时，意味着有更多的数参与计算 AND，（没移动时）left 和 right 指向的值只会不变或变小，而此时需要找到与上次(i 较小时)相同的 target 的话，就需要向右移动 left 和 right 去寻找数组 a 中，元素值等于 target 的区间。
            // 求 AND 值为 target 的以 i 为右边界的区间的左边界取值区间 [left, right)：
            while (left <= i && a[left] < target) {  // 右移 left，循环结束时，找到恰好 a[left] == target 的第一个元素下标
                left++
            }
            while (right <= i && a[right] <= target) { // 右移 right，循环结束时，找到恰好 a[right] == target 的第一个元素下标
                right++
            }

            // 使用单调队列滑动窗口查找 [left, right) 范围(能使得新的分组的 AND 为 target 的新分组左边界取值范围)内的元素分成 j - 1 组时，最小的 f 值（上一个 taget 计算的结果）
            if (left < right) {
                // 单调队列：右边入
                for (; qi < right; qi++) {
                    while (q.length && f[qi] <= f[q[q.length - 1]]) {
                        q.pop()
                    }
                    q.push(qi)
                }

                // 单调队列：左边出
                while (q[0] < left) {
                    q.splice(0, 1)
                }

                // 计算答案：加上队首（找到的最小值）
                newF[i + 1] = f[q[0]] + x  // 计算 [0, i] 范围内的元素分成 j 组时，最小的 f 值（当前 target 计算出来的结果）
            } else newF[i + 1] = INF_MAX  // left == right == i + 1（没找到 AND 值等于 target 的以 i 为右边界的区间的左边界取值区间）
        }
        // 此时计算出了当前 target(andValues[j - 1]) 对应的 f[j][0] ... f[j][n]
        [f, newF] = [newF, f]  // 交换两个数组（刚填了值的数组需要作为下次计算的 f），也就是滚动计算
    }
    return f[n] < INF_MAX ? f[n] : -1
};

console.log(minimumValueSum([1,4,3,3,2], [0,3,3,2]))
console.log(minimumValueSum([2,3,5,7,7,7,5], [0,7,5]))
console.log(minimumValueSum([1,2,3,4], [2]))