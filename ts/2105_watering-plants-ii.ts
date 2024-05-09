function minimumRefill(plants: number[], capacityA: number, capacityB: number): number {
    let a = 0;
    let b = plants.length - 1
    let remainA = capacityA
    let remainB = capacityB
    let ans = 0
    while (a < b) {
        if (remainA >= plants[a]) {
            remainA -= plants[a++]
        } else {
            remainA = capacityA - plants[a++]
            ans++
        }

        if (remainB >= plants[b]) {
            remainB -= plants[b--]
        } else {
            remainB = capacityB - plants[b--]
            ans++
        }
    }
    if (a == b) {
        Math.max(remainA, remainB) < plants[a] ? ans++ : undefined
    }
    return ans
};

console.log(minimumRefill([2,2,3,3], 5, 5))
console.log(minimumRefill([2,2,3,3], 3, 4))
console.log(minimumRefill([5], 10, 8))
console.log(minimumRefill([1,2,4,4,5], 6, 5))
console.log(minimumRefill([7,7,7,7,7,7,7], 8, 7))