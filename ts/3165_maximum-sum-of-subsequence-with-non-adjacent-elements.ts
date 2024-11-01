/**（TLE）
 * 记忆化搜索（改写成动态规划） + 模拟操作
 * 时间复杂度: O(n * m)   *其中，n = nums.length, queries = 
 * @param nums 
 * @param queries 
 * @returns 
 */
// function maximumSumSubsequence(nums: number[], queries: number[][]): number {
//     const n = nums.length
//     const mod = 1e9 + 7

//     /**
//      * 记忆化搜索
//      * dfs(i) 表示从 i 到 n，的后缀中不包含相邻元素子序列的最大和
//      */
//     // let memo: Record<number, number> = {}

//     // function findMaxSum(i: number): number {
//     //     if (i >= n) return 0

//     //     if (memo[i] != undefined) return memo[i]

//     //     let maxSum = 0

//     //     // 当前元素为负数时，一定不选跳过，直接看下一个元素开始的后缀中不包含相邻元素子序列的最大和
//     //     maxSum = findMaxSum(i + 1) % mod  // 非负时，可以选，也可以不选
//     //     if (nums[i] >= 0) {  
//     //         maxSum = Math.max(maxSum, (nums[i] + findMaxSum(i + 2)) % mod)  // 选取，则需要跳过相邻的部分
//     //     }

//     //     memo[i] = maxSum

//     //     return maxSum
//     // }

//     /**
//      * 改写成动态规划
//      * dp[i] 表示 nums 的前 i 个数中不包含相邻元素子序列的最大和。
//      * 根据上面的记忆化搜索一比一翻译出状态转移方程：
//      * dp[i] = max(dp[i - 2] + nums[i], dp[i - 1])
//      * 初始状态：
//      * dp[0] = nums[0] > 0 ? nums[0] : 0
//      */
//     function findMaxSum(): number {
//         const dp = Array(n).fill(0)
//         if (nums[0] > 0) {
//             dp[0] = nums[0]
//         }

//         for (let i = 1; i < n; i++) {
//             dp[i] = Math.max((i >= 2 ? dp[i - 2] : 0) + nums[i], dp[i - 1])
//         }
//         return dp[n - 1]
//     }

//     let ans = 0

//     /**
//      * 这种做法每次更新了 nums 中的一个数字之后，都需要重新计算一遍 dp 数组，导致最终的时间复杂度为 O(n * m).
//      * 注意到其实每次通过 queries[i] 的 pos(i) 更新 nums[pos(i)] 后，并不会对 dp 数组中 pos(i) 前面前面的结果造成影响。
//      * 因此每次只需要从 pos(i) 开始，更新 dp 数组后取 dp[n - 1] 累加即可。
//      * 这种做法可以在一定程度上优化算法速度，但算法的复杂度依然是 O(n * m).
//      * 
//      * 想要一种更快的更新维护做法，可以考虑使用线段树。
//      */
//     for (let i = 0; i < queries.length; i++) {
//         // memo = {}

//         const [pos, x] = queries[i]
//         nums[pos] = x
//         ans = (ans + /*findMaxSum(0)*/findMaxSum()) % mod
//     }
//     return ans
// };

/**（突破 dp 思维）
 * 分治 + 线段树
 * 线段树维护的是一些二分区间，每次修改值需要更新的区间较小，每次修改的复杂度为 O(log(n))；
 * 而如果每次都是修改 dp 数组的后缀区间，每次要修改的区间范围可能很大，平均下来每次修改都是 O(n).
 * 这里直接套用线段树模板。具体每一步(子问题)的构建规则在 maintain 中进行实现。
 * 
 * 对于“打家劫舍”，非‘前缀和 dp’的做法是 分治。
 * 并不能将一个区间简单地一分为二，需要考虑分成的两个区间(连接)交界处的元素选取情况。
 * 按照规则，分成的两个子区间中，左区间的末尾元素和右区间的首个元素是不能够同时选取的。
 * 为了适配这种情况，我们定义了四种状态来表示四种特别的区间状态：
 * ① f00：表示区间的头和尾两个元素都不能选取(0)时，区间内“打家劫舍”的最大值；
 * ② f01：表示区间的头不能选(0)、尾可选可不选(1)时，区间内“打家劫舍”的最大值；
 * ③ f10：表示区间的头可选可不选(1)、尾不能选(0)时，区间内“打家劫舍”的最大值；
 * ③ f11：表示区间的头和尾都可选可不选(1)时，区间内“打家劫舍”的最大值。
 * 那么通过以上四种情况，就可以推导出满足要求的状态转移方程(假设将 f 拆解成 a, b 两个子区间)：
 * ①f00 = max(a01 + b00, a00 + b10)
 * ②f01 = max(a01 + b01, a00 + b11)
 * ③f10 = max(a11 + b00, a10 + b10)
 * ②f11 = max(a11 + b01, a10 + b11)
 * 通过上述状态转移方程作为 maintain 维护线段树，能够在 O(n + m * log(n)) 的时间内完成所有操作。
 */
function maximumSumSubsequence(nums: number[], queries: number[][]): number {
    const n = nums.length
    // 4 个数分别保存 f00, f01, f10, f11
    const t = Array.from({length: 2 << (32 - Math.clz32(n))}, () => [0, 0, 0, 0])

    // 合并左右儿子
    function maintain(o: number) {
        const a = t[o * 2], b = t[o * 2 + 1]
        t[o][0] = Math.max(a[0] + b[2], a[1] + b[0])
        t[o][1] = Math.max(a[0] + b[3], a[1] + b[1])
        t[o][2] = Math.max(a[2] + b[2], a[3] + b[0])
        t[o][3] = Math.max(a[2] + b[3], a[3] + b[1])
    }

    // 用 nums 初始化线段树
    function build(o: number, l: number, r: number) {
        if (l === r) {  // 当区间内只有一个元素时
            t[o][3] = Math.max(nums[l], 0)  // f11 为 max(nums[l], 0)
            // 其余三个数都是 0
            return
        }
        const m = Math.floor((l + r) / 2)
        build(o * 2, l, m)
        build(o * 2 + 1, m + 1, r)
        maintain(o)
    }

    // 把 nums[i] 改成 val
    function update(o: number, l: number, r: number, i: number, val: number) {
        if (l === r) {
            t[o][3] = Math.max(val, 0)
            return
        }
        const m = Math.floor((l + r) / 2)
        if (i <= m) {
            update(o * 2, l, m, i, val)
        } else {
            update(o * 2 + 1, m + 1, r, i, val)
        }
        maintain(o)
    }

    build(1, 0, n - 1)

    let ans = 0;
    for (const [i, x] of queries) {
        update(1, 0, n - 1, i, x)
        ans += t[1][3] // 注意 f11 没有任何限制，也就是整个数组的打家劫舍
    }
    return ans % (1e9 + 7)
}

console.log(maximumSumSubsequence([3,5,9], [[1,-2],[0,-3]]))
console.log(maximumSumSubsequence([0,-1], [[0,-5]]))
console.log(maximumSumSubsequence([0,3,3,3,1,-2], [[4,0],[1,0]]))