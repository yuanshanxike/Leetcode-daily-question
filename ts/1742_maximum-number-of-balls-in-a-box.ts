function countBalls(lowLimit: number, highLimit: number): number {
    let maxCnt = 0
    const cntMap = new Map<number, number>()
    for (let i = lowLimit; i <= highLimit; i++) {
        let target = 0, j = i
        while (j > 0) {
            target += j % 10
            j = Math.floor(j / 10)
        }

        const prev = cntMap.get(target) ?? 0
        cntMap.set(target, prev + 1)
        maxCnt = Math.max(maxCnt, prev + 1)
    }
    return maxCnt
};

console.log(countBalls(1, 10))
console.log(countBalls(5, 15))
console.log(countBalls(19, 28))