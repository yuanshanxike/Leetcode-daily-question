function findIntersectionValues(nums1: number[], nums2: number[]): number[] {
    const hash1 = new Set<number>(), hash2 = new Set<number>()
    let cnt1 = 0, cnt2 = 0
    nums1.forEach((val) => {
        hash1.add(val)
    })
    nums2.forEach((val) => {
        hash2.add(val)
        if (hash1.has(val)) cnt2++
    })
    nums1.forEach((val) => {
        if (hash2.has(val)) cnt1++
    })
    return [cnt1, cnt2]
};

console.log(findIntersectionValues([2,3,2], [1,2]))
console.log(findIntersectionValues([4,3,2,3,1], [2,2,5,2,3,6]))
console.log(findIntersectionValues([3,4,2,3], [1,5]))