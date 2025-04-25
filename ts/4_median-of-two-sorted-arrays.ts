/**
 * 双指针 O(m + n)
 * 中位数可以将原数组划分为两个等长的数组。
 * 利用这一性质，维护两个等长的分组，来确定 nums1 和 nums2 中正确的划分位置。
 * @param nums1 
 * @param nums2 
 */
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1] 
    }

    const m = nums1.length, n = nums2.length
    // 加入哨兵（适配一个数组中的最小元素比另一个数组所有元素都大的情况）
    nums1.unshift(-Infinity)
    nums1.push(Infinity)
    nums2.unshift(-Infinity)
    nums2.push(Infinity)

    // 枚举 nums1 中有 i 个数在第一组
    // 那么 nums2 中有 ⌈m + n⌉ / 2 - i 个数在第一组中
    let i = 0, j = Math.ceil((m + n) / 2)
    while (true) {
        if (nums1[i] <= nums2[j + 1] && nums1[i + 1] > nums2[j]) {
            const max1 = Math.max(nums1[i], nums2[j])  // 第一个分组的最大值
            const min2 = Math.min(nums1[i + 1], nums2[j + 1])  // 第二个分组的最小值
            return (m + n) % 2 ? max1 : (max1 + min2) / 2
        }
        // 保证两个分组中的元素个数始终相等
        i++
        j--
    }
};


/**
 * 二分 O(log(min(m, n)))
 * 基于上述做法，可以知道：
 * i 越小越能满足 nums1[i] <= nums2[j + 1] (j = ⌈m + n⌉ / 2 - i),
 * 由于在 m 的开头插入了 -∞，所以当 i == 0 时，nums1[i] <= nums2[j + 1] 一定是成立的；
 * 由于在 m 的末尾插入了 +∞，所以当 i == m + 1 时，nums1[i] <= nums2[j + 1] 一定是不成立的。
 * 所以可以使用二分查找确定刚好使得 nums1[i] <= nums2[j] 成立的右边界。
 * @param nums1 
 * @param nums2 
 */
function findMedianSortedArrays1(nums1: number[], nums2: number[]): number {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1] 
    }

    const m = nums1.length, n = nums2.length
    nums1.unshift(-Infinity)
    nums1.push(Infinity)
    nums2.unshift(-Infinity)
    nums2.push(Infinity)

    let l = 0, r = m + 1  // i 的取值范围
    // 左开右闭区间
    while (l < r) {
        const mid = Math.ceil((l + r) / 2)
        if (nums1[mid] <= nums2[Math.ceil((m + n) / 2) - mid + 1]) {
            l = mid
        } else {
            r = mid - 1
        }
    }

    const i = l, j = Math.ceil((m + n) / 2) - i
    const max1 = Math.max(nums1[i], nums2[j])
    const min2 = Math.min(nums1[i + 1], nums2[j + 1])
    return (m + n) % 2 ? max1 : (max1 + min2) / 2
}

console.log(findMedianSortedArrays1([1,3], [2]))
console.log(findMedianSortedArrays1([1,2], [3, 4]))