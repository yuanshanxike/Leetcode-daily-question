namespace L3192 {
    /**
     * 仍然是从左到右，对非 1 的数值进行修改。
     * 但如果真的去修改，时间复杂度会达到 O(n^2).
     * 这里可以采用标记法（每次只修改当前遍历到的位置是 1 通过还是 0 通过），这样单次判断的复杂度是 O(1)，总体的时间复杂度是 O(n)
     * @param nums 
     */
    function minOperations(nums: number[]): number {
        let find1Or0: number = 0
        let times = 0
        for (const num of nums) {
            if (num == find1Or0) {
                times++
                find1Or0 = ~find1Or0 & 1
            }
            // else 跳过当前数字（已经被实际置为 1 了）
        }
        return times
    };

    console.log(minOperations([0,1,1,0,1]))
    console.log(minOperations([1,0,0,0]))
}