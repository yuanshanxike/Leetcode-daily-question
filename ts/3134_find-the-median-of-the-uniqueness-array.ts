/**
 * 二分答案 + 滑动窗口(校验二分答案对应的唯一性数组中的元素数量)
 * 
 * nums 中的非空子数组按照元素个数为 1、2、3、...、n 取，分别可以取到 n、n - 1、...、2、1 个。
 * 共计可以取到 n*(n+1)/2 个非空子数组。题目要求找到其中第 ⌈ (n*(n+1)/2)/2 ⌉ 大 (1-index) 的 distinct 值
 * 设 distinct(nums) 的值为 m，这些非空子数组对应的 distinct 值一定是从 1 到 m 且连续的 ([1, m] 的 distinct 值都存在)，其中 1 <= m <= n.
 * 那么就可以在 [1, m] 之间二分查找答案(left = 1, right = m)，记找到的值是 upper.
 * 需要验证 distinct 值小于等于 upper 的非空子数组数量是否达到了非空子数组总数量的一半，
 * 如果恰好是，就找到了答案，返回结果；
 * 如果小于总数量的一半，则说明找到的值小了，left = mid;
 * 如果大于总数量的一半，则说明找到的值大了，right = mid.
 * 
 * 怎样去计算上述的非空子数组数量(记为 cnt)？
 * 由于子数组的长度越长(元素越多)，其 distinct 值(不同元素数量)不会变小，与窗口的长度呈单调性。
 * 所以可以使用滑动窗口来统计小于等于二分查找到的 distinct 值对应的非空子数组数量。
 * 具体来说：在 nums 中，使用 l = 0, r = 0 来初始化滑动窗口，不断右移 r，借助 hashmap 来不断计算 distinct 的值。
 * 每当当计算出来的 distinct 小于等于当前二分查找的目标值时，进行计数 cnt += r - l + 1（表示固定以 r 为右端点，l, l+1, l+2, ..., r-1, r 为左端点的连续非空子数组数量被统计);
 * 如果右移 r 使得 distinct 大于当前二分查找的目标值，需要(不断)右移 l, 减小非空子数组的长度，(直到)非空子数组的 distinct 值小于等于 upper, 然后再像上面那样进行计数 cnt += r - l + 1.
 * 
 * 每次二分答案（ O(log n) 次），然后再通过滑动窗口的方式统计出小于等于对应目标值的 distinct 非空子数组数量（ O(n) ），
 * 最终在 O(n*log n) 的复杂度下可以计算出答案。
 * @param nums 
 */
function medianOfUniquenessArray(nums: number[]): number {
    const n = nums.length
    const k = (n + 1) * n / 2

    function check(t: number): number { // 返回 0 表示二分结果恰好等于目标值，-1 表示偏小，1 表示偏大
        const freq = new Map<number, number>() // <数字元素，出现的次数>
        let l = 0, r = 0
        let cnt = 0
        for (; r < n; r++) {
            freq.set(nums[r], (freq.get(nums[r]) ?? 0) + 1)
            while (freq.size > t) {  // 窗口内元素过多
                const out = nums[l++]
                const f = freq.get(out)! - 1
                // 移出左端点
                if (f == 0) {
                    freq.delete(out)
                } else {
                    freq.set(out, f)
                }
            }
            cnt += r - l + 1  // 右端点固定为 r 时，有 r-l+1 个合法左端点
            if (cnt > Math.ceil(k / 2)) {  // 当前统计到的非空子数组数量已经超过了中位数，二分结果偏大
                return 1
            }
        }
        if (cnt == Math.ceil(k / 2)) {
            return 0
        } else return -1
    }

    // 二分答案
    let l = 0, r = n
    while (l + 1 < r) {
        const mid = Math.floor((l + r) / 2)
        switch (check(mid)) {
            case 0:
                return mid
            case 1:
                r = mid
                break
            case -1:
                l = mid
                break
        }
    }
    return r
};

console.log(medianOfUniquenessArray([1,2,3]))
console.log(medianOfUniquenessArray([3,4,3,4,5]))
console.log(medianOfUniquenessArray([4,3,5,4]))