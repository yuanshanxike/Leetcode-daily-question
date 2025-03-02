function intersect(nums1: number[], nums2: number[]): number[] {
    const cnt = new Map<number, number>()
    for (const num of nums1) {
        cnt.set(num, (cnt.get(num) ?? 0) + 1)
    }

    const ans: number[] = []
    for (const num of nums2) {
        const c = cnt.get(num) ?? 0
        if (c > 0) {
            ans.push(num)
            cnt.set(num, c - 1)
        }
    }
    return ans
};

console.log(intersect([1,2,2,1], [2,2]))
console.log(intersect([4,9,5], [9,4,9,8,4]))
console.log(intersect([1,2], [1,1]))