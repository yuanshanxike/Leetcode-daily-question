/**
 * 枚举长度
 * 需要注意的是如果 t 的长度不能整除 s 的长度，则 t 及其若干同位字符串一定不能够连接成 s。
 * 所以我们可以预处理 s.length 的所有非负整数因数，使它们按照从小到大的顺序排列，然后再在这个有序的因子数组上从小到大查找能满足条件的最小 t 的长度。
 * @param s 
 */
function minAnagramLength(s: string): number {
    const n = s.length
    const enableTSizes: number[] = []
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            const j = n / i
            enableTSizes.push(i)
            if (i != j && j != n) enableTSizes.push(j)
        }
    }
    enableTSizes.sort((a, b) => a - b)

    for (const m of enableTSizes) {
        const hashCnt = new Map<number, number>()
        s.substring(0, m)
        for (let i = 0; i < m; i++) {
            const k = s[i].charCodeAt(0) - 'a'.charCodeAt(0)
            const getVal = hashCnt.get(k)
            if (!getVal) {
                hashCnt.set(k, 1)
            } else {
                hashCnt.set(k, getVal + 1)
            }
        }
        
        let isEnable = true
        for (let i = 1; i * m < n; i++) {
            const compHash = new Map(hashCnt)
            for (let j = 0; j < m; j++) {
                const idx = i * m + j
                const k = s[idx].charCodeAt(0) - 'a'.charCodeAt(0)
                const getVal = compHash.get(k)
                if (getVal && getVal > 0) {
                    compHash.set(k, getVal - 1)
                    if (getVal - 1 == 0) compHash.delete(k)
                }
            }
            if (compHash.size != 0) {
                isEnable = false
                break
            }
        }
        if (isEnable) return m
    }
    return s.length
};

console.log(minAnagramLength('abba'))
console.log(minAnagramLength('cdef'))
console.log(minAnagramLength('abbaab'))