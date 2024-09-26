/**根据结合律，每个元素的值与其数字和相减再求和 */
function differenceOfSum(nums: number[]): number {
    let ans = 0
    for (let num of nums) {
        ans += num
        while (num > 0) {
            ans -= num % 10
            num = Math.floor(num / 10)
        }
    }
    return ans
};

console.log(differenceOfSum([1,15,6,3]))
console.log(differenceOfSum([1,2,3,4]))