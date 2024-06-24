/**
 * 在循环数组中，按照数组升序找到每个元素的下一个比它大的元素。
 * 对于递增序列，下一个元素就是要找的答案；
 * 对于非递增序列，可以将他们暂存起来，找到更大的数时，再从后往前进行比较。
 * 从左到右用单调栈储存非递增序列下标可以满足这一要求。
 * 
 * “将数组所有元素复制一份拼接到原数组后面”，这样做可以使得原数组中除最大元素外的每一个元素都能在其后面找到比它大的元素。
 * 实际实现时，不用真的拷贝、拼接数组，直接使用 i % n 来模拟即可
 * @param nums 
 */
function nextGreaterElements(nums: number[]): number[] {
    const n = nums.length
    const ans = Array<number>(n)
    ans.fill(-1)  // 先将所有项用 -1 填充，就不需要特殊处理最大值
    const stack: number[] = []
    for (let i = 0; i < n * 2; i++) {
        while (stack.length > 0 && nums[i % n] > nums[stack[stack.length - 1]]) {
            ans[stack.pop()!] = nums[i % n]
        }
        if (i < n) {
            stack.push(i)
        }
    }
    return ans
};