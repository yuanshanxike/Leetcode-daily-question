function garbageCollection(garbage: string[], travel: number[]): number {
    let sumM = 0, sumP = 0, sumG = 0
    let pathM = [0, 0], pathP = [0, 0], pathG = [0, 0]
    garbage.forEach((g, idx) => {
        for (let c of g) {
            switch (c) {
                case 'M':
                    pathM[1] = idx
                    sumM++
                    break;
                case 'P':
                    pathP[1] = idx
                    sumP++
                    break;
                case 'G':
                    pathG[1] = idx
                    sumG++
                    break;
            }
        }
    })
    const s = [0]
    for (let t of travel) {
        s.push(s[s.length - 1] + t)
    }
    let pathSum = 0
    for (let [from, to] of [pathM, pathP, pathG]) {
        pathSum += s[to] - s[from]
    }
    return sumM + sumP + sumG + pathSum
};

console.log(garbageCollection(["G","P","GP","GG"], [2,4,3]))
console.log(garbageCollection(["MMM","PGM","GP"], [3,10]))