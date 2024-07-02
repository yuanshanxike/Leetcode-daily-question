function maximumPrimeDifference(nums: number[]): number {
    const n = nums.length
    let l = 0
    let r = n - 1
    for (; l < n; l++) {
        if (isPrime(nums[l])) break
    }
    for (; r > l; r--) {
        if (isPrime(nums[r])) break
    }
    return r - l
};

const cache: (-1 | 0 | 1)[] = new Array(101).fill(0) // -1：不是质数， 0：还未求证， 1：是质数
cache[1] = -1
cache[2] = 1

function isPrime(num: number): boolean {
    if (cache[num]) return cache[num] == 1
    let isPrime = true
    for (let i = 2; i ** 2 <= num; i++) {
        if (num % i == 0) {
            isPrime = false
            break
        }
    }
    cache[num] = isPrime ? 1 : -1
    return isPrime
}

console.log(maximumPrimeDifference([4,2,9,5,3]))
console.log(maximumPrimeDifference([4,8,2,8]))