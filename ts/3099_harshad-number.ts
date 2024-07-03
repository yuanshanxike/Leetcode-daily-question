function sumOfTheDigitsOfHarshadNumber(x: number): number {
    let remain = x
    let sum = 0
    while (remain > 0) {
        const digit = remain % 10
        sum += digit
        remain = Math.floor(remain / 10)
    }
    return x % sum == 0 ? sum : -1
};

console.log(sumOfTheDigitsOfHarshadNumber(18))
console.log(sumOfTheDigitsOfHarshadNumber(23))