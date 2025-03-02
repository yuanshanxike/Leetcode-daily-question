/**
 * 哈希计数每种元素的出现次数，然后优选选择出现次数多的元素加入集合，
 * 这样能使得集合中的元素尽可能地少。
 * 
 * “优选选择出现次数多的元素” 这一需求可以使用 优先队列 来动态维护，
 * 也可以在哈希计数后排序来实现。
 * @param arr 
 */
function minSetSize(arr: number[]): number {
    const n = arr.length
    const hashCnt = new Map<number, number>()
    for (const num of arr) {
        if (!hashCnt.get(num)) hashCnt.set(num, 1)
        else hashCnt.set(num, hashCnt.get(num)! + 1)
    }
    const nonIncArr = Array.from(hashCnt, ([, v]) => v).sort((a, b) => b - a)  // 根据哈希计数的大小，非递增排序 map 中的计数值
    let halfCnt = Math.ceil(n / 2)
    let ans = 0
    console.debug(nonIncArr)
    for (let i = 0; i < hashCnt.size; i++) {
        halfCnt -= nonIncArr[i]
        ans++
        if (halfCnt <= 0) break
    }
    return ans
};

console.log(minSetSize([3,3,3,3,5,5,5,2,2,7]))
console.log(minSetSize([7,7,7,7,7,7]))
console.log(minSetSize([1000,1000,3,7]))