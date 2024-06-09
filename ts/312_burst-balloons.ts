/**
 * 如果暴力对每次戳破的气球进行模拟，会多次对相同的区间重复计算“戳破其中所有气球能得到的最大硬币数”，比如：
 * 最后还剩 头、尾 两个气球，最后的戳气球顺序是 头、尾 或者 尾、头，中间的 [1, n - 2] 个气球 “全被戳破能获得的最大硬币数” 这一问题是被重复计算了两次的。
 * 对于中间的 [1, n - 2] 个气球同样存在这个问题：有更小的子区间被重复计算。
 * 所以区间规模可以进一步减小，直到区间只有 3 个元素，表示刚开始还没抽破气球时候的状态，这时候抽破任意一个气球，能获得的硬币数直接等于其对应的数值和左右两个气球对应数值的乘积。
 * 所以可以考虑记忆化递归或者递推，但是这道题目的情景下，记忆化递归需要从原数组开始，选择最后一个被戳破的气球，再往前枚举倒数第二个被戳破、倒数第三个被戳破、... 第一个被戳破。
 * 每次枚举都会使得数组中产生“空隙”，不便于计算，所以更简洁的方式是自底向上的递推：
 * 
 * 区间 dp：
 * 先计算相邻的三个数（包括左右边界）构成的区间（开区间，实际只包含中间的数），戳破中间的气球能够得到的最大硬币数，也就是它们的乘积；
 * 接着。区间大小扩大 1，计算中间两个气球被戳破能获得的最大硬币数，然后接着是中间三个气球被戳破能的到的最大硬币数....
 * 
 * 每次计算当前长度的区间所能获得的最大硬币数时，是枚举区间中的每一个元素作为该区间最后删除的一个元素，计算其与区间左右边界(开区间的左右边界)的乘积作为该区间最后戳破该气球所能得到的硬币数，
 * 再加上之前计算所存储的更小区间所能获取的硬币最大数量，记录下它们中的最大值。
 * 设开区间为 (i, j)，当前枚举到 k (i < k < j)，需要求 max(nums[i] * nums[k] * nums[j] + dp[i][k] + dp[k][j])。
 * 其中 dp[i][j] 表示 (i, j) 这个开区间中所有气球被全部戳破所能得到的最大硬币数。
 * 
 * 实际实现时，如果是 0-index 开区间会出现 (-1, r) 这种情况，所以我们可以将 dp 数组整体右移一位，使用 (0, n + 1) 这个开区间。
 * @param nums 
 */
function maxCoins(nums: number[]): number {
    const n = nums.length
    const dp = new Array<Array<number>>(n + 2)
    for (let i = 0; i < n + 2; i++) {
        const arr = new Array<number>(n + 2)
        arr.fill(0)
        dp[i] = arr
    }
    // dp[x][x + 1] 这样的开区间没有实际包含元素，值都为 0
    for (let len = 1; len <= n; len++) {
        for (let i = 1; i <= n - (len - 1); i++) {
            const l = i - 1
            const r = i + len
            const first = l - 1 < 0 ? 1 : nums[l - 1]
            const last = r - 1 >= n ? 1 : nums[r - 1]
            for (let k = i; k < r; k++) {
                dp[l][r] = Math.max(dp[l][r], first * last * nums[k - 1] + dp[l][k] + dp[k][r])
            }
        }
    }
    return dp[0][n + 1]
};

console.log(maxCoins([3,1,5,8]))
console.log(maxCoins([1,5]))