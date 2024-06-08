namespace L3040 {
    /**
     * 因为对于 nums 一个子串，可能是通过不同的元素删除方式得到的。
     * 所以一种直观的想法是：通过记录子串的双指针（头、尾两个指针）和 score 作为 key，
     * 将 dfs 三种删除方式得到的最大操作次 作为 value，
     * 存到一个 hashMap 中，进行记忆化递归。
     * @param nums 
     */
    function maxOperations(nums: number[]): number {
        memory = {}  // clear
        done = false
        const l = 0, r = nums.length - 1
        let ans = 1
        ans = Math.max(ans, dfs(nums, l + 2, r, nums[l] + nums[l + 1]) + 1)
        ans = Math.max(ans, dfs(nums, l + 1, r - 1, nums[l] + nums[r]) + 1)
        ans = Math.max(ans, dfs(nums, l, r - 2, nums[r] + nums[r - 1]) + 1)
        return ans
    };

    let done = false

    let memory: Record<string, number> = {}

    function getKey(l: number, r: number, score: number): string {
        return `${l}_${r}_${score}`
    }

    function dfs(nums: number[], l: number, r: number, score: number): number {
        if (done) return 0
        const len = r - l
        if (len < 1) {
            done = true  // 优化：对于已经找到了当前数组规模下的最大操作数目 的情况，就不需要继续 dfs（用其他的方式进行操作尝试）了
            return 0
        }
        const key = getKey(l, r, score)
        if (memory[key]) return memory[key]

        let times = 0
        if (nums[l] + nums[r] == score) {
            times = Math.max(times, dfs(nums, l + 1, r - 1, score) + 1)
        }
        if (nums[l] + nums[l + 1] == score) {
            times = Math.max(times, dfs(nums, l + 2, r, score) + 1)
        }
        if (nums[r] + nums[r - 1] == score) {
            times = Math.max(times, dfs(nums, l, r - 2, score) + 1)
        }
        memory[key] = times
        return times
    }

    console.log(maxOperations([3,2,1,2,3,4]))
    console.log(maxOperations([3,2,6,1,4]))
    console.log(maxOperations([3,2]))

    /** Tips: memory 这个 HashMap 也可以通过 一个三维数组 number[l][r][score] 来实现。
     * 又因为 score 最多只会有三种不同的值，所以可以简化为至多 3 个二维数组 number[l][r] 来实现即可。
     */
}