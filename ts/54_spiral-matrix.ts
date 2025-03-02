function spiralOrder(matrix: number[][]): number[] {
    // 顺时针方向排列
    enum Direc {
        right = 0,
        down,
        left,
        up
    }
    let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1
    let direc = Direc.right as Direc
    const ans: number[] = []

    while (top <= bottom && left <= right) {
        switch (direc) {
            case Direc.left:
                for (let j = right; j >= left; j--) {
                    ans.push(matrix[bottom][j])
                }
                bottom--
                break
            case Direc.right:
                for (let j = left; j <= right; j++) {
                    ans.push(matrix[top][j])
                }
                top++
                break
            case Direc.up:
                for (let i = bottom; i >= top; i--) {
                    ans.push(matrix[i][left])
                }
                left++
                break
            case Direc.down:
                for (let i = top; i <= bottom; i++) {
                    ans.push(matrix[i][right])
                }
                right--
                break
        }

        direc = (direc + 1) % 4  // 按顺时针切换方向
    }

    return ans
};

console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
console.log(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]))
