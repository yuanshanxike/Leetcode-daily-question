function permute(nums: number[]): number[][] {
    const n = nums.length
    const ans: number[][] = []
    const addedIdxSet = new Set<number>()

    function dfs(i: number, arr: number[]) {
        if (i >= n) {
            ans.push(Array.from(arr))
            return
        }

        for (let j = 0; j < n; j++) {
            if (addedIdxSet.has(j)) continue

            arr.push(nums[j])
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

console.log(permute([1,2,3]))
console.log(permute([0,1]))
console.log(permute([1]))