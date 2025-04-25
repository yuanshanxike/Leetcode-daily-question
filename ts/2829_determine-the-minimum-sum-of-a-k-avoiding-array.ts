function minimumSum(n: number, k: number): number {
    /**
     * 等差数列求和
     * @param start 
     * @param end 
     * @param cd 公差
     */
    function sum(start: number, end: number, cd: number): number {
        const n = (end - start) / cd + 1
        return (start + end) * n / 2
    }

    const halfK = Math.floor(k / 2)
    if (n <= halfK) {
        return sum(1, n, 1)
    } else {
        const extendCnt = n - halfK
        return sum(1, halfK, 1) + sum(k, k + extendCnt - 1, 1)
    }
};

console.log(minimumSum(5, 4))
console.log(minimumSum(2, 6))