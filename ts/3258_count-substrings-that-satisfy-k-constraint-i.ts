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