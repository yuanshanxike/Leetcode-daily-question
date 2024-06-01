function distributeCandies(candyType: number[]): number {
    const n = candyType.length
    let set = new Set()
    for (const t of candyType) {
        set.add(t)
    }
    return Math.min(n / 2, set.size)
}

console.log(distributeCandies([1,1,2,2,3,3]))
console.log(distributeCandies([1,1,2,3]))
console.log(distributeCandies([6,6,6,6]))