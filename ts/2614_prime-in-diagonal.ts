const memo = new Map<number, boolean>()

function diagonalPrime(nums: number[][]): number {
    const isPrime = (n: number) => {
        if (n < 4) {
            return n > 1
        }
        if (memo.has(n)) return memo.get(n)
        if (n % 6 != 1 && n % 6 != 5) return false  // 等价于判断 n % 2 === 0 || n % 3 === 0
        for (let i = 5; i * i <= n; i += 6) {  // 只用检查 6k ± 1 的数
            if (n % i === 0 || n % (i + 2) === 0) return false;
        }
        memo.set(n, true)
        return true;
    }
    
    let maxPrime = 0
    for (let i = 0; i < nums.length; i++) {
        if (isPrime(nums[i][i])) {
            maxPrime = Math.max(maxPrime, nums[i][i])
        }
        if (isPrime(nums[i][nums.length - 1 - i])) {
            maxPrime = Math.max(maxPrime, nums[i][nums.length - 1 - i])
        }
    }
    return maxPrime
};

console.debug(diagonalPrime([[1, 2, 3], [5, 6, 7], [9, 10, 11]]))
console.debug(diagonalPrime([[1, 2, 3], [5, 17, 7], [9, 11, 10]]))