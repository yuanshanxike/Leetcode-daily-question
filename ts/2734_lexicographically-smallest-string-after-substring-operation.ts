/**
 * 从左到右找到不包含 a 的最长字符串字串，将其中每个字母替换为前一个字母
 * @param s 
 */
function smallestString(s: string): string {
    const pattern = /[b-z]+/
    const founds = pattern.exec(s)
    if (founds) {
        const start = founds.index
        const end = start + founds[0].length
        const target = Array.from(founds[0])

        for (let i = 0; i < end - start; i++) {
            target[i] = String.fromCharCode(target[i].charCodeAt(0) - 1)
        }
        return s.substring(0, start) + target.join('') + s.substring(end, s.length)
    } else { // 题目要求当且仅当执行一次操作，也就是即使使得原字符串变大也必须得执行一次
        return s.substring(0, s.length - 1) + 'z'
    }
};

console.log(smallestString('cbabc'))
console.log(smallestString('acbbc'))
console.log(smallestString('leetcode'))
console.log(smallestString('aa'))