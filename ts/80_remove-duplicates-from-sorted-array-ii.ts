// /**
//  * 用了 js 数组特有的 push/shift 方法，不具备泛用性。
//  * @param nums 
//  * @returns 
//  */
// function removeDuplicates(nums: number[]): number {
//     let last = nums[0]
//     let cnt = 0

//     while (nums[0] == nums[nums.length - 1] && nums.length > 2) {
//         nums.pop()
//     }
//     if (nums.length <= 2) return nums.length

//     while (last <= nums[0]) {  //  当 last > nums[0] 时，表示已经遍历了一遍数组，多余两个的相同元素已经被删除完毕了
//         if (last == nums[0]) {
//             cnt++
//         } else {
//             cnt = 1
//             last = nums[0]
//         }
//         const num = nums.shift() as number
//         if (cnt <= 2) nums.push(num)
//     }
//     return nums.length
// };

/**
 * 普通数组（长度不能动态变化）也适用的做法。
 * 返回值看作是栈的大小，遍历 nums 的同时在 nums 中完成元素的入栈
 * @param nums 
 */
function removeDuplicates(nums: number[]): number {
    let stackSize = Math.min(2, nums.length)  // 两个元素时一定是符合要求的
    for (let i = stackSize; i < nums.length; i++) {
        if (nums[i] != nums[stackSize - 2]) {  // nums[stackSize - 1] 是栈顶元素，nums[stackSize - 2] 是栈顶下面的相邻元素
            nums[stackSize++] = nums[i]  // 不同于栈顶头两个元素的新元素可以入栈
        }
    }
    return stackSize
}

console.log(removeDuplicates([1,1,1,2,2,3]))
console.log(removeDuplicates([0,0,1,1,1,1,2,3,3]))
console.log(removeDuplicates([1]))
console.log(removeDuplicates([1,1,1]))