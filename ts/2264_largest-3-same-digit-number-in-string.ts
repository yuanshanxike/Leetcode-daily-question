function largestGoodInteger(num: string): string {
    let max = -1
    let ans = ''
    for (let i = 0; i < num.length - 2; i++) {
        const subStr = num.substring(i, i + 3)
        const val = +subStr
        if (val % 111) continue  // 确保 3 个数字相同
        if (val > max) {
            max = val
            ans = subStr
        }
    }
    return ans
};

console.log(largestGoodInteger('6777133339'))
console.log(largestGoodInteger('2300019'))
console.log(largestGoodInteger('42352338'))