/**
 * 方法一：回溯
 * @param nums 
 * @returns 
 */
function subsetsWithDup(nums: number[]): number[][] {
    const n = nums.length
    const ans: number[][] = []
    nums.sort((a, b) => a - b)
    function dfs(i: number, subSet: number[]) {
        if (i >= nums.length) {
            ans.push(Array.from(subSet))
            return
        }

        // 选
        subSet.push(nums[i])
        dfs(i + 1, subSet)
        // 不选
        subSet.pop()  // 恢复现场
        let j = i + 1
        while (j < n && nums[j] == nums[j - 1]) {
            j++  // 不选时，跳过与不选择元素相同的其他元素 (避免包含完全相同元素的集合被重复添加)
        }
        dfs(j, subSet)
    }

    dfs(0, [])
    
    return ans
};

/**
 * 方法二：通过二进制枚举所有的组合
 * @param nums 
 */
// function subsetsWithDup(nums: number[]): number[][] {

// }

console.log(subsetsWithDup([1,2,2]))
console.log(subsetsWithDup([0]))