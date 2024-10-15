// 任意选择一个楼层丢鸡蛋，鸡蛋碎了需要在更低的楼层中继续尝试，鸡蛋没碎会选择在更高的楼层进行尝试。
// 因为我们提前是不能知道具体的摔蛋结果的，因此以上的两种结果中的最坏情况都需要考虑进来，
// 也就是说最小确认 f 的尝试次数的计算方式为 1 + max(更低层中的最少尝试次数，更高层中的最少尝试次数).
// 一种直观的感觉：可能是用二分查找的方式选择落蛋楼层，然后如果 k(手里蛋的数量) == 2 时用 leetcode 1884 计算出来的 O(1) 公式对剩余区间楼层(当作是一栋新的楼)计算最少尝试次数。
// 但仔细想想，上面的这种直觉方法没有考虑到“在计算更高楼层的区间时，手里的鸡蛋数量并没有减少”，这会使得即使高楼层和低楼层每次被划分的楼层数量即使相同，
// 分别计算出来的所需最少次数也会不同。通常来讲，手里鸡蛋数量多时，可以通过“类似二分的方法”减少落蛋次数，而手里鸡蛋数量少的，会更快第倾向于使用“从低到高逐层落蛋”的方式去查找 f 的确切值。
// 所以这里可以修正一下上面的直觉做法：在 k > 2，每次使用“类似二分”的落蛋方式时，左边(更低楼层)划分出来的楼层数量通常会比右边(更高楼层)划分出来的楼层数量少。（因为很显然最小尝试次数 T 和楼层数量 N 是正相关的，又因为上面也讨论得出了“鸡蛋数量 k 越多越能够使用更少的次数找出 f 的确切值”）
// 这其实是为了让左右区间计算出来的最小尝试次数尽可能相同。（因为计算方式是取左右两边区间的最大值，最小尝试次数 T 和楼层数量 N 是正相关，区间分界线左右移动时，必然会使得其中一个区间对应的 T 增大，另一个区间对应的 T 减小，两者 T 的最大值的最小值会取在两者最接近的时候）
// *这一关系的例子可以看本篇的测试代码

/**
 * 方法一：
 * 记忆化搜索 + 二分
 * @param k 
 * @param n 
 */
// function superEggDrop(k: number, n: number): number {
//     const memo: Record<number, number> = {}

//     function getMemoKey(k: number, x: number) {
//         return x * 100 + k // k 的取值范围为 1 ~ 100 共 100 个数
//     }

//     /**
//      * dfs(k, x) 表示还剩 k 个鸡蛋，从有 x 层的楼的任意层扔下鸡蛋，确定 f 确切的值需要的最小操作次数。
//      * 状态转移方程：dfs(k, x) = 1 + max(dfs(k, n - x), dfs(k - 1, x - 1)). dfs(k, n - x) 表示鸡蛋没有碎，在大于 x 的 n - x 层中进行扔鸡蛋尝试；dfs(k - 1, x - 1) 表示鸡蛋碎了，需要在比 x 更低的楼层中进行尝试。
//      * 在 k 固定的情况下，因为 dfs(k, n - x) 随 x 的增大而单调递减，dfs(k - 1, x - 1) 随 x 的增大而单调递增。
//      * 又因为 dfs(k, n - x) 在 x 的定义域内，最小值是 0；而 dfs(k - 1, x - 1) 没有极限值也是显而易见的，函数值总会随着 x 的增大而增大。
//      * 所以可以得知两个函数在 x 的定义域内存在交点。
//      * 又因为 x 的取值是离散的，交点的位置很可能是在 x1 和 x2 之间。其中 x2 - 1 = x1.
//      * 二分的过程其实就是在寻找距离这个交点最近的两个 x 定义域上的点的过程。
//      * @param k 
//      * @param n 
//      */
//     function dfs(k: number, x: number): number {
//         let ans: number
//         if (!memo[getMemoKey(k, x)]) {
//             if (x == 0) ans = 0
//             else if (k == 1) ans = x  // 只有一个鸡蛋时，只能从低到高依次尝试，最坏情况需要尝试 x 次（遍历完全部楼层）
//             else {
//                 let l = 1, r = x
//                 while (l + 1 < r) {  // 目标：找到一个符合要的的大小为 1 的区间
//                     const mid = (l + r) >> 1 // 尝试从第 mid 层扔鸡蛋

//                     const t1 = dfs(k - 1, mid - 1)  // 蛋碎，接下来需要操作的最少次数
//                     const t2 = dfs(k, x - mid) // 没碎，接下来需要操作的最少次数

//                     if (t1 > t2) {
//                         r = mid  // 蛋碎对应的楼层中最坏情况下需要尝试的次数更多（当前二分到交点的右侧），在比 mid 更低的楼层中计算所需尝试次数（左移、收束二分右边界）
//                     } else if (t1 < t2) {
//                         l = mid  // 没碎对应的计算更高楼层的最坏情况下需要的尝试次数更多（当前二分到交点的左侧），在比 mid 更高的楼层中选择一层楼来计算（右移、收束二分左边界）
//                     } else { // 碎和没碎对应的所需尝试次数一样多（二分到交点处），找到了我们想要的位置，结束查找（二分的左右边界同时收束到一个点处）
//                         l = mid
//                         r = mid
//                     }
//                 }

//                 ans = 1 + Math.min(Math.max(dfs(k - 1, l - 1), dfs(k, x - l)), Math.max(dfs(k - 1, r - 1), dfs(k, x - r)))  // 包含交点的长度为 1 的区间，求左右端点对应值的最小值
//             }

//             memo[getMemoKey(k, x)] = ans
//         }

//         return memo[getMemoKey(k, x)]
//     }

//     return dfs(k, n)
// }

/**
 * 方法二：
 * 方法一是通过二分来优化横坐标上的线性枚举来找到交点的，在递归的过程中也会计算枚举到 1 <= k' <= k 和 1 <= n' <= n 中的每一对值。
 * 因为随着 n' 的增大，确定 f 确切值所需次数也是在增大的。因此可以考虑将方法一中的 递归 改写成 递推。
 * 在 n' 逐渐增大的过程中，dfs(k, n' - x) 与 dfs(k - 1, x - 1) 的交点是逐渐上移的（因为随着 n' 的增大，dfs(k, n' - x) 也会逐渐上移，dfs(k - 1, x - 1) 不变）。
 * 所以当 n' 变得更大时，不需要重新从 1 开始寻找交点，只需要从上一个 n' 对应交点的横坐标处开始枚举即可(与暴力枚举相比，优化掉了一个 O(n) 的复杂度)
 * @param k 
 * @param n 
 */
// function superEggDrop(k: number, n: number): number {
//     // 滚动数组来进行实现
//     let dp1: number[] = Array.from({ length: n + 1 }, (_, idx) => idx)  // 初始为：只有一个鸡蛋时，在 n 层的楼中，确认 f 的最少尝试次数等于 n
//     for (let i = 2; i <= k; i++) {
//         const dp = Array(n + 1).fill(0)
//         let x = 1;  // 对于每次增加到的鸡蛋数 K, 从第 1 层开始寻找交点 
//         for (let j = 1; j <= n; j++) {
//             // 把 O(n) 的查找
//             // let minVal = Infinity
//             // for (let m = 1; m <= j; m++) {
//             //     minVal = Math.min(minVal, Math.max(dp[j - m], dp1[m - 1]) + 1)
//             // }
//             // dp[j] = minVal

//             // 优化为 O(1). 在相同鸡蛋数量 K 的前提下，只需要第一次遍历找到函数 Math.max(dp[N - x], dp1[x - 1]) 的最小值（函数图像的 V 字拐点），接下来随着 N 的增大，只需要从上次确认的位置往后遍历就能找到新的交点位置。
//             while (x < j && Math.max(dp[j - x], dp1[x - 1]) >= Math.max(dp[j - (x + 1)], dp1[x + 1 - 1])) { // 最后一项不等式既是在找两个子函数的交点，同时也是再找我们需要的“最小的最大值”
//                 x++
//             }

//             dp[j] = Math.max(dp[j - x], dp1[x - 1]) + 1
//         }

//         dp1 = dp
//     }
//     return dp1[n]
// }

/**
 * 方法三：
 * 逆向思维：通过限制 k 个鸡蛋 和 最多扔 t 次(所需求解答案)，来反推可以确定 f 楼层的层数 > n
 * (可以记忆化优化，不进行记忆化也能通过)
 * @param k 
 * @param n 
 */
function superEggDrop(k: number, n: number): number {
    const memo: Record<number, number> = {}

    function getMemoKey(k: number, t: number) {
        return t * 100 + k // k 的取值范围为 1 ~ 100 共 100 个数
    }

    function calcF(k: number, t: number): number {
        if (k == 1 || t == 1) return t + 1   // 如果只有一个鸡蛋，只能确定 t + 1 层楼层(0-index)，如果只有一次机会，只能从 1 层去扔 1 个鸡蛋，确定 0 和 1 两层是否为 f.
        if (memo[getMemoKey(k, t)]) return memo[getMemoKey(k, t)]
        const ans = calcF(k - 1, t - 1) /*蛋碎*/ + calcF(k, t - 1) /*没碎*/
        memo[getMemoKey(k, t)] = ans
        return ans
    }

    let t = 1
    while (calcF(k, t) < n + 1) {
        t++
    }
    return t
}

console.log(superEggDrop(1, 2))
console.log(superEggDrop(2, 6))
console.log(superEggDrop(3, 14))
console.log(superEggDrop(3, 15))
console.log(superEggDrop(3, 2))
console.log(superEggDrop(3, 4))
console.log(superEggDrop(3, 8))
console.log(superEggDrop(3, 9))

console.log(superEggDrop(2, 10)) // 11 - 1 = 10，左，剩余 2 个鸡蛋可用
console.log(superEggDrop(3, 14)) // 25 - 11 = 14，右，剩余 3 个鸡蛋可用
console.log(superEggDrop(3, 25)) // 第一次选第 11 层，可以使得之后左右两边确认所需的次数相等

console.log(superEggDrop(2, 10)) // 1 + 2 + 3 + 4 = 10
console.log(superEggDrop(1, 5 - 1)) // 5 

console.log(superEggDrop(2, 15)) // 1 + 2 + 3 + 4 + 5 = 15
console.log(superEggDrop(1, 6 - 1)) // 6 