// function discountPrices(sentence: string, discount: number): string {
//     const n = sentence.length
//     let trackLeft = -1
//     let trackRight = -1
//     let sumDetal = 0
//     for (let i = 1; i < n + sumDetal; i++) {
//         if (sentence[i - 1] == '\$' && '1' <= sentence[i] && sentence[i] <= '9') {
//             trackLeft = i
//         }
//         while ('0' <= sentence[i] && sentence[i] <= '9') {
//             trackRight = i++
//         }
//         if (trackLeft != -1 && trackRight != -1 && (trackLeft - 2 < 0 || sentence[trackLeft - 2] == ' ') && (trackRight + 1 == n + sumDetal || sentence[trackRight + 1] == ' ')) {
//             const sliceLen = trackRight - trackLeft + 1
//             const price = parseInt(sentence.slice(trackLeft, trackRight + 1), 10)
//             const account = (price * (100 - discount) / 100).toFixed(2)
//             const detalLen = account.length - sliceLen
//             sumDetal += detalLen
//             sentence = sentence.slice(0, trackLeft) + account + sentence.slice(trackRight + 1)
//             i += detalLen
//         }

//         trackLeft = -1
//         trackRight = -1
//     }
//     return sentence
// };

function discountPrices(sentence: string, discount: number): string {
    const d = 1 - discount / 100
    const arr = sentence.split(' ')
    for (let i = 0; i < arr.length; i++) {
        const word = arr[i]
        if (/^\$[0-9]+$/.test(word)) {
            arr[i] = `$${(parseFloat(word.substring(1)) * d).toFixed(2)}`
        }
    }
    return arr.join(' ')
}

console.log(discountPrices('there are $1 $2 and 5$ candies in the shop', 50))
console.log(discountPrices('1 2 $3 4 $5 $6 7 8$ $9 $10$', 100))
console.log(discountPrices('1 2 $3 4 $5 $6 7 8$ $9 $10', 100))
console.log(discountPrices('duew$11mengf $8 $1', 7))
console.log(discountPrices('$1e9', 50))