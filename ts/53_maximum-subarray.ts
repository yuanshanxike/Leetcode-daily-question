/**
 * O(n) 动态规划：
 * 定义：dp[i][0/1] 表示只考虑 nums 中前 i 个元素时，选择第 i 项元素(1) 和 不选第 i 项元素(0) 时，非空连续子数组的最大和。
 * 可以知道初始边界值：dp[0][1] = nums[0], dp[0][0] = 0;
 * 状态转移方程：
 * dp[i + 1][0] = max(dp[i][0], dp[i][1])   // 不选第 i + 1 个数字时，其值等于选和不选第 i 个数字两种情况中的最大值
 * dp[i + 1][1] = max(dp[i][1] + nums[i + 1], nums[i + 1]) // 选第 i + 1 个元素时，其值等于选了前一个元素（和前面的元素连续）的和加上第 i + 1 个元素的值，与第 i 个元素没有被选（前面的元素都没有被选）且第 i + 1 个元素作为第一个被选中的元素，两种情况的最大值
 * @param nums 
 */
function maxSubArray(nums: number[]): number {
    const n = nums.length
    const dp = Array.from<number[], [number, number]>({ length: n }, () => [0, 0])
    dp[0][0] = 0, dp[0][1] = nums[0]
    let maxElement = nums[0]  // 需要保证连续子数组非空，也就是即使所有的元素都是负数，也至少需要选择一个。因此可以记录最大元素，都为负数时就只选它
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1])
        dp[i][1] = Math.max(dp[i - 1][1] + nums[i], nums[i])
        maxElement = Math.max(maxElement, nums[i])
    }
    return maxElement < 0 ? maxElement : Math.max(dp[n - 1][0], dp[n - 1][1])
};

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))
console.log(maxSubArray([1]))
console.log(maxSubArray([5,4,-1,7,8]))
console.log(maxSubArray([-1,-1,-1,-1]))

/**
 * 还可以直接一遍遍历，记录值大于 0 的连续子数组和，并每次统计这个数值的最大值。如果这个数值小于 0，则下次重新以新元素的值作为连续子数组和... 重复直至遍历完数组
 */
function maxSubArray1(nums: number[]): number {
    let ans = -Infinity, pre = 0
    for (const num of nums) {
        pre = Math.max(pre + num, num)  // 0 .. i 项的后缀最大值
        ans = Math.max(ans, pre)
    }
    return ans
}

/**
 * 方法三：分治法
 * 时间复杂度：O(log(n))
 */
function maxSubArray2(nums: number[]): number {
    return getStatus(nums, 0, nums.length - 1).mSum;
}

function Status(l: number, r: number, m: number, i: number) {
    this.lSum = l;  // 以 l 为左端点的最大子数组和
    this.rSum = r;  // 以 r 为右端点的最大子数组和
    this.mSum = m;  // l .. r 的最大子数组和
    this.iSum = i;  // 数组和
}

const pushUp = (l: { iSum: number; lSum: number; rSum: number; mSum: number }, r: { iSum: number; lSum: number; rSum: number; mSum: number }) => {
    const iSum = l.iSum + r.iSum;
    const lSum = Math.max(l.lSum, l.iSum + r.lSum);
    const rSum = Math.max(r.rSum, r.iSum + l.rSum);
    const mSum = Math.max(Math.max(l.mSum, r.mSum), l.rSum + r.lSum);  // 最大子数组和可能出现在左子数组、右子数组、跨越中点的情况
    return new Status(lSum, rSum, mSum, iSum);
}

const getStatus = (a: number[], l: number, r: number) => {
    if (l === r) {
        return new Status(a[l], a[l], a[l], a[l]);
    }
    const m = (l + r) >> 1;
    const lSub = getStatus(a, l, m);
    const rSub = getStatus(a, m + 1, r);
    return pushUp(lSub, rSub);
}