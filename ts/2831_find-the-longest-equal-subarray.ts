/**需要求数组中相同数字，在删除一定数量以内的其他中间数字后，能够形成的最大连续序列。
 * 因为数组中包含着多种不同的数字，很难同时去处理，所以对于每种相同的数字分别去处理。
 * 因为要解决的问题是：删除一些连续的中间元素块儿，使得合并后连续的相同数字长度最大。
 * 这种处理数组中连续元素的问题就很适合用滑动窗口的模型来解决。
 * 
 * 可以用一个 hashMap 将相同元素在数组中的下标 index 记录到独自的一个数组中，
 * 分别用滑动窗口去处理每一个下标数组，不断去更新删除中间元素后能构成的相同连续子数组最大长度。
 * 设某个下标数组的第一个和最后一个元素分别是 first 和 last，数组长度为 n，
 * 滑动窗口的长度等于 min(last - first + 1 - n, k).
 * 滑动窗口覆盖的对应下标数量就是我们要统计的相同连续子数组长度。
 */
function longestEqualSubarray(nums: number[], k: number): number {
    const map: Record<number, number[]> = {}
    nums.forEach((val, idx) => {
        if (map[val]) {
            map[val].push(idx)
        } else {
            map[val] = [idx]
        }
    })
    let maxLength = 1
    /* let key: keyof (typeof map)
       let key: string */
    for (const key in map) {
        let queue: number[] = []
        let delSum = k
        let idxArr = map[key]
        let n = idxArr.length
        if (n == 1) continue
        let len = 1
        for (let j = 1; j < idxArr.length; j++) {
            let midCount = idxArr[j] - idxArr[j - 1] - 1
            while (delSum < midCount && queue.length > 0) {
                delSum += queue.splice(0, 1)[0] // dequeue
                len--
            }
            if (delSum >= midCount) {
                delSum -= midCount
                queue.push(midCount)  // enqueue
                len++
                maxLength = Math.max(len, maxLength)
            }
        }
    }
    return maxLength
};

console.log(longestEqualSubarray([1,3,2,3,1,3], 3))  // 3
console.log(longestEqualSubarray([1,1,2,2,1,1], 2))  // 4
console.log(longestEqualSubarray([1,2,1], 0))        // 1