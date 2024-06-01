/**
 * O(n) 一次遍历：
 * 根据给第一个孩子的糖果数的合法分配数量来确定剩余糖果给剩余两个孩子所分配糖果的分界线（隔板）
 */
//function distributeCandies(n: number, limit: number): number {
//    let ans = 0
//    if (n > limit * 3) return ans
//    if (limit > n) limit = n
//    for (let i = 0; i <= limit; i++) {
//        if (n - i <= 2 * limit) { // 给第一个孩子分配 i 颗糖果🍬的情况下，剩余糖果🍬在剩余两个孩子中能够合法分配的情况
//            ans += Math.min(2 * limit - (n - i), n - i) + 1 // 剩余两个孩子都分配 limit 数量的糖果🍬，所出现的重合部分的交集元素数量 与 剩余分配给两个孩子的糖果🍬总数的最小值 
//        }
//    }
//    return ans
//};

/**
 * O(1) 用隔板法，计算所有可能的划分情况，减去所有不合法的情况（只需要分别预留 limit + 1 个糖果🍬给其中一个(或者两个(或者3个))孩子，剩余的糖果再用两个隔板去划分，就能创造出所有不合法的分配情况）。
 * 注意在枚举不合法的情况时，它们彼此之间会有重复的部分（更大的情况会包含限制更多的更小情况），
 * 此时使用 容斥原理 进行去重和补齐，就能计算出所有合法的分配情况数量：
 * https://leetcode.cn/problems/distribute-candies-among-children-i/solutions/2522970/o1-rong-chi-yuan-li-pythonjavacgo-by-end-smj5/?envType=daily-question&envId=2024-06-01
 */
function distributeCandies(n: number, limit: number): number {
    return c2(n + 2) - 3 * c2(n - (limit + 1) + 2) + 3 * c2(n - 2 * (limit + 1) + 2) - c2(n - 3 * (limit + 1) + 2)
}

function c2(n: number): number { // 计算 C(n, 2)
    return n > 1 ? n * (n - 1) / 2 : 0
}

console.log(distributeCandies(5, 2))
console.log(distributeCandies(3, 3))
console.log(distributeCandies(3, 20))
console.log(distributeCandies(8, 3))
console.log(distributeCandies(8, 6))
console.log(distributeCandies(8, 7))
