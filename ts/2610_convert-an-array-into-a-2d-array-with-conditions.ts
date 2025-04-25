/**
 * 方法一 贪心
 * 时间复杂度：O(n^2)
 * @param nums 
 * @returns 
 */
// function findMatrix(nums: number[]): number[][] {
//     const n = nums.length
//     const ans: number[][] = []
//     const set = new Set<number>()
//     let picked = 0
//     while (picked < n) {
//         const arr: number[] = []
//         for (let i = 0; i < n; i++) {
//             if (nums[i] != -1 && !set.has(nums[i])) {
//                 arr.push(nums[i])
//                 set.add(nums[i])
//                 nums[i] = -1
//                 picked++
//             }
//         }
//         ans.push(arr)
//         set.clear()
//     }
//     return ans
// };

/**
 * 方法二 哈希计数（因为题目有 1 <= nums[i] <= nums.length，可以用数组实现哈希计数）
 * 时间复杂度：O(n * maxCnt(nums))
 * @param nums 
 */
// function findMatrix(nums: number[]): number[][] {
//     const n = nums.length
//     const cnts = Array(n + 1).fill(0)  // 统计每个元素的出现次数
//     let maxCnt = 0
//     for (const num of nums) {
//         cnts[num]++
//         maxCnt = Math.max(maxCnt, cnts[num])
//     }
//     const ans: number[][] = Array.from({ length: maxCnt }, () => [])  // 以出现频率为一个维度（row），构建二维数组
//     for (let i = 1; i <= n; i++) {
//         let cnt = cnts[i]
//         while (cnt > 0) {
//             ans[--cnt].push(i)
//         }
//     }
//     return ans
// }

/**
 * 方法三 继续优化方法二为一次遍历
 * 时间复杂度：O(n)
 * @param nums 
 */
function findMatrix(nums: number[]): number[][] {
    const cnts = Array(nums.length + 1).fill(0)
    const ans: number[][] = []
    for (const num of nums) {
        if (cnts[num] == ans.length) {
            ans.push([])  // maxCnt（row）触达新的层级，需要开辟新的数组
        }
        ans[cnts[num]].push(num)  // 在当前出现次数的层级中插入该元素
        cnts[num]++
    }
    return ans
}

console.log(findMatrix([1,3,4,1,2,3,1]))
console.log(findMatrix([1,3,4,1,2,3,1,2]))
console.log(findMatrix([2,1,1]))