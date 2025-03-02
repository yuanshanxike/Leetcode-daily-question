/**
 * 桶排序
 * @param nums 
 * @param indexDiff 
 * @param valueDiff 
 */
function containsNearbyAlmostDuplicate(nums: number[], indexDiff: number, valueDiff: number): boolean {
    const n = nums.length
    const size = valueDiff + 1  // 每个桶的大小为：够容纳最大差值为 valueDiff 的两个数
    const bucketMap = new Map<number, number>()  // 维护第 i - k + 1 ... i 个桶中存储的数字（每个桶中只会有最多一个数字，因为如果有两个或更多数字，则一定在之前就被返回 true 了）

    function getIdx(x: number): number {
        return x >= 0 ? Math.floor(x / size) : Math.floor((x + 1) / size) - 1
    }

    for (let i = 0; i < n; i++) {
        const u = nums[i]
        const bIdx = getIdx(u)
        if (bucketMap.has(bIdx)) return true  // 被放入到一个已存在数字的桶时返回 true
        const l = bIdx - 1
        if (bucketMap.has(l) && u - bucketMap.get(l)! <= valueDiff) return true  // 左边桶中的数字与当前数字的差值小于等于 valueDiff 时返回 true
        const r = bIdx + 1
        if (bucketMap.has(r) && bucketMap.get(r)! - u <= valueDiff) return true  // 右边桶中的数字与当前数字的差值小于等于 valueDiff 时返回 true

        bucketMap.set(bIdx, u)  // 将当前数字放入桶中
        if (i >= indexDiff) bucketMap.delete(getIdx(nums[i - indexDiff]))  // 移除下一次循环中超出 index 限制的桶 
    }
    return false
};

console.log(containsNearbyAlmostDuplicate([1,2,3,1], 3, 0))
console.log(containsNearbyAlmostDuplicate([1,5,9,1,5,9], 2, 3))