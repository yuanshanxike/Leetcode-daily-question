/**
 Do not return anything, modify nums in-place instead.
 */
 function sortColors(nums: number[]): void {
    const colorsCnt = Array(3).fill(0)
    for (const c of nums) {
        colorsCnt[c]++
    }
    let startIdx = 0
    for (let i = 0; i < colorsCnt.length; i++) {
        for (let j = 0; j < colorsCnt[i]; j++) {
            nums[startIdx + j] = i
        }
        startIdx += colorsCnt[i]
    }

    console.debug(nums)
 };

sortColors([2,0,2,1,1,0])