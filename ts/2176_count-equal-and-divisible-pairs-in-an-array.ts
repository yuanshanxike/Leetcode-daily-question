const MX = 101
const divisors = Array.from({ length: MX }, () => [] as number[])

for (let i = 1; i < MX; i++) {
    for (let j = i; j < MX; j += i) {
        divisors[j].push(i)
    }
}

/**
 * https://leetcode.cn/problems/count-equal-and-divisible-pairs-in-an-array/solutions/1277713/mo-ni-by-endlesscheng-wegn/?envType=daily-question&envId=2025-04-17
 * @param nums 
 * @param k 
 * @returns 
 */
function countPairs(nums: number[], k: number): number {
    let ans = 0
    const cnt = new Map<number, number>();
    nums.forEach((num, j) => {
        if (j && num == nums[0]) {  // 枚举 j，计算左边有多少个符合要求的 i
            ans += 1  // 单独统计 i=0 的情况
        }
        const k2 = k / gcd(k, j)  // i 必须是 k2 的倍数
        ans += cnt.get(k2 << 10 | num) ?? 0
        for (const d of divisors[j]) {  // j 是 d 的倍数
            const key = d << 10 | num;
            const newCnt = (cnt.get(key) ?? 0) + 1
            cnt.set(key, newCnt)
        }
    })

    return ans
};

function gcd(a: number, b: number) {
    if (a < b) [a, b] = [b, a]
    while (b != 0) {
        const remain = a % b
        a = b
        b = remain
    }
    return a
}

console.log(countPairs([3,1,2,2,2,1,3], 2))
console.log(countPairs([1,2,3,4], 1))
