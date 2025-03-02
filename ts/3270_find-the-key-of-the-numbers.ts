function generateKey(num1: number, num2: number, num3: number): number {
    let key = 0
    let pow10 = 1
    for (let i = 0; i < 4; i++) {
        const digital = Math.min(num1 % 10, num2 % 10, num3 % 10)
        key += digital * pow10
        pow10 *= 10

        num1 = Math.floor(num1 / 10)
        num2 = Math.floor(num2 / 10)
        num3 = Math.floor(num3 / 10)
    }
    return key
};

console.log(generateKey(1, 10, 1000))
console.log(generateKey(987, 879, 798))
console.log(generateKey(1, 2, 3))