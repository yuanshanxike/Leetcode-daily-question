function sumOfBeauties(nums: number[]): number {
    const n = nums.length
    const preMax = Array(nums.length).fill(Infinity)
    const sufMin = Array(nums.length).fill(0)
    let max = 0
    for (let i = 0; i < n; i++) {
        max = Math.max(max, nums[i])
        preMax[i] = max
    }
    let min = Infinity
    for (let i = n - 1; i >= 0; i--) {
        min = Math.min(min, nums[i])
        sufMin[i] = min
    }
    
    let ans = 0
    for (let i = 1; i < n - 1; i++) {
        if (preMax[i - 1] < nums[i] && nums[i] < sufMin[i + 1]) {
            ans += 2
        } else if (nums[i - 1] < nums[i] && nums[i] < nums[i + 1]) {
            ans += 1
        }
    }
    return ans
};

console.log(sumOfBeauties([1,2,3]))
console.log(sumOfBeauties([2,4,6,4]))
console.log(sumOfBeauties([3,2,1]))