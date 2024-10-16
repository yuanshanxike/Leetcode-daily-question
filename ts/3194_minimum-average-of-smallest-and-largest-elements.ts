function minimumAverage(nums: number[]): number {
    nums.sort((a, b) => a - b)
    let ans = Infinity
    for (let i = 0; i < nums.length / 2; i++) {
        ans = Math.min(ans, nums[i] + nums[nums.length - 1 - i])
    }
    return ans / 2;
};

console.log(minimumAverage([7,8,3,4,15,13,4,1]));
console.log(minimumAverage([1,9,8,3,10,5]));
console.log(minimumAverage([1,2,3,7,8,9]));