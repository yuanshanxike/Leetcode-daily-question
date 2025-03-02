function generateMatrix(n: number): number[][] {
    // 顺时针方向排列
    enum Direc {
        right = 0,
        down,
        left,
        up
    }
    let top = 0, bottom = n - 1, left = 0, right = n - 1
    let direc = Direc.right as Direc
    const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0))

    for (let cnt = 1; cnt <= n ** 2;) {
        switch (direc) {
            case Direc.left:
                for (let j = right; j >= left; j--) {
                    matrix[bottom][j] = cnt++
                }
                bottom--
                break
            case Direc.right:
                for (let j = left; j <= right; j++) {
                    matrix[top][j] = cnt++
                }
                top++
                break
            case Direc.up:
                for (let i = bottom; i >= top; i--) {
                    matrix[i][left] = cnt++
                }
                left++
                break
            case Direc.down:
                for (let i = top; i <= bottom; i++) {
                    matrix[i][right] = cnt++
                }
                right--
                break
        }

        direc = (direc + 1) % 4  // 按顺时针切换方向
    }

    return matrix
};

console.log(generateMatrix(3))
console.log(generateMatrix(1))
