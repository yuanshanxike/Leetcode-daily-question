function rowAndMaximumOnes(mat: number[][]): [number, number] {
    let max = 0
    let res: [number, number] = [0, 0]
    for (let i = 0; i < mat.length; i++) {
        const count = mat[i].filter(x => x === 1).length
        if (count > max) {
            max = count
            res = [i, count]
        }
    }
    return res
};

console.log(rowAndMaximumOnes([[0, 1], [1, 0]]))
console.log(rowAndMaximumOnes([[0, 0, 0], [0, 1, 1]]))