function addSpaces(s: string, spaces: number[]): string {
    // TLE
    // const chrArr = Array.from(s)
    // let detal = 0
    // for (const idx of spaces) {
    //     chrArr.splice(idx + detal, 0, ' ')
    //     detal++
    // }
    // return  chrArr.join('')

    const chrArr = Array(s.length + spaces.length)
    let start = 0, cursor = 0
    for (const idx of spaces) {
        for (let i = start; i < idx; i++) {
            chrArr[cursor++] = s[i]
        }
        chrArr[cursor++] = ' '
        start = idx
    }
    for (let i = start; i < s.length; i++) {
        chrArr[cursor++] = s[i]
    }
    return chrArr.join('')
};

console.log(addSpaces('LeetcodeHelpsMeLearn', [8,13,15]))
console.log(addSpaces('icodeinpython', [1,5,7,9]))
console.log(addSpaces('spacing', [0,1,2,3,4,5,6]))