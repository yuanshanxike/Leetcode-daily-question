/**
 * [越短越合法型]滑动窗口
 * 随着滑动窗口右端点的增大，使得窗口中的 0,1 数量合法的最小左端点也会随之而增大，具有单调性，因此可以使用滑动窗口计算。
 * 每次滑动窗口左右端点时，统计 0 和 1 的数量，每次确认了最小左端点 l 时，更大（离右端点更近）的左端点一定都是符合要求的，将分别以 l, l+1, l+2, ..., r-1, r 作为左端点的滑动窗口共 r - l + 1 个数量加入到答案中。
 * @param s 
 * @param k 
 */
function countKConstraintSubstrings(s: string, k: number): number {
    let ans = 0
    let l = 0, r = 0
    const cnt = [0 , 0]    // 利用“字符 0 的 ASCII 值是偶数，字符 1 的 ASCII 值是奇数”这一性质优雅地进行计数
    while (r < s.length) {
        cnt[s[r].charCodeAt(0) & 1]++

        while (l < r && cnt[0] > k && cnt[1] > k) {
            cnt[s[l].charCodeAt(0) & 1]--
            l++
        }

        // 此时满足当前右端点下的最小左端点
        ans += r - l + 1

        r++
    }
    return ans
};

console.log(countKConstraintSubstrings('10101', 1))
console.log(countKConstraintSubstrings('1010101', 2))
console.log(countKConstraintSubstrings('11111', 1))

namespace L3261 {
    /**
     * 在上述讨论滑动窗口结论的基础上，我们知道：
     * 对于每一个滑动窗口的右端点，都可以求出其最小左端点（对应当前右端点时，最大的合法子字符串的窗口长度）。
     * 这个窗口内的所有 子字符串 都是 “满足 k 约束” 的。（因为当前窗口内的所有的后缀串都是 “满足 k 约束” 的，那么从这些后缀字符串中删掉一部分后缀后，剩余的子字符串仍然是 “满足 k 约束” 的。而 所有后缀字符串 和 删除了任意长度后缀的非空字符串 共同组成了这个窗口中的所有 子字符串）
     * 而枚举某个子字符串是通过枚举长度为 1, 2, 3, ..., n - 1, n 的字符串得到的，每种长度对应可以枚举的数量为 n, n - 1, n - 2, ..., 2, 1 个，通过等差数列公式可得到子字符串的枚举数量为 (1 + n) * n / 2.
     * 设对于每一个右端点 i，其对应的最小左端点是 left[i]，通过数组可以达成从窗口右端点到窗口的最小左端点的映射。
     * 数组 left[i] 是有序的。
     * 对于 queries [l, r] 中 r 对应的 left[r]，分类讨论：
     * ① 如果 left[r] <= l, 则表明 [l, r] 中的所有子字符串都是合法的，那么可以直接计算出数量为 (1 + (r - l + 1)) * ((r - l + 1) - 1 + 1) / 2.
     * ② 如果 left[r] > l, 则需要从右往左寻找一个 j，使得 left[j] 刚好是第一个小于 l 的数（可以使用二分查找快速定位 j）。此时分左右区间进行讨论：
     *   a. 左边 [l, j] 中所有的子字符串都是合法的，可以直接计算出数量为 (1 + (j - l + 1)) * ((j - l + 1) - 1 + 1) / 2.
     *   b. 右边 [j + 1, r] 中的任意元素 i，都满足 left[i] >= l, 需要计算 i - left[i] + 1 的累加和。（前缀和可以实现区间查询的快速计算）
     * a + b 的结果就是情况 ② 中的合法子字符串数量。
     * 
     * 可以将 二分查找 换成 预处理，计算出每一个左端点 l 对应的最大 j, 满足 left[j] < l. 因为 left 是有序的, 预处理的过程可以使用双指针进行。
     * @param s 
     * @param k 
     * @param queries 
     */
    function countKConstraintSubstrings(s: string, k: number, queries: number[][]): number[] {
        const n = s.length
        const left = Array(n).fill(0)
        const rPrefixSum = Array(n + 1).fill(0)
        const l2j = Array(n).fill(0)  // l 到 j 的映射，满足使得 left[j] < l 成立的 j 的最大值
        let l = 0, r = 0
        const cnt = [0, 0]
        while (r < s.length) {
            cnt[s[r].charCodeAt(0) & 1]++

            while (l < r && cnt[0] > k && cnt[1] > k) {
                cnt[s[l].charCodeAt(0) & 1]--
                l2j[l] = r - 1  // 因为需要满足 left[j] < l, 所以当前被移动 pass 掉的左指针 l 对应的合法子字符串的最右边界一定是等于上一次右指针 r 所指向的位置 r - 1
                l++
            }

            left[r] = l
            rPrefixSum[r + 1] = rPrefixSum[r] + r - l + 1

            r++
        }

        const ans: number[] = []
        for (const [l, r] of queries) {
            if (l >= left[r]) {
                ans.push((r - l + 2) * (r - l + 1) / 2)
            } else {
                const j = l2j[l]
                ans.push((j - l + 2) * (j - l + 1) / 2 + rPrefixSum[r + 1] - rPrefixSum[j + 1])
            }
        }
        return ans
    };

    console.log(countKConstraintSubstrings("0001111", 2, [[0,6]]))
    console.log(countKConstraintSubstrings("010101", 1, [[0,5],[1,4],[2,3]]))
    console.log(countKConstraintSubstrings("00", 1, [[0,0],[0,1],[1,1]]))
}