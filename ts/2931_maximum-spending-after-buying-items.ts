/**
 * 根据 排序不等式
 */
function maxSpending(values: number[][]): number {
    const allValues: number[] = []
    for (const valArr of values) {
        allValues.push(... valArr)
    }
    allValues.sort((a, b) => a - b)
    return allValues.reduce((cost, val, idx) => cost + val * (idx + 1), 0)
};

console.log(maxSpending([[8,5,2],[6,4,1],[9,7,3]]))
console.log(maxSpending([[10,8,6,4,2],[9,7,5,3,2]]))