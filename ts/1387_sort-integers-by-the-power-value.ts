const memo: Record<number, number> = {}   // 记忆体放在全局可以加速

function weight(num: number): number {
    if (num == 1) return 0

    if (memo[num] != undefined) return memo[num]

    let w: number
    if (num % 2) {
        w = weight((num << 1) + num + 1) + 1
    } else {
        w = weight(num / 2) + 1
    }

    memo[num] = w
    return w
}

function getKth(lo: number, hi: number, k: number): number {
    const arr = Array.from({ length: hi - lo + 1 }, (_, k) => lo + k)
    const weightArr = Array.from(arr, (v) => weight(v))
    arr.sort((a, b) => weightArr[a - lo] - weightArr[b - lo])
    return arr[k - 1]
};

console.log(getKth(12, 15, 2))
console.log(getKth(7, 11, 4))