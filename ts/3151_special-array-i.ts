function isArraySpecial(nums: number[]): boolean {
    let ans = true
    for (let i = 1; i < nums.length; i++) {
        ans &&= ((nums[i] ^ nums[i - 1]) & 1) == 1
    }
    return ans
};

console.log(isArraySpecial([2]))
console.log(isArraySpecial([2,1,4]))
console.log(isArraySpecial([4,3,1,6]))