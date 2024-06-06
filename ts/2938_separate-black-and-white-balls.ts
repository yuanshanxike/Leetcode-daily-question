// 其实就是冒泡排序的交换次数问题。
// 因为这里只有两种球，只需要求出其中一种球交换到它最终位置所需要的步数，另一种颜色的球就是在这个颜色的球交换完成的同时完成到达最终位置的所有交换
// 这里从后往前遍历，计算黑球的交换次数
function minimumSteps(s: string): number {
    const n = s.length
    let ans = 0
    let targetIdx = n - 1
    for (let i = n - 1; i >= 0; i--) {
        if (s[i] == '1') {
            ans += targetIdx - i
            targetIdx--
        }
    }
    return ans
};

console.log(minimumSteps('101'))
console.log(minimumSteps('100'))
console.log(minimumSteps('0111'))