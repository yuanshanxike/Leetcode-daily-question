/**
 * 要使分割后两个数组中的元素互不相同，需要保证原数组中的相同元素个数不能超过 2，可以用 hash map 来进行验证
 * @param nums 
 */
function isPossibleToSplit(nums: number[]): boolean {
    const hashCnt: Record<number, number> = {}
    for (const num of nums) {
        if (!hashCnt[num]) {
            hashCnt[num] = 1
        } else if (hashCnt[num] < 2) {
            hashCnt[num] = 2
        } else {
            return false
        }
    }
    return true
};

console.log(isPossibleToSplit([1,1,2,2,3,4]))
console.log(isPossibleToSplit([1,1,1,1]))