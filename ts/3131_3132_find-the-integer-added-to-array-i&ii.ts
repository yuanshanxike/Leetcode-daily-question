function addedInteger(nums1: number[], nums2: number[]): number {
    const max1 = nums1.reduce((max, cur) => Math.max(max, cur), -1)
    const max2 = nums2.reduce((max, cur) => Math.max(max, cur), -1)
    return max2 - max1
}

console.log(addedInteger([2,6,4], [9,7,5]))
console.log(addedInteger([10], [5]))
console.log(addedInteger([1,1,1,1], [1,1,1,1]))


/**
 * 题目描述相当于：num1 删除两个元素后，所有元素与 nums2 中对应元素都有着相等的差 x，要求这个 x 的最小值。
 * 仔细观察两个数组，可知：如果把 num1 删除两个元素后的数组（假设已经对应着能求出最小数值的 x）排序后，相邻元素之差与 num2 排序后的相邻元素之差应该是一致的。
 * 做法：先分别排序两个数组，求出 nums2 中每个两个相邻元素的差值数组, 
 * 然后在 num1 中使用 滑动窗口 寻找出所有相邻元素差值一致的连续子数组（允许最多出现两次相邻元素的差值不一致，不一致时，跳过这个数，和下一个进行比较），
 * 求这些范围内第一个元素与排序后 num2 中第一个元素的差值的最小值。
 * 
 * 因为上述滑动窗口的长度不固定，所以与其说是“滑动窗口”，不如说是“双指针”
 * @param nums1 
 * @param nums2 
 * @returns 
 */
function minimumAddedInteger(nums1: number[], nums2: number[]): number {
    const DELETE_COUNT = 2
    nums1.sort((a, b) => a - b)
    nums2.sort((a, b) => a - b)
    const adjDistArr: number[] = []
    for (let i = 1; i < nums2.length; i++) {
        adjDistArr.push(nums2[i] - nums2[i - 1])
    }
    let l = 0 // 滑动窗口的左右边界 [l, r]
    let minDiff = 1001 // 记录最小差值
    outter: for (let r = l + adjDistArr.length; r < nums1.length; l++, r = l + adjDistArr.length) {
        let i = l
        let extendTimes = DELETE_COUNT  // 滑动窗口可伸长的剩余次数
        inner: while (i < r) {
            const adjDist = adjDistArr[i - l - (DELETE_COUNT - extendTimes)]
            if (nums1[i + 1] - nums1[i] != adjDist) {  // 遇到不匹配
                // 尝试跳过再匹配
                for (let j = i + 1 + 1 ; extendTimes > 0; j++) {
                    extendTimes--
                    if (nums1[j] - nums1[i] == adjDist) {
                        r += j - (i + 1)  // 中间跳过了 j - (i + 1) 个数，右指针也需要相应地增加 j - (i + 1)
                        i = j   // 在允许的跳过次数内匹配到了目标差值
                        if (r >= nums1.length) continue outter  // 窗口的右边界超出了数组范围，不用继续当前的匹配，直接开始下一个左端点的匹配
                        continue inner  // 继续匹配下一个差值
                    }
                }

                break inner // 允许的跳过次数内不能够匹配
            }
            i++  // 对应差值匹配时，下一次循环比较 nums1[i + 2] 和 nums1[i + 1]
        }
        if (i == r) { // 合法匹配
            minDiff = Math.min(minDiff, nums2[0] - nums1[l])
        }
    }
    
    return minDiff
};

console.log(minimumAddedInteger([4,20,16,12,8], [14,18,10]))
console.log(minimumAddedInteger([3,20,16,12,8], [14,18,10]))
console.log(minimumAddedInteger([3,5,5,3], [7,7]))
console.log(minimumAddedInteger([4,7,5], [5]))
console.log(minimumAddedInteger([4,6,3,1,4,2,10,9,5], [5,10,3,2,6,1,9]))  // 0
console.log(minimumAddedInteger([0,7,6,5,7,0,6,8,2,7], [6,7,8,0,5,2,7,0]))   // 0
console.log(minimumAddedInteger([7,9,1,4], [0,8]))   // -1