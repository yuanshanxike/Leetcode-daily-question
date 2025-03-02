// 支持 nums 中包含重复的元素
function semiOrderedPermutation(nums: number[]): number {
    const n = nums.length
    let minIdx = -1, maxIdx = -1
    let maxVal = -Infinity, minVal = Infinity
    for (let i = 0; i < n; i++) {
        if (nums[i] < minVal) {  // 尽量找到左边的最小值
            minVal = nums[i]
            minIdx = i
        }
        if (nums[i] >= maxVal) { // 尽量找到右边的最大值
            maxVal = nums[i]
            maxIdx = i
        }
    }

    return (minIdx > maxIdx ? -1 : 0) + minIdx + (n - 1 - maxIdx)   // 最左边的最小值 ① 交换移动到最左侧；最右边的最小值 ② 交换移动到最右侧；如果 ① 在 ② 的右侧，第一次移动其中的一个元素时，另外的一个元素也会被交换位置，相当于下次这个元素移动到目标位置时可以少移动一次
};

console.log(semiOrderedPermutation([2,1,4,3]))
console.log(semiOrderedPermutation([2,4,1,3]))
console.log(semiOrderedPermutation([1,3,4,2,5]))
console.log(semiOrderedPermutation([1,1,1,1,1]))
console.log(semiOrderedPermutation([1,1,2,2,1]))
console.log(semiOrderedPermutation([2,1]))