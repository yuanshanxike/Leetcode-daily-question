function sortedSquares(nums: number[]): number[] {
    nums = nums.map((val) => val ** 2)
    return nums.sort((a, b) => a - b)
};

console.log(sortedSquares([-4,-1,0,3,10]))
console.log(sortedSquares([-7,-3,2,3,11]))