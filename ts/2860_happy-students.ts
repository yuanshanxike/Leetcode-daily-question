/**
 * 原数组要被分为选和没选两个部分，要使得所选部分每个学生对应的 nums 值严格小于所选人数，未选部分每个学生对应的 nums 值严格大于所选人数。
 * 那么，可以把先将 nums 升序排序，然后从左往右枚举选和不选的分界线，分界线左边（含分界线指向的元素）的学生都被选中，分界线右边的学生都未被选中。
 * 如果满足分界线所指向的元素值严格小于其下标 +1（等于选中人数），分界线后一位元素的值严格大于其下标（等于选中人数），则可以把计数+1.
 * @param nums 
 */
function countWays(nums: number[]): number {
    const n = nums.length
    nums.sort((a, b) => a - b)
    let cnt = 0
    if (0 < nums[0]) cnt++  // 判断都不选的情况
    if (n > nums[n - 1]) cnt++ // 判断都选上时的情况
    for (let i = 0; i < n - 1; i++) {
        if (nums[i] < i + 1 && i + 1 < nums[i + 1]) cnt++
    }
    return cnt
};

console.log(countWays([1,1]))
console.log(countWays([6,0,3,3,6,7,2,7]))
