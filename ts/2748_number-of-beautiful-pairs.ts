/**
 * 时间复杂度：O(n^2)，不考虑 gcd 的复杂度
 */
// function countBeautifulPairs(nums: number[]): number {
//     cache = new Array<number[]>(10)
//     for (let i = 0; i < cache.length; i++) {
//         cache[i] = new Array<number>(10)
//     }

//     let ans = 0
//     for (let i = 0; i < nums.length - 1; i++) {
//         for (let j = i + 1; j < nums.length; j++) {
//             if (gcdWithMemory(Number.parseInt(`${nums[i]}`[0], 10), nums[j] % 10) == 1) ans++
//         }
//     }
//     return ans
// };

/**
 * 非暴力做法：
 * 时间复杂度：O(n * k), 其中 k = 10, 不考虑 gcd 的复杂度
 */
function countBeautifulPairs(nums: number[]): number {
    cache = new Array<number[]>(10)
    for (let i = 0; i < cache.length; i++) {
        cache[i] = new Array<number>(10)
    }

    let cnt: number[] = Array<number>(10) // nums[i] 的最高位的取值范围是 [1, 9], 统计每个数字作为最到位在 nums 的元素中出现的次数
    cnt.fill(0)
    
    let ans = 0
    for (const num of nums) {
        let low = num % 10
        for (let y = 1; y <= 9; y++) {
            if (gcdWithMemory(low, y) == 1) ans += cnt[y]  // 先计算低位与 [1, 9] 区间内数字的互质元素并加上对应数量
        }
        cnt[+(''+num)[0]]++ // 再更新对应最高位出现的次数
    }
    return ans
};

var cache: number[][];

function gcdWithMemory(a: number, b: number) {
    function swap() {
        let temp = a
        a = b
        b = temp
    }
    if (cache[a][b]) return cache[a][b]
    else {
        let res = gcd(a, b)
        cache[a][b] = res
        return res
    }
}

/**
 * 使用 Stein 优化算法来实现
 */
function gcd(a: number, b: number): number {
    function swap() {
        let temp = a
        a = b
        b = temp
    }
    if (a == b || b == 0) return a
    if (a < b) swap()
    
    if (isEven(a) && isEven(b)) {
        return 2 * gcd(a / 2, b / 2)
    } else if (!isEven(a) && !isEven(b)) {
        return gcd(b, a - b)
    } else { // 一奇一偶 的情况
        return isEven(a) ? gcd(a / 2, b) : gcd(a, b / 2)
    }
}

var isEven = (a: number): boolean => { return (a & 1) != 1 }

console.log(countBeautifulPairs([2,5,1,4]))
console.log(countBeautifulPairs([11,21,12]))