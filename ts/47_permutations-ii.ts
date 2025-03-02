function permuteUnique(nums: number[]): number[][] {
    const n = nums.length
    const ans: number[][] = []
    const addedIdxSet = new Set<number>()
    nums.sort((a, b) => a - b)

    function dfs(i: number, arr: number[]) {
        if (i >= n) {
            ans.push(Array.from(arr))
            return
        }

        let lastSelected = Infinity
        for (let j = 0; j < n; j++) {
            if (addedIdxSet.has(j) || nums[j] == lastSelected) continue  // 单次选择跳过重复的元素

            arr.push(nums[j])
            lastSelected = nums[j]
            addedIdxSet.add(j)
            dfs(i + 1, arr)
            // 恢复现场
            arr.pop()
            addedIdxSet.delete(j)
        }
    }

    dfs(0, [])
    return ans
};

console.log(permuteUnique([1,1,2]))
console.log(permuteUnique([1,2,3]))