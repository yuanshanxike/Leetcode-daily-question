function numberGame(nums: number[]): number[] {
    nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length; i += 2) {
        [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]]
    }
    return nums
};

console.log(numberGame([5,4,2,3]))
console.log(numberGame([2,5]))