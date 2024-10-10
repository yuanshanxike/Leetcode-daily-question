/**
 * 用位运算性质来优化暴力枚举子数组(LogTrick)
 * 
 * 暴力做法：
 * 从左往右枚举 i ∈ [0, n) 作为子数组的右边界，
 * 对于每个 i，从右往左枚举 j ∈ [0, i] 作为子数组的左边界。
 * 则通过 [i, j] 能够表示出所有的子数组。（将每次 OR 运算的结果存储在 nums[j] 中，这样既方便进行子数组中的连续求 OR 运算(每次运算的复杂度为 O(1))，又不会影响到右边参与运算的新元素）
 * 优化内层循环：
 * 根据 OR 运算数值不变小原理（也可以看成在二进制位上求并集），剪枝以上的 O(n^2) 循环，时间复杂度优化到：O(n*logU).
 * 因为限制 k <= 10^9 (2^29 < 10^9 < 2^30), 所以 nums 中的子数组 OR 运算结果最多被增大 29 次（从二进制集合的角度看就是最多被放入 29 个 1）.
 * 在上述的‘暴力二重循环’中，如果遇到 nums[i] OR nums[j] 的值没有发生变化，则可以中断内层循环，因为 nums[i] 再 OR nums[0], nums[1], ..., nums[j - 1] 都不会发生变化了，因为在之前的循环中 nums[0], nums[1], ..., nums[j - 1] 中已经保存了与 nums[i] OR 运算的结果（从集合的角度来看，nums[j] 中的 1 在它前面的元素中已经存在）。 
 * @param nums 
 * @param k 
 */
// function minimumDifference(nums: number[], k: number): number {
//     let ans = Infinity
//     const n = nums.length
//     for (let i = 0; i < n; i++) {
//         ans = Math.min(Math.abs(k - nums[i]), ans) // 单独的一个元素也是一个子数组
//         for (let j = i - 1; j >= 0 && (nums[j] | nums[i]) != nums[j]; j--) {
//             nums[j] |= nums[i]
//             ans = Math.min(Math.abs(k - nums[j]), ans)
//         }
//     }
//     return ans
// };

/**
 * 滑动窗口（O(n) 做法）：
 * 由于 OR 运算只增不减，子数组 OR 运算的大小与子数组的长度有关，具有单调性，所以可以使用滑动窗口进行求解（还需要保证元素运算满足结合律）。
 * 但需要注意的是，OR 运算不存在逆运算（影响到元素从窗口中移除），不能简单用一个变量来记录窗口内元素的 OR 运算结果。
 * 可以借助栈来实现 OR 运算的元素 O(1) 的出栈过程。具体来说，因为元素都是从滑动窗口的右边进左边出，我们需要的是栈底在右边，栈顶在左边的从右向左的栈。
 * 从栈底到栈顶的元素每个元素都存储着其一直到栈底部的所有连续元素的 OR 运算结果。这样，右移窗口左端点时只需要右移左指针，右移后左指针指向的元素就是移除前一个元素后，栈中剩余元素 OR 运算的结果。也就达到了从滑动窗口移除元素的效果。
 * 栈内元素的构建是从栈底的上一个元素开始，对当前元素和下面一个元素进行 OR 运算，将运算结果覆盖到当前元素的位置，然后再往栈顶方向移动一位，重复这个操作，直到移动到栈顶(窗口左指针)位置。
 * 这样构建栈内元素就能保证栈内的每个元素保存的值都是从该元素位置到栈底，原数组元素 OR 运算的结果。
 * 每次栈内元素全部弹出后，都需要从窗口右指针的前一位开始，以右指针作为栈底，左指针为栈顶，重新构建栈内元素。
 * 因为窗口的左右指针都是只会向右单向移动，所以保证了每个元素至多入栈/出栈一次，所以具有线性复杂度 O(n).
 * 
 * 此外还需要一个变量 bottom 记录当前栈底的位置。因为元素进入滑窗只是将新元素与上一次滑窗内元素的 OR 运算结果进行一次 OR 运算，所以和传统滑窗一样，可以直接保存到一个变量(rightOr)中.
 * 当滑窗左端点移动到 bottom 右边(left > bottom)时，表明栈内元素都被弹出，需要以 right 为 bottom，left 为栈顶，通过上述方法重构栈内元素，同时将 rightOr 置为 0。
 * 
 * 滑窗内元素的 OR 元素结果可以很方便地通过 nums[left] OR rightOr 计算得出。
 * 
 * 因为本题是要求与 k 最接近的 OR 运算结果与 k 的距离（包括了比 k 大和比 k 小的数。当然也可以等于 k，等于 k 时可以直接返回）。
 * 类似于数学中求极限的方法，在目标值上下波动去逼近目标值。
 * 当滑窗内元素 OR 运算结果 < k 时，右移右端点来使滑窗内元素的 OR 运算结果增大；
 * 当滑窗内元素 OR 运算结果 > k 时，右移左端点来使滑窗内元素的 OR 运算结果减小；
 * == k 时，直接返回结果。
 * 上述过程中维护差值绝对值的最小值。
 * @param nums 
 * @param k 
 */
function minimumDifference(nums: number[], k: number): number {
    let l = 0, bottom = 0, rightOr = 0
    let ans = Infinity
    for (let r = 0; r < nums.length; r++) {  // 右移右指针，增大滑窗内元素 OR 运算结果
        rightOr |= nums[r]
        while (l <= r && (nums[l] | rightOr) > k) {  // 右移左指针，减小滑窗内元素 OR 运算结果
            ans = Math.min(ans, (nums[l] | rightOr) - k) // 更新答案
            l++

            if (l > bottom) {  // 重新构建栈内元素
                rightOr = 0
                bottom = r
                for (let i = bottom - 1; i >= l; i--) {
                    nums[i] |= nums[i + 1]
                }
            }
        }

        if (l <= r) {  // 需要保证在滑窗内有元素的情况下
            // 一定满足 (nums[l] | rightOr) <= k
            if ((nums[l] | rightOr) == k) {
                return 0
            } else {
                ans = Math.min(ans, k - (nums[l] | rightOr)) // 更新答案
            }
        }
    }
    return ans
}

console.log(minimumDifference([1,2,4,5], 3))
console.log(minimumDifference([1,3,1,3], 2))
console.log(minimumDifference([1], 10))