function percentageLetter(s: string, letter: string): number {
    let times = 0
    for (const c of s) {
        if (c == letter) times++
    }
    return Math.floor(times / s.length * 100)
};

console.log(percentageLetter('foobar', 'o'))
console.log(percentageLetter('jjjj', 'k'))