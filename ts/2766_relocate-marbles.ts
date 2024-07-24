function relocateMarbles(nums: number[], moveFrom: number[], moveTo: number[]): number[] {
    const set = new Set(nums);
    for (let i = 0; i < moveFrom.length; i++) {
        const from = moveFrom[i], to = moveTo[i]
        set.delete(from)
        set.add(to)
    }
    return Array.from(set).sort((a, b) => a - b)
};

console.log(relocateMarbles([1,6,7,8], [1,7,2], [2,9,5]))
console.log(relocateMarbles([1,1,3,3], [1,3], [2,2]))