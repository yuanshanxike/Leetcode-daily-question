function temperatureTrend(temperatureA: number[], temperatureB: number[]): number {
    let len = temperatureA.length
    for (const i in temperatureA) {
        temperatureA[+i] = temperatureA[+i] == temperatureA[+i + 1] ? 0 :
            temperatureA[+i] < temperatureA[+i + 1] ? 1 : -1
        temperatureB[+i] = temperatureB[+i] == temperatureB[+i + 1] ? 0 :
            temperatureB[+i] < temperatureB[+i + 1] ? 1 : -1
    }
    temperatureA.splice(len - 1, 1)
    temperatureB.splice(len - 1, 1)
    len--

    let ans = 0
    const judge = (idx: number) => idx < len && temperatureA[idx] == temperatureB[idx]
    for (let i = 0; i < len; i++) {
        var seq = 0
        while (judge(i)) {
            seq++
            i++
        }
        ans = Math.max(ans, seq)
    }
    return ans
};

console.log(temperatureTrend([21,18,18,18,31], [34,32,16,16,17]))
console.log(temperatureTrend([5,10,16,-6,15,11,3], [16,22,23,23,25,3,-16]))