function addOperators(num: string, target: number): string[] {
    const len = num.length
    function excOpt(opt: string, a: number, b: number): number {
        switch(opt) {
            case '+':
                return a + b
            case '-':
                return a - b
            case '*':
                return a * b
            default:
                throw console.error('unsupport opt')
        }
    }
    function dfs(pos: number, optArr: string, multPreceArr: number[]): string[] {
        if (pos == len - 1) {
            const multPreceArrTemp = Array.from(multPreceArr)
            // *
            for (let i = len - 1; i > 0; i--) {
                if (multPreceArr[i - 1] != -1) {
                    if (multPreceArr[i] == -1) multPreceArr[i] = +num[i]
                    multPreceArr[i - 1] = excOpt('*', multPreceArr[i - 1], multPreceArr[i])
                }
            }
            // + / -
            const anotherOptNum = (i: number) => multPreceArr[i] == -1 ? +num[i] : multPreceArr[i]
            let sum = anotherOptNum(0)
            for (let i = 1; i < len; i++) {
                if (optArr[i - 1] == '*') continue
                sum = excOpt(optArr[i - 1], sum, anotherOptNum(i))
            }

            console.debug('optArr: ' + optArr + ' sum:' + sum + ' multPreceArr:' + multPreceArr + ' temp:' + multPreceArrTemp)

            multPreceArr.forEach((_, idx, arr) => { arr[idx] = multPreceArrTemp[idx] })  // 恢复现场

            if (target == sum) {
                let expr = ''
                for (let i = 0; i < len; i++) {
                    expr += num[i]
                    if (i < len - 1) expr += optArr[i]
                }
                return [expr]
            }
            return []
        }
        const add = dfs(pos + 1, optArr + '+', multPreceArr)
        const sub = dfs(pos + 1, optArr + '-', multPreceArr)
        multPreceArr[pos] = +num[pos]
        const mult = dfs(pos + 1, optArr + '*', multPreceArr)
        multPreceArr[pos] = -1  // 恢复现场
        return [...add, ...sub, ...mult]
    }

    const multPreceArr = Array(len).fill(-1)
    return dfs(0, '', multPreceArr)
};

// console.log(addOperators('123', 6))
// console.log(addOperators('232', 8))
// console.log(addOperators('3456237490', 9191))
console.log(addOperators('105', 5))