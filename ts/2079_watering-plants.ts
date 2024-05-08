function wateringPlants(plants: number[], capacity: number): number {
    let pos = 0
    let remain = capacity
    let step = 0
    const n = plants.length
    while (pos < n) {
        let water = plants[pos]
        if (remain >= water) {
            remain -= water
            step++
            pos++
        } else {
            step += 2 * pos
            remain = capacity
        }
    }
    return step
};

console.log(wateringPlants([2,2,3,3], 5))  // 14
console.log(wateringPlants([1,1,1,4,2,3], 4))  // 30
console.log(wateringPlants([7,7,7,7,7,7,7], 8)) // 49