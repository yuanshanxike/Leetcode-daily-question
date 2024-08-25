function canPartitionKSubsets(nums: number[], k: number): boolean {
    const n = nums.length
    let maxVal = 0
    const sum = nums.reduce((acc, cur) => {
        maxVal = Math.max(maxVal, cur)
        return acc + cur
    }, 0)
    if (sum % k != 0) return false
    const target = sum / k
    if (maxVal > target) return false
    nums.sort((a, b) => a - b)  // 升序排序，可以减少搜索次数
    const mask = (1 << n) - 1   // 结束 state，n 位全为 1
    // 记忆体
    const f = Array(1 << n).fill(0)  // 记录每个状态是否被计算过:
    /* 0：未被计算；
       1：计算过，且剩余元素可以被正确划分为元素和不超过 target 的子集；
       -1：计算过，且剩余元素不可被正确划分元素和不超过 target 的子集。
       */

    /**
     * 
     * @param state 二进制第 i 位为 1 表示 nums[i] 已被划分使用，为 0 表示未被划分
     * @param total 当前分组的元素累加和，等于 target 时需要置 0（可以通过 mod target 实现）
     * @returns 
     */
    function dfs(state: number, total: number): boolean {
        if (state == mask) { // 找到正确划分时的递归出口
            return true
        }
        if (f[state] != 0) { // 已经计算过的状态使用记忆值
            return f[state] == 1
        }
        for (let i = 0; i < nums.length; i++) {  // 每个元素尝试放到当前的分组中，不需要考虑具体是哪一个分组（只要保证每个当前子集的元素和不超过 taget, 就一定可以划分出 k 个元素和等于 target 的子集（因为上面已经保证了 sum % k == 0, 而且在搜索时，我们尽可能地将元素放入当前数组中，直到每次 target 置 0 时才表示操作新的分组））
            if ((state & (1 << i)) > 0) continue  // 跳过已经被划分的元素
            if (nums[i] + total > target) break   // (因为此时 nums 是非降序排列的), 当前 nums[i] 加上当前子集元素和(total)如果已经超出了目标和(target)，对于 i 后面的 nums 中元素再加上当前子集元素和(total)也不能够得到 target 了。所有直接
            if (dfs(state | (1 << i), (total + nums[i]) % target)) {  // dfs 的返回值作为判断条件时，相当于把后续的递归结果做 AND 运算后来作为当前层的判断条件
                // success
                f[state] = 1
                return true
            }
        }
        // failed
        f[state] = -1
        return false
    }

    return dfs(0, 0)
};

console.log(canPartitionKSubsets([4, 3, 2, 3, 5, 2, 1], 4))
console.log(canPartitionKSubsets([1,2,3,4], 3))