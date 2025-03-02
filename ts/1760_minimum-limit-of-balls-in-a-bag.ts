/**
 * 二分答案：
 * 在 [1, max(nums)] 中二分查找分配后每个袋子中球的数量最大值 c.
 * 通过 c，可以求出对于每个袋子中的球的操作次数 ti，然后可以验证 Σti 是否小于等于 maxOperations。
 * 因为随着 c 的增大等式 Σti <= maxOperations 会更容易成立，函数值具有二值单调性，所以可以使用二分查找来确定 c 的最小值
 * 如果 Σti > maxOperations 说明找到的 c 过小，需要增大左边界。
 * @param nums 
 * @param maxOperations 
 */
function minimumSize(nums: number[], maxOperations: number): number {
    let l = 1, r = Math.max(... nums)
    while (r > l) {
        const m = Math.floor((l + r) / 2)
        let optCnt = 0
        for (const n of nums) {
            if (m < n) {  // 如果 m >= n，当前袋子中的球数量已经满足要求，不需要再进行操作
                optCnt += Math.ceil(n / m) - 1  // 切割次数等于分割成的子块数 - 1
            }
        }
        if (optCnt > maxOperations) {  // 每个袋子的最大球数过小
            l = m + 1
        } else {
            r = m  // 此时 optCnt <= maxOperations，m 是可能的值
        }
    }

    return r
};

console.log(minimumSize([9], 2))
console.log(minimumSize([2,4,8,2], 4))
console.log(minimumSize([7,17], 2))
console.log(minimumSize([9], 200))