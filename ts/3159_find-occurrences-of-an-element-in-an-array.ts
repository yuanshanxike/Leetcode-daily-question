/**
 * posArr 中存储第 i(0..n) 个 x 在 nums 中出现的位置。
 * 先离线处理 posArr，然后再回答 queries。
 * @param nums 
 * @param queries 
 * @param x 
 */
function occurrencesOfElement(nums: number[], queries: number[], x: number): number[] {
    const posArr: number[] = []
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] == x) {
            posArr.push(i)
        }
    }

    const ans: number[] = []
    for (const q of queries) {
        if (q > posArr.length) ans.push(-1)
        else ans.push(posArr[q - 1])
    }
    return ans
};

console.log(occurrencesOfElement([1,3,1,7], [1,3,2,4], 1))
console.log(occurrencesOfElement([1,2,3], [10], 5))