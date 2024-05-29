/**寻找的是“非空连续字符串”，那么可以很自然地想到使用滑动窗口。
 * 需要连续出现至少三次，那么滑动窗口的长度上限是 s.length - 2,
 * 下限是 1。
 * 暴力穷举滑动窗口并滑动的时间复杂度是 O(n^2)。
 * 优化：
 * 如果在上下限之间二分查找适合的最大滑动窗口长度，时间复杂度是 O(nlogn) 
 */
function maximumLength(s: string): number {
    const n = s.length
    let l = 1, r = n - 2 // 初始化滑动窗口的上界和下界
    let maxLength = -1 // 更新合法的滑动窗口最大长度
    while (l <= r) {
        hashCount.clear() // 对于每个新的滑动窗口的长度，需要清空之前的 hash 计数
        let mid = Math.floor((l + r) / 2) // 新窗口的长度
        let lastAlphabet = ''
        let seriesLength = 0
        // 填充滑动窗口 + 滑动窗口   (计数)
        for (let i = 0; i < n; i++) {
            if (s[i] == lastAlphabet) {
                seriesLength++
            } else {
                lastAlphabet = s[i]
                seriesLength = 1
            }

            if (i >= mid - 1 && seriesLength >= mid) { // 满足左边的条件表示开始滑动窗口（包含刚填充满滑动窗口时的状态）
                if (count(lastAlphabet) == 3) { // 满足至少出现 3 次的条件
                    maxLength = mid  // 更新合法长度
                    l = mid + 1  // 可以更激进一些看看更长的长度是否符合
                    break  // 剪枝结束当前长度的查找
                }
            }
        }

        if (l != mid + 1) {  // 当前不是满足条件的窗口长度
            r = mid - 1  // 减小长度上限
        }
    }
    return maxLength
};

const hashCount = new Map<string, number>() // 对相同字符填满滑动窗口的 hash 计数

/**
 * @return 计数更新结果
 */
function count(alphabet: string): number {
    if (hashCount.has(alphabet)) {
        let oldVal = hashCount.get(alphabet)
        let newVal = oldVal!! + 1
        hashCount.set(alphabet, newVal)
        return newVal
    } else {
        hashCount.set(alphabet, 1)
        return 1
    }
}

console.log(maximumLength('aaaa'))   // 2
console.log(maximumLength('abcdef')) // -1
console.log(maximumLength('abcaba')) // 1  
