/**
 * 后缀最大值
 * @param arr 
 */
function replaceElements(arr: number[]): number[] {
    let max = -1
    for (let i = arr.length - 1; i >= 0; i--) {
        const original = arr[i]
        arr[i] = max
        max = Math.max(original, max)
    }
    return arr
};

console.log(replaceElements([17,18,5,4,6,1]))
console.log(replaceElements([400]))