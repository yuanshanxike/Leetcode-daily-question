function maxStrength(nums: number[]): number {
    let product = 1
    const minusArr: number[] = []
    let oneZeroCnt = 0
    let oneOrZero = 0
    for (const num of nums) {
        if (num < 0) minusArr.push(num)
        else if (num > 1) product *= num
        else {
            oneZeroCnt++
            oneOrZero = Math.max(oneOrZero, num)
        }
    }
    if (minusArr.length == 1) {
        if (minusArr.length == 1 && nums.length == 1) return minusArr[0]
        else if (nums.length - minusArr.length == oneZeroCnt) return oneOrZero
    } else if (oneZeroCnt == nums.length) return oneOrZero
    minusArr.sort((a, b) => a - b)
    for (let i = 1; i < minusArr.length; i += 2) {
        product *= minusArr[i] * minusArr[i - 1]
    }
    return product
};

console.log(maxStrength([3,-1,-5,2,5,-9]))
console.log(maxStrength([-4,-5,-4]))
console.log(maxStrength([0,-1]))
console.log(maxStrength([0,0,0,-1]))
console.log(maxStrength([0,-1,-1,-1]))
console.log(maxStrength([0,-1,-1]))
console.log(maxStrength([-1]))
console.log(maxStrength([-1,-3]))

namespace L2708_dp {
    function maxStrength(nums: number[]): number {
        let max = nums[0]
        let min = nums[0]
        for (let i = 1; i < nums.length; i++) {
            const num = nums[i]
            const temp = max
            max = Math.max(max, num, max * num, min * num) // 维护最大值（四种情况的最大值）: ①不选：1.保持之前的最大值不变；②选：2.num 作为单独序列；3.num(为正数)与之前最大值的乘积；4.num(为负数)与之前最小值的乘积。
            min = Math.min(min, num, min * num, temp * num) // 维护最小值（四种情况的最小值）: ①不选：1.保持之前的最小值不变；②选：2.num 作为单独序列；3.num(为负数)与之前最大值的乘积；4.num(为正数)与之前最小值的乘积。
        }
        return max
    }

    console.log(maxStrength([3, -1, -5, 2, 5, -9]))
    console.log(maxStrength([-4, -5, -4]))
    console.log(maxStrength([0, -1]))
    console.log(maxStrength([0, 0, 0, -1]))
    console.log(maxStrength([0, -1, -1, -1]))
    console.log(maxStrength([0, -1, -1]))
    console.log(maxStrength([-1]))
    console.log(maxStrength([-1, -3]))
}