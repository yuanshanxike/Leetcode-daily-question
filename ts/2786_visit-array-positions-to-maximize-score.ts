function maxScore(nums: number[], x: number): number {
    /**
     * 直观思路：我们可以从任意前面的位置到达后面的一个位置，所以可以从左往右，统计每一个位置到达当前位置所能得到的最大分数，求这些位置中保存的最大分数的最大值
     * 时间复杂度：O(n^2) -> TLE
     */
    const MIN_INT32 = -(2 ** 31)
    const n = nums.length
    const maxScore = Array<number>(n)
    maxScore.fill(MIN_INT32)
    maxScore[0] = nums[0]
    let ans = MIN_INT32
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            const score = maxScore[j] + (((nums[j] ^ nums[i]) & 1) == 0 ? nums[i] : nums[i] - x)
            maxScore[i] = Math.max(maxScore[i], score)
        }
        ans = Math.max(ans, maxScore[i])
    }
    return ans

    /**
     * 优化：仔细思考上述做法，其实可以发现没有必要计算那些相同奇偶性中比当前计算出的最大元素更小的元素与 nums[i] 相加的值；
     * 同理，奇偶性发生变化时也是一样的，只需要计算 nums[i] 与当前最大的奇偶性相异的数的和即可。
     * 那么可以维护两个大根堆，一个存放对应 nums[i] 都是奇数的 maxScore，另一个存放对应 nums[i] 都是偶数的 maxScore，根据计算出来的到达当前位置能获得的最大分数 的奇偶性来决定 maxScore 需要进入到哪一个堆中。
     * 以这种方式遍历计算完 nums，最后的答案是两个堆顶的中的最大值。
     * 时间复杂度：O(n*logn)
     * 
     * 注：使用 C# 来实现
     */
};

console.log(maxScore([2,3,6,1,9,2], 5))
console.log(maxScore([2,4,6,8], 3))