namespace L3191 {
    /**
     * 滑动窗口：创建一个长度为 3 的窗口，每次将窗口向右移动到紧贴最左侧的 0，将窗口内全部二进制取反。
     * 重复上面的操作，统计操作次数，每次都可以让 nums 中的 0 右移，最终在数组的最右侧对仅剩的 0 进行处理
     * @param nums 
     */
    function minOperations(nums: number[]): number {
        const n = nums.length
        let l = 0, r = 2, times = 0
        for (; r < n; r++) {
            while (l < r - 2) {
                l++
            }

            if (nums[l] == 0) {
                for (let i = l; i <= r; i++) {
                    nums[i] = ~nums[i] & 1
                }
                times++
            }
        }

        for (let i = l; i <= r; i++) {
            if (nums[i] == 0) {
                times = -1
                break
            }
        }

        return times
    };

    console.log(minOperations([0,1,1,1,0,0]))
    console.log(minOperations([0,1,1,1]))
    console.log(minOperations([1,0,1,1,0,0]))
}