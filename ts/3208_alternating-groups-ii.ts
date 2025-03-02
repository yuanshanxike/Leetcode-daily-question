/**
 * 虽然数组表示的是一个环，但是当我们枚举数组的左边界时，只需要从数组的开始枚举到数组的结尾，就能够确定出所有的交替组。
 * 相较于 3206, 不能把交替组中的值挨个进行比较。先计数找出一个合法的交替数组，然后尝试进行“滑动窗口”，判断下一个瓷砖颜色是否与“滑动窗口”最右端的瓷砖颜色相异，如果是，则找到了新的交替组，统计答案。
 * 否则，包含新的瓷砖的窗口不能够形成“交替组”，可直接将窗口左端点跳到新瓷砖所在位置进行交替组查找。
 * @param colors 
 * @param k 
 */
function numberOfAlternatingGroups(colors: number[], k: number): number {
    const n = colors.length
    let cnt = 0
    let len = 1, redBlue: 0 | 1 = colors[0] as 0 | 1
    let i = 1, times = n - 1 + k - 1  // 窗口的左端点要移动 n - 1 次（一圈），窗口右端点到左端点的距离是 k - 1. 只用一个指针来移动就总共需要移动 n - 1 + k - 1 次
    while (times-- > 0) {
        if ((redBlue ^ colors[i]) == 1) {
            len = Math.min(k, len + 1)
        } else {
            len = 1
        }
        redBlue = colors[i] as 0 | 1

        if (len == k) cnt++

        i = (i + 1) % n
    }

    return cnt
};

console.log(numberOfAlternatingGroups([0,1,0,1,0], 3))
console.log(numberOfAlternatingGroups([0,1,0,0,1,0,1], 6))
console.log(numberOfAlternatingGroups([1,1,0,1], 4))