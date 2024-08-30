function sumDigitDifferences(nums: number[]): number {
    const n = nums.length
    const digit = Array(10)
    let ans = 0
    while(nums[0] > 0) {
        digit.fill(0)
        for (let i = 0; i < n; i++) {
            digit[nums[i] % 10]++
            nums[i] = Math.floor(nums[i] / 10)
        }
        for (let i = 0; i < 9; i++) {
            if (digit[i] == 0) continue
            let sum = 0
            for (let j = i + 1; j < 10; j++) {
                sum += digit[j]
            }
            ans += sum * digit[i]
        }
    }
    return ans
};

console.log(sumDigitDifferences([13,23,12]))
console.log(sumDigitDifferences([10,10,10,10]))
console.log(sumDigitDifferences([1,2,3,4,5,6,7,8,9]))
console.log(sumDigitDifferences([1,2,3,4,5,6,7,8,9,5,4]))

namespace L3153 {
    /**
     * 方法二：逆向思维，一次遍历
     * （外层循环遍历 nums 中的元素，内层循环遍历十进制位数的方式，统计 digit 出现频率的数组就需要变成二维数组，累计统计每个 num 的各个数位）
     * @param nums 
     */
    function sumDigitDifferences(nums: number[]): number {
        const n = nums.length
        const m = `${nums[0]}`.length  // 十进制位数为 m
        const pairsNum = m * n * (n - 1) / 2  // 所有能够组成的 digit 数对数量，除 2 表示取消数对中数字的排列关系
        const digit = Array.from({ length: m }, () => Array(10).fill(0))
        let ans = pairsNum
        for (let num of nums) {
            let i = 0  // 十进制的数位 index
            while (num) {
                ans -= digit[i][num % 10] // 不同的数对数量 = 总数对数量 - 相同数对数量
                digit[i][num % 10]++
                num = Math.floor(num / 10)
                i++
            }
        }
        return ans
    }

    console.log(sumDigitDifferences([13,23,12]))
    console.log(sumDigitDifferences([10,10,10,10]))
    console.log(sumDigitDifferences([1,2,3,4,5,6,7,8,9]))
    console.log(sumDigitDifferences([1,2,3,4,5,6,7,8,9,5,4]))
}