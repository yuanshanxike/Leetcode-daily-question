/**
 * 二分查找
 * 因为题目有提到“每个元素都会出现两次，唯有一个数只会出现一次”，且数组本身是有序的，所以可以二分查找唯一的单个元素。
 * 查找时，单个元素一定是在 [l, maxIdx(nums[mid])] 和 [minIdx(nums[mid]), r] 中，元素个数为奇数个的区间中。
 * 选中元素个数为奇数的区间继续二分查找。
 * @param nums 
 */
function singleNonDuplicate(nums: number[]): number {
    let l = 0, r = nums.length - 1
    while (l < r) {
        const mid = Math.floor((l + r) / 2)
        let isDouble = false
        if (mid + 1 <= r && nums[mid + 1] == nums[mid]) {
            if ((mid + 1 - l + 1) % 2) {
                r = mid + 1 - 2
            } else {
                l = mid + 1 + 1
            }
            isDouble = true
        } else if (mid - 1 >= l && nums[mid - 1] == nums[mid]) {
            if ((r - (mid - 1) + 1) % 2) {
                l = mid - 1 + 2
            } else {
                r = mid - 1 - 1
            }
            isDouble = true
        }

        if (!isDouble) return nums[mid]
    }

    return nums[l]
};

console.log(singleNonDuplicate([1,1,2,3,3,4,4,8,8]))
console.log(singleNonDuplicate([3,3,7,7,10,11,11]))