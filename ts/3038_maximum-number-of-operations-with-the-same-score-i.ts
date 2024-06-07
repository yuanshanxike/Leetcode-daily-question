function maxOperations(nums: number[]): number {
    const n = nums.length
    let score: number = -1
    let ans = 1
    for (let i = 0; i < n; i += 2) {
        if (score == -1) score = nums[i] + nums[i + 1]
        else if (score == nums[i] + nums[i + 1]) {
            ans++
        } else break
    }
    return ans
};

console.log(maxOperations([3,2,1,4,5]))
console.log(maxOperations([3,2,6,1,4]))