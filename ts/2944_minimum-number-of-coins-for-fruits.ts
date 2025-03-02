// /**
//  * 记忆化搜索
//  * 时间复杂度：O(n^2)
//  * @param prices 
//  */
// function minimumCoins(prices: number[]): number {
//     const n = prices.length
//     const memo = Array(n).fill(0)

//     function dfs(i: number): number {
//         if ((i + 1) * 2 >= n) return prices[i]  // 当后续所有的水果都能作为奖励免费获得时，就可以停止递归，没必要再去花钱购买
//         if (memo[i] !== 0) return memo[i]

//         let res = Infinity
//         const pos = i + 1
//         // 当前购买第 i 个水果，尝试找出下一步购买后续的 i + 1 个水果中的哪一个能使得开销最少
//         for (let j = pos + 1; j <= Math.min(pos * 2 + 1, n); j++) {
//             res = Math.min(res, prices[i] + dfs(j - 1))
//         }
//         res = res < Infinity ? res : prices[i]
//         memo[i] = res
//         return res
//     }
//     return dfs(0)
// };

/**
 * 记忆化递归可以 1:1 翻译成递推。
 * 观察递推的状态转移方程（和递归的状态转移方程没有本质区别），min(prices[i + 1], ..., prices[2 * i + 1]) 通过滑动窗口求最小值来降低求解单个状态的复杂度。
 * 因为 [i + 1, 2 * i + 1] 的左右端点都会随着 i 的减小而减小，是严格的左移滑动窗口。
 * 而求滑动窗口最值最高效的方法是单调队列。
 * 时间复杂度：O(n)
 * @param prices 
 */
function minimumCoins(prices: number[]): number {
    const n = prices.length
    const q: [idx: number, f: number][] = []
    q.push([n, 0])
    for (let i = n - 1; i >= 0; i--) {
        while (q[q.length - 1][0] + 1 > (i + 1) * 2 + 1) {  // 右边离开窗口
            q.pop()
        }
        const f = prices[i] + q[q.length - 1][1]
        while (f <= q[0][1]) {
            q.shift()
        }
        q.unshift([i, f])  // 左边进入窗口
    }
    return q[0][1]
}
  
console.log(minimumCoins([3, 1, 2]));
console.log(minimumCoins([1, 10, 1, 1]));
console.log(minimumCoins([26, 18, 6, 12, 49, 7, 45, 45]));

