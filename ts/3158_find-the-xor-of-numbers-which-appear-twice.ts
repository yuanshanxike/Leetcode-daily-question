function duplicateNumbersXOR(nums: number[]): number {
    const occurSet = new Set()
    let ans = 0
    for (const num of nums) {
        if (occurSet.has(num)) {
            ans ^= num
        }
        occurSet.add(num)
    }
    return ans
};

console.log(duplicateNumbersXOR([1,2,1,3]))
console.log(duplicateNumbersXOR([1,2,3]))
console.log(duplicateNumbersXOR([1,2,2,1]))