function smallestRange(nums: number[][]): number[] {
    const k = nums.length
    // 合并所有数组
    const allNumsArr = nums.reduce<NumAndGroup[]>((mergedArr: NumAndGroup[], arr: number[], idx) => {
        for (let i = 0; i < arr.length; i++) {
            mergedArr.push({
                num: arr[i],
                group: idx
            })
        }
        return mergedArr
    }, [])
    allNumsArr.sort((a, b) => a.num - b.num)

    // 滑动窗口统计当前区间覆盖的原数组数量
    let l = 0, r = 0
    let groupCnt = 0
    const groupElementCnt: number[] = Array(k).fill(0)
    const ans: [number, number][] = []
    while (r < allNumsArr.length) {
        const grIdx = allNumsArr[r].group
        if (groupElementCnt[grIdx] == 0) {
            groupCnt++
        }
        groupElementCnt[grIdx]++
        
        while (groupCnt == k && l <= r && groupElementCnt[allNumsArr[l].group] > 1) {  // 尽可能地缩短区间的长度
            groupElementCnt[allNumsArr[l].group]--
            l++
        }

        if (groupCnt == k) {
            ans.push([allNumsArr[l].num, allNumsArr[r].num])
        }

        r++
    }
    ans.sort(([a, b], [c, d]) => (b - a) - (d - c))  // 排序 也可以替换成 将 ans 改为优先队列 
    return ans[0]
}

type NumAndGroup = {
    num: number
    group: number
}

console.log(smallestRange([[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]))
console.log(smallestRange([[1,2,3],[1,2,3],[1,2,3]]))