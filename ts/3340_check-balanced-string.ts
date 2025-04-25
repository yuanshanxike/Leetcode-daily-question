function isBalanced(num: string): boolean {
    const nums = [... num].map((c) => +c)
    const oddNums = nums.filter((_, idx) => idx % 2)
    const evenNums = nums.filter((_, idx) => !(idx % 2))
    return oddNums.reduce((sum, cur) => sum + cur, 0) == evenNums.reduce((sum, cur) => sum + cur, 0)
};

console.log(isBalanced('1234'))
console.log(isBalanced('24123'))