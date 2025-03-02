function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>()
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]  // 加法的逆运算
        if (map.has(complement)) {
            return [map.get(complement)!, i]
        }
        map.set(nums[i], i)  // 计算查找完成后再加入 map，避免重复使用单个元素
    }
    return []
};

console.log(twoSum([2, 7, 11, 15], 9))
console.log(twoSum([3, 2, 4], 6))
console.log(twoSum([3, 3], 6))