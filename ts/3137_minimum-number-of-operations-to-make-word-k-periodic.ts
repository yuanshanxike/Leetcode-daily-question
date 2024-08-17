/**哈希计数 */
function minimumOperationsToMakeKPeriodic(word: string, k: number): number {
    const map: Record<string, number> = {}
    const n = word.length
    let maxTimes = 0
    for (let i = 0; i < n; i += k) {
        const s = word.substring(i, i + k)
        if (map[s]) {
            map[s]++
            maxTimes = Math.max(maxTimes, map[s])
        } else {
            map[s] = 1
            maxTimes = Math.max(maxTimes, 1)
        }
    }
    return word.length / k - maxTimes
};

console.log(minimumOperationsToMakeKPeriodic("leetcodeleet", 4))
console.log(minimumOperationsToMakeKPeriodic("leetcoleet", 2))