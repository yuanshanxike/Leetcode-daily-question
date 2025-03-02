function findSpecialInteger(arr: number[]): number {
    const n = arr.length, target = Math.floor(n * 0.25)
    let l = 0
    for (let r = 0; r < n; r++) {
        if (arr[r] == arr[l]) {
            if (r - l + 1 > target) return arr[r]
        } else {
            l = r
        }
    }
    return -1
};

console.log(findSpecialInteger([1,2,2,6,6,6,6,7,10]))