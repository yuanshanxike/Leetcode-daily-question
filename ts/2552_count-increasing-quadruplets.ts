/**
 * 枚举技巧：枚举中间的两个数(j, k)，需要满足 nums[k] < nums[j].
 * 接下来需要确认在 0~j-1 中，小于 nums[k] 的可选的 i 的数量，
 * 以及在 k+1~n-1 中，大于 nums[j] 的可选的 l 的数量。
 * 枚举 j 和 k 的时间复杂度为 O(n^2), 我们希望尽可能在 O(1) 的时间复杂度内确定上述的 i 和 l 的数量，
 * 然后根据乘法原理直接可以计算出该枚举固定的 j、k 时，存在的上升四元组的数量。
 * 
 * 要在 O(1) 的时间内计算出对应的 i 和 l 的数量，需要对前后缀进行预处理，计算出在坐标 idx 之前（之后）的元素中 小于（大于）nums[k(j)] 的元素数量，
 * 分别用 less 和 great 两个二维数组来存储，具体来说：
 * less[idx][x] 表示 idx 左边，元素值小于 x 的元素数量，great[idx][x] 表示 idx 右边，元素值大于 x 的元素数量。
 * @param nums 
 */
function countQuadruplets(nums: number[]): number {
    const n = nums.length
    const great: number[][] = Array.from({ length: n }, () => Array<number>(n + 1).fill(0))
    // 从后往前遍历，预处理 great 数组（O(n^2)，js 引擎的性能瓶颈大概是在数据拷贝上）
    for (let idx = n - 2; idx >= 0; idx--) {
        great[idx] = Array.from(great[idx + 1])  // 把上一次计算的结果复制过来
        for (let x = 1; x < nums[idx + 1]; x++) { // 更新 idx 右边大于每个值的元素数量
            great[idx][x]++
        }
    }
    let ans = 0
    // 利用题目中描述的"nums 是 1 到 n 的一种排列"这一信息，可以不用计算 less 数组，而通过 great 数组间接地计算出 great 对应的 less 值
    // 枚举 j、k
    for (let j = 1; j < n - 2; j++) {
        for (let k = j + 1; k < n - 1; k++) {
            if (nums[j] > nums[k]) {
                const rGreatJCnt = great[k][nums[j]]
                const lLessKCnt = nums[k] - (n - 1 - j - great[j][nums[k]]) // 按照题意可知 nums 中不大于 nums[k] 的数一共有 nums[k] 个。j 右边比 nums[k] 大的数一共有 great[j][nums[k]] 个。j 右边一共有 n - 1 - j 个数字，所以 j 的右边一共有 n - 1 - j - great[j][nums[k]] 个不大于 nums[k] 的数字，所以 j 的左边不大于 nums[k] 的数字共有 nums[k] - (n - (j + 1) - great[j][nums[k]]) 个，因为 k 还在 j 的右边，所以计算出来的是数量是 j 左边严格小于 nums[k] 的数量。
                ans += rGreatJCnt * lLessKCnt  // 乘法原理
            }
        }
    }
    return ans
};

console.log(countQuadruplets([1,3,2,4,5]))
console.log(countQuadruplets([1,2,3,4]))