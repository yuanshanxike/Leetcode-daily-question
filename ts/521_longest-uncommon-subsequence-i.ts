function findLUSlength(a: string, b: string): number {
    return a == b ? -1 : Math.max(a.length, b.length)
};

console.log(findLUSlength('aba', 'cdc'))
console.log(findLUSlength('aaa', 'bbb'))
console.log(findLUSlength('aaa', 'aaa'))
console.log(findLUSlength('aaa', 'aaaa'))