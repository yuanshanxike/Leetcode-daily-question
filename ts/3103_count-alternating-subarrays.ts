/**
 * 对于每个连续最长交替子数组，比如 [0,1,0,1,1,1,0] 中的 [0,1,0,1]、[1] 和 [1,0]。
 * 包含长度为 1,2,3,...,n(n 为最长交替子数组本身的长度) 的交替子数组。
 * 以上面的例子具体来说就是 [0,1,0,1] 中包含 [0], [1], [0], [1], [0,1], [1,0], [0,1], [0,1,0], [1,0,1], [0,1,0,1];
 * [1] 中的 [1];
 * [1,0] 中的 [1], [0], [1,0]。
 * 从长度为 n 开始观察：长度为 n 的连续子数组在长度为 n 的数组中只能取到 1 个；
 * 长度为 n - 1 的连续子数组在长度为 n 的数组中能取到 2 个（最前面或最后面空出一格，相当于一开始子数组的头和原数组的头重合，然后向后滑动一格，子数组的尾和原数组的尾重合结束）；
 * 长度为 n - 2 的连续子数组在长度为 n 的数组中能取到 3 个（可以向后移动 2 格，加上初始的一种状态）
 * ......
 * 长度为 1 的连续子数组在长度为 n 的数组中能取到 n 个。
 * 
 * 所以解题的方法是拆分交替子数组，然后对每个拆分项用长度来求等差数列的前 n 项和
 * @param nums 
 * @returns 
 */
function countAlternatingSubarrays(nums: number[]): number {
    let ans = 0
    let pre: number = -1
    let alternateLen = 0
    const caculateLast = () => { // 计算以前一项为右端点的连续最长交替子数组中的 交替子数组 数量
        if (alternateLen > 1) ans += sumPreN(alternateLen)
        else ans += 1 // 单个元素构成的交替子数组
    }
    for (const bit of nums) {
        if (bit != pre) {
            alternateLen++
        } else {
            caculateLast() // 计算前一项...
            alternateLen = 1
        }
        pre = bit
    }
    caculateLast() // 计算最后一项...
    return ans
};

function sumPreN(len: number): number {
    return (len + 1) * len / 2
}