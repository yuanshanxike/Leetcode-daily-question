namespace L26 {
    function removeDuplicates(nums: number[]): number {
        let stackSize = 1  // 一个元素一定是符合要求的
        for (let i = stackSize; i < nums.length; i++) {
            if (nums[i] != nums[stackSize - 1]) {  // nums[stackSize - 1] 是栈顶元素
                nums[stackSize++] = nums[i]
            }
        }
        return stackSize
    };

    console.log(removeDuplicates([1, 1, 2]))
    console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]))
}