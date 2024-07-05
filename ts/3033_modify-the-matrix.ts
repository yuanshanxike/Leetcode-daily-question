function modifiedMatrix(matrix: number[][]): number[][] {
    const m = matrix.length, n = matrix[0].length
    const modifyIdxes: number[] = []
    for (let j = 0; j < n; j++) {
        let maxVal = 0
        for (let i = 0; i < m; i++) {
            if (matrix[i][j] == -1) modifyIdxes.push(i)
            maxVal = Math.max(maxVal, matrix[i][j])
        }
        while (modifyIdxes.length) {
            matrix[modifyIdxes.pop()!][j] = maxVal
        }
    }
    return matrix
};

console.log(modifiedMatrix([[1,2,-1],[4,-1,6],[7,8,9]]))
console.log(modifiedMatrix([[3,-1],[5,2]]))
console.log(modifiedMatrix([[-1,0,0,2,2],[2,0,0,2,1],[4,3,2,1,1],[-1,-1,0,2,4],[1,0,3,-1,0]]))