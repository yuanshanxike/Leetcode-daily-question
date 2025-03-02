function findClosestNumber(nums: number[]): number {
    return nums.reduce((a, b) => Math.abs(a) < Math.abs(b) ? a : Math.abs(a) === Math.abs(b) ? Math.max(a, b) : b, Infinity)
};

console.log(findClosestNumber([-4, -2, 1, 4, 8]))
console.log(findClosestNumber([2, -1, 1]))
