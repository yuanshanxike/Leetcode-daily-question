/**
 * 问题抽象后，与 LeetCode 1552 的模型一致
 * @param price 
 * @param k 
 */
function maximumTastiness(price: number[], k: number): number {
    if (k == 2) return Math.max(... price) - Math.min(... price)

    price.sort((a, b) => a - b)
    const n = price.length
    let l = 1, r = Math.floor((price[price.length - 1] - price[0]) / (k - 1))
    while (r >= l) {
        const mid = Math.floor((l + r) / 2)

        let cnt = 1, curIdx = 0
        for (let i = curIdx + 1; i < n; i++) {
            if (price[i] - price[curIdx] >= mid) {
                cnt++
                curIdx = i
            }
        }

        if (cnt >= k) {
            l = mid + 1  // 这里的 mid 是一个可行的方案
        } else {
            r = mid - 1  // mid 过大
        }
    }
    return r
};

console.log(maximumTastiness([13,5,1,8,21,2], 3))
console.log(maximumTastiness([1,3,1], 2))
console.log(maximumTastiness([7,7,7,7], 2))