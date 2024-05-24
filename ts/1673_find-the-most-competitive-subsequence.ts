/**计算后缀最小值坐标。这个坐标尽量靠前(左)会比较好，因为 后 i 项 是包含 后 i + 1 项 的。
 * 每次应当选择尽量靠前的最小的数会更具备竞争力。
 * 而且因为最终选取的数字是需要从左往右按原数组顺序排列的，
 * 对于 k 中的每个数字，在 nums 中所能选取的数字是有着范围限制的：
 * 比如，第一个数字能选取的范围是 [0, nums.length - k], 第二个数字的取数范围是 [1, nums.length - k + 1]，...
 * 第 k - 1 个数字的取数范围是 [k - 1, nums.length - 1]。
 * k 个数从左到右的取数范围就像一个长度为 nums.length - k + 1 的滑动窗口。
 * 但实际上，在每个数字被确定后，其之后的数字也只能在原数组 nums 中这个被选取数字的后面位置进行选取。
 * 
 * 这种不改变原数组中的数字顺序，但又需要获取最值的场景可以考虑使用 单调栈 进行处理：
 * 栈内存放 nums 中的元素。如果栈为空，直接向栈 push 当前的 nums 元素；
 * 如果不为空，需要看当前栈顶元素是否比待入栈元素大。
 * 更大则 pop，直到当前栈顶元素比待入栈元素小或者相等，或者栈为空（栈底指针及以上的部分）。
 * 首先会完成 k 中第一个元素对应取数区间中的元素入栈（和出栈(如果有)）操作，
 * 取栈底元素作为 k 中第一个元素。
 * 此时栈底指针需要向上移动一格（相当于窗口左端滑动），
 * 然后入栈后面的一个数，进行上述比较操作（相当于窗口右端滑动）
 * 
 * 最终，栈内的前 k 个数字组成的数组就是最终所求的答案
 */
function mostCompetitive(nums: number[], k: number): number[] {
    const firstPeekRight = nums.length - k
    const monoStack: number[] = []
    let sbp = 0  // sbp: stack bottom pointer
    const push = function(x: number) {
        while (monoStack.length > sbp && monoStack[monoStack.length - 1] > x) {
            monoStack.pop()
        }
        monoStack.push(x)
    }
    for (let i = 0; i <= firstPeekRight; i++) {
        push(nums[i])
    }
    let r = firstPeekRight + 1
    for (let i = 1; i < k; i++) {
        sbp++
        push(nums[r++])
    }
    return monoStack.slice(0, k)
};

console.log(mostCompetitive([3,5,2,6], 2))
console.log(mostCompetitive([2,4,3,3,5,4,9,6], 4))
console.log(mostCompetitive([71,18,52,29,55,73,24,42,66,8,80,2], 3))