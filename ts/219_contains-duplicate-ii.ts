function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const map = new Map<number, number>()
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i]) && i - map.get(nums[i])! <= k) {
            return true
        } else {
            map.set(nums[i], i)
        }
    }
    return false
};

console.log(containsNearbyDuplicate([1,2,3,1], 3))
console.log(containsNearbyDuplicate([1,0,1,1], 1))
console.log(containsNearbyDuplicate([1,2,3,1,2,3], 2))