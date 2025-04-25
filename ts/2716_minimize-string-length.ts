function minimizedStringLength(s: string): number {
    const set = new Set(s)
    return set.size
};

console.log(minimizedStringLength("aaabc"))
console.log(minimizedStringLength("cbbd"))
console.log(minimizedStringLength("dddaaa"))
