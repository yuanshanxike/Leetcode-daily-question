function clearDigits(s: string): string {
    // const n = s.length
    // const deleteIdxSet = new Set<number>()  // 删除标记下标集合
    // const abcStack: number[] = [] // 存放字母下标
    // for (let i = 0; i < n; i++) {
    //     const c = s[i]
    //     if ('0'.charCodeAt(0) <= c.charCodeAt(0) && c.charCodeAt(0) <= '9'.charCodeAt(0)) {
    //         // 遇到的是数字字符，如果字母栈不为空，则可以与出栈的栈顶元素一起加入到 set 中，标记删除
    //         if (abcStack.length > 0) {
    //             deleteIdxSet.add(abcStack.pop()!)
    //             deleteIdxSet.add(i)
    //         }
    //     } else { // 遇到的是非数字字符
    //         abcStack.push(i)
    //     }
    // }
    // const output: string[] = []
    // for (let i = 0; i < n; i++) {
    //     if (!deleteIdxSet.has(i)) {
    //         output.push(s[i])
    //     }
    // }
    // return output.join('')


    
    // 省略哈希表的做法（遇到可以删除的元素时进行出栈操作）
    const stack: string[] = []

    function isDigit(c: string): boolean {
        return c.length == 1 && '0'.charCodeAt(0) <= c.charCodeAt(0) && c.charCodeAt(0) <= '9'.charCodeAt(0)
    }

    for (const c of s) {
        if (isDigit(c)) {
            // 遇到的是数字字符，如果栈不为空，且栈顶为非数字字符，则可以使得栈顶元素出栈
            if (stack.length > 0 && !isDigit(stack[stack.length - 1])) {
                stack.pop()
            } else {
                stack.push(c)
            }
        } else { // 遇到的是非数字字符
            stack.push(c)
        }
    }
    return stack.join('')
};

console.log(clearDigits('abc'))
console.log(clearDigits('cb34'))
console.log(clearDigits('1a2b0c'))
console.log(clearDigits('1a2bc'))