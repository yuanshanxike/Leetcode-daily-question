/**
 * 前缀和
 * @param nums 
 */
function waysToSplitArray(nums: number[]): number {
    const n = nums.length
    const prefixSum = Array(nums.length).fill(0)
    for (let i = 0; i < n; i++) {
        if (i == 0) prefixSum[i] = nums[i]
        else prefixSum[i] = nums[i] + prefixSum[i - 1]
    }

    let cnt = 0
    for (let i = 0; i < n - 1; i++) {
        if (prefixSum[i] * 2 >= prefixSum[n - 1]) {
            cnt++
        }
    }
    return cnt
};

console.log(waysToSplitArray([10,4,-8,7]))
console.log(waysToSplitArray([2,3,1,0]))