/**
 * 前缀和
 * @param possible 
 * @returns 
 */
function minimumLevels(possible: number[]): number {
    const n = possible.length
    const pos = Array<number>(n + 1).fill(0)
    const neg = Array<number>(n + 1).fill(0)
    possible.forEach((val, idx) => {
        if (val == 1) {
            pos[idx + 1] = pos[idx] + 1
            neg[idx + 1] = neg[idx]
        }
        else if (val == 0) {
            neg[idx + 1] = neg[idx] - 1
            pos[idx + 1] = pos[idx]
        }
    })
    for (let i = 1; i < n; i++) {  // 1-index
        const alice = pos[i] + neg[i]
        const bob = pos[n] - pos[i] + neg[n] - neg[i]
        if (alice > bob) return i
    }
    return -1
};

console.log(minimumLevels([1,0,1,0]))
console.log(minimumLevels([1,1,1,1,1]))
console.log(minimumLevels([0,0]))
console.log(minimumLevels([0,0,1,0]))