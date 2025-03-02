type EvenOdd = [number, number]

function evenOddBit(n: number): EvenOdd {
    let even = 0, odd = 0
    let i = 0  // 当前位是 even 还是 odd
    while (n > 0) {
        if ((n & 1) === 1) {
            if (i === 0) {
                even++
            } else {
                odd++
            }
        }
        n >>= 1
        i ^= 1
    }
    return [even, odd]
};

console.log(evenOddBit(50))  // 110010
console.log(evenOddBit(2))