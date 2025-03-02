function maxDistance(arrays: number[][]): number {
    let max = arrays[0][arrays[0].length - 1], min = arrays[0][0]
    let maxDistance = 0
    for (let i = 1; i < arrays.length; i++) {
        maxDistance = Math.max(maxDistance, Math.abs(arrays[i][arrays[i].length - 1] - min), Math.abs(arrays[i][0] - max))
        max = Math.max(max, arrays[i][arrays[i].length - 1])
        min = Math.min(min, arrays[i][0])
    }
    return maxDistance
};

console.log(maxDistance([[1, 2, 3], [4, 5], [1, 2, 3]]))
console.log(maxDistance([[1], [1]]))
console.log(maxDistance([[1, 5], [3, 4]]))