function sortArrayByParityII(nums: number[]): number[] {
    const odds: number[] = []
    const evens: number[] = []
    for (const num of nums) {
        if (num % 2 == 0) {
            evens.push(num)
        } else {
            odds.push(num)
        }
    }
    const ans: number[] = []
    for (let i = 0; i < odds.length; i++) {
        ans.push(evens[i], odds[i])
    }
    return ans
};

console.log(sortArrayByParityII([4,2,5,7]))
console.log(sortArrayByParityII([2,3]))