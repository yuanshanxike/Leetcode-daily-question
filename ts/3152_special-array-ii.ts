/**
 * 方法二：
 * 等价替换 + 前缀和
 * 
 * 如果相邻的两个数的奇偶性不同，标记为 0；奇偶性相同则标记为 1。
 * 因为相邻的两个数之间有一个标记，n 个数之间就会有 n - 1 个标记。
 * 记这些 0/1 标记组成的数组为 signals
 * 原本考察 nums[from, to] 是否为特殊数组，转变为了考察 signals[from, to - 1] 的元素是否全为 0。
 * 也就相当于是求 signals[from, to] 中的元素和是否等于 0。
 * 如果等于 0 则是特殊数组，否则不是。
 * 需要特殊处理 from == to 的情况，此时在 signals 中不能构成合法的区间，但其对应的 nums 中的单个元素是特殊数组。
 * 
 * 时间复杂度：O(n + m)
 */
namespace L3152 {
    function isArraySpecial(nums: number[], queries: number[][]): boolean[] {
        const signals: number[] = []
        const preSums: number[] = [0]  // signals 的前缀和数组
        const ans: boolean[] = []
        for (let i = 1; i < nums.length; i++) {
            signals.push((nums[i] ^ nums[i - 1] ^ 1) & 1)
        }
        console.debug(signals)
        for (let i = 0; i < signals.length; i++) {  // 计算前缀和数组
            preSums.push(signals[i] + preSums[i])   // 相较于 signals 的元素数量，preSum 中的元素数又从 n - 1 变为了 n，前缀和算出的奇偶性和 nums 中元素下标相对应
        }
        console.debug(preSums)
        for (const [from, to] of queries) {
            ans.push(preSums[to] - preSums[from] == 0)  // 由于前缀和算出的奇偶性和 nums 中的下标恢复了对应关系（比如要计算例2中 [1,2] 是否为“特殊数组”，直接用 preSums[2] - preSums[1] 得到的就是 num[1]=3 与 num[2]=1 之间的奇偶性元素和，这里等于 signals[1] 的值），对应前缀和直接相减得到的就是区间内的奇偶性和
        }
        return ans
    };
    
    console.log(isArraySpecial([3,4,1,2,6], [[0,4]]))
    console.log(isArraySpecial([4,3,1,6], [[0,2],[2,3],[1,3]]))
}