/**
 * 记忆化搜索
 * 考虑 perm 中最后一个数字取不同值的情况：
 * ①假设最后一个数字取剩余数字(一开始为 0...n-1)中的最大值(一开始为 n - 1)，那么前面的数字与其构成逆序的数量为 k = 0，如果 requirements 中在 i == n - 1 处有要求 [i, j]，那么剩余的 j - k(0) 个逆序对就需要在 0...i-1 的区间中取寻找；
 * ②假设最后一个数字取剩余数字(一开始为 0...n-1)中的次大值(一开始为 n - 2)，那么前面的数字与其构成逆序的数量为 k = 1（n - 1 一定在其前面，可以和其构成逆序），如果 requirements 中在 i == n - 1 处有要求 [i, j]，那么剩余的 j - k(1) 个逆序对就需要在 0...i-1 的区间中取寻找；
 * ....
 * 假设最后一个数字取剩余数字(一开始为 0...n-1)中的最小值(一开始为 0)，那么前面的数字与其构成逆序的数量为 k = n - 1，如果 requirements 中在 i == n - 1 处有要求 [i, j]，那么剩余的 j - k(n - 1) 个逆序对就需要在 0...i-1 的区间中取寻找。
 * 
 * 上述原问题都能够拆解成和原问题相似，规模更小的子问题，可以使用递归进行求解。
 * 而且，我们不用关心最后一个元素具体选的是什么数字。因为能选的数字各不相同，选取不同的数字(大小)，直接决定了最后一个元素构成的逆序对的数量 k。
 * 这样，可以考虑定义 dfs(i, j) 表示在 perm 的 [0...i] 范围内，逆序对数为 j 的排列数。假设 i 前面的元素中，有 k 个元素的值比下标为 i 的元素值大（包含第 i 个元素的逆序对有 k 个），
 * （此时 perm 的第 i 个元素是已确定的）那么就需要 perm 在 [0...i-1] 的范围内有 j - k 对逆序对。
 * 综上，状态转移方程为：
 * dfs(i, j) = (0 <= k <= min(i, j))Σ dfs(i - 1, j - k).
 * 递归边界: dfs(0, 0) = 1 (表示只包含一个元素的前缀中不存在逆序对，所以一定是一个符合要求的排列).
 * 递归入口：dfs(n - 1, reqs[n - 1]).  (题目中有提到 “输入保证至少有一个 i 满足 endi == n - 1”)
 * 其中 reqs 由 requirements 转化而来，reqs[i] 表示要求 perm 中的 [0...i] 的范围内存在的逆序对数量；没有进行数量要求的位置用 -1 表示。显然，一定有 reqs[0] == 0. 
 */
// function numberOfPermutations(n: number, requirements: number[][]): number {
//     const mod = 1e9 + 7
//     const reqs: number[] = Array(n).fill(-1)
//     reqs[0] = 0
//     for (const [end, cnt] of requirements) {
//         reqs[end] = cnt
//     }
//     if (reqs[0] != 0) return 0  // 不存在的情况

//     const memo: Record<number, number> = {}

//     function dfs(i: number, j: number): number {
//         if (i == 0) {
//             if (j == 0) return 1
//             else return 0 // dfs(0, j), j > 0 的排列不存在
//         }

//         const key = j * 300 + i
//         if (memo[key] != undefined) return memo[key]

//         let ans = 0
//         const leftReq = reqs[i - 1]
//         if (leftReq >= 0) {  // 如果遇到下一个更小的前缀区间有被 requirements 限制了逆序对数量的情况。此时，递归到更小的一个子问题就只有一条路径可以走
//             // 不合法情况： ① leftReq > j, 因为更短的前缀中逆序对的数量一定不会增多；② i + leftReq < j，因为如果 更小前缀的逆序对数量 + 当前(第 i 位)选择剩余元素中最小值填入后产生的 i 对逆序对 也没有当前的逆序对 j 多，是非法的情况
//             ans = leftReq <= j && j <= i + leftReq ? dfs(i - 1, leftReq) : 0
//         } else {
//             for (let k = 0; k <= Math.min(i, j); k++) {
//                 ans = (ans + dfs(i - 1, j - k)) % mod
//             }
//         }
//         memo[key] = ans
//         return ans
//     }

//     return dfs(n - 1, reqs[n - 1])
// }

/**
 * 转写成 dp (像 leetcode 629 那样，还可以在此基础上继续通过前缀和来优化时间复杂度，通过滚动数组来优化空间复杂度)
 * dp[i][j] 表示 [0...i] 的排列中，有 j 对逆序对的排列数量。
 * 假设 [0 ... i - 1] 中有 k 个大于下标 i 对应的数存在。(0 <= k <= min(i, j))
 * 状态转移方程为：
 * ① reqs[i - 1] == -1（没有限制）， dp[i][j] = Σ dp[i - 1][j - k]
 * ② else，dp[i][j] = reqs[i - 1] <= j <= i + reqs[i - 1] ? dp[i - 1][reqs[i - 1]] : 0
 * @param n 
 * @param requirements 
 */
function numberOfPermutations(n: number, requirements: number[][]): number {
    const reqs: number[] = Array(n).fill(-1)
    for (const [end, cnt] of requirements) {
        reqs[end] = cnt
    }
    if (reqs[0] > 0) return 0
    reqs[0] = 0
    const m = Math.max(... reqs)  // end == n - 1 对应的最大逆序对数量
    const mod = 1e9 + 7
    const dp = Array.from({ length: n }, () => Array(m + 1).fill(0))
    dp[0][0] = 1
    for (let i = 1; i < n; i++) {
        let [l, r] = [0, m]
        if (reqs[i] >= 0) {
            l = r = reqs[i]  // 如果 requirements 中存在 reqs[i] >= 0 的限制（当前 i 只能通过 reqs[i] 进行状态转移），那么对于当前的 i 只需要计算 dp[i][reqs[i]]，而其余的 dp[i][*] 都是 0 
        }
        for (let j = l; j <= r; j++) {
            for (let k = 0; k <= Math.min(i, j); k++) {
                dp[i][j] = (dp[i][j] + dp[i - 1][j - k]) % mod
            }
        }
    }
    return dp[n - 1][reqs[n - 1]]
};

console.log(numberOfPermutations(3, [[2,2],[0,0]]))
console.log(numberOfPermutations(3, [[2,2],[1,1],[0,0]]))
console.log(numberOfPermutations(2, [[0,0],[1,0]]))
console.log(numberOfPermutations(20, [[5,10],[6,14],[19,90],[18,90],[3,3],[2,1]]))