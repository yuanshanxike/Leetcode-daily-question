function stableMountains(height: number[], threshold: number): number[] {
    const stableIdx: number[] = []
    for (let i = 0; i < height.length; i++) {
        if (height[i] > threshold && i + 1 < height.length) {
            stableIdx.push(i + 1)
        }
    }
    return stableIdx
};

console.log(stableMountains([1,2,3,4,5], 2))
console.log(stableMountains([10,1,10,1,10], 3))
console.log(stableMountains([10,1,10,1,10], 10))