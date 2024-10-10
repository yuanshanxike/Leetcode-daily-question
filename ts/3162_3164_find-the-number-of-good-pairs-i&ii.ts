/**方法一：因数分解，枚举因子 */
// function numberOfPairs(nums1: number[], nums2: number[], k: number): number {
//     const factorCnt: Record<number, number> = {}
//     for (const num of nums1) {
//         if (num % k == 0) {
//             const target = num / k
//             for (let i = 1; i * i <= target; i++) {  // O(√num)
//                 if (target % i) continue
//                 if (!factorCnt[i]) 
//                     factorCnt[i] = 1 
//                 else 
//                     factorCnt[i]++

//                 if (i * i < target) {
//                     const j = target / i
//                     if (!factorCnt[j])
//                         factorCnt[j] = 1
//                     else
//                         factorCnt[j]++
//                 }
//             }
//         }
//     }
//     let ans = 0
//     for (const num of nums2) {
//         if (factorCnt[num]) {
//             ans += factorCnt[num]
//         }
//     }
//     return ans
// };

/**方法二：枚举 nums2 中出现数的倍数。需要两个哈希表 */
function numberOfPairs(nums1: number[], nums2: number[], k: number): number {
    const dividedByKCnt: Record<number, number> = {}
    const bCnt: Record<number, number> = {}
    let maxDividedByK = 0
    for (const num of nums1) {
        if (num % k == 0) {
            const target = num / k
            maxDividedByK = Math.max(maxDividedByK, target)
            if (!dividedByKCnt[target])
                dividedByKCnt[target] = 1
            else 
                dividedByKCnt[target]++
        }
    }

    if (maxDividedByK == 0) return 0

    for (const num of nums2) {
        if (!bCnt[num])
            bCnt[num] = 1
        else
            bCnt[num]++
    }

    let ans = 0
    for (const val in bCnt) {
        let multCnt = 0
        for (let i = 0; i * +val <= maxDividedByK; i++) {
            const target = i * +val
            if (dividedByKCnt[target]) {
                multCnt += dividedByKCnt[target]
            }
        }
        ans += multCnt * bCnt[val]
    }
    return ans
}

console.log(numberOfPairs([1,3,4], [1,3,4], 1))
console.log(numberOfPairs([1,2,4,12], [2,4], 3))