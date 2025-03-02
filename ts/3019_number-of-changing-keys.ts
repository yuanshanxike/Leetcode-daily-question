/**
 * 将大写字母和小写字母分别转换成相对于 'A' 和 'a' 偏移的数值，使得字符串变为数组，
 * 问题转换成了比较字符串中相邻的两个数字是否相同
 * @param s 
 */
function countKeyChanges(s: string): number {
    const arr = [... s].map((letter) => letter.charCodeAt(0) < 'a'.charCodeAt(0) ? letter.charCodeAt(0) - 'A'.charCodeAt(0) : letter.charCodeAt(0) - 'a'.charCodeAt(0))
    let cnt = 0
    for (let i = 0; i < s.length - 1; i++) {
        if (arr[i] != arr[i + 1]) cnt++
    }
    return cnt
};

console.log(countKeyChanges('aAbBcC'))
console.log(countKeyChanges('AaAaAaaA'))