function findIndices(nums: number[], indexDifference: number, valueDifference: number): number[] {
    // 维护计算窗口左边的最大值和最小值对应的坐标
    let maxIdx = 0, minIdx = 0
    for (let i = indexDifference; i < nums.length; i++) {
        if (nums[i - indexDifference] > nums[maxIdx]) maxIdx = i - indexDifference
        else if (nums[i - indexDifference] < nums[minIdx]) minIdx = i - indexDifference

        if (nums[i] - nums[minIdx] >= valueDifference) return [minIdx, i]
        if (nums[maxIdx] - nums[i] >= valueDifference) return [maxIdx, i]
    }
    return [-1, -1]
};

console.log(findIndices([5,1,4,1], 2, 4))  // [0, 3]
console.log(findIndices([2,1], 0, 0))      // [0, 0]
console.log(findIndices([1,2,3], 2, 4))    // [-1, -1]
console.log(findIndices([4,22,43], 0, 34))    // [0, 2]
console.log(findIndices([31,23,36], 1, 11))    // [1, 2]