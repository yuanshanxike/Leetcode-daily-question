function imageSmoother(img: number[][]): number[][] {
    const n = img.length, m = img[0].length

    const newImg = Array.from({ length: n }, () => Array(m).fill(0))

    /**
     * 卷积
     * 每个 cell 都可以独立计算，因此可以使用并行计算来加速。
     * （需要等所有的 folding 执行完成后再统一返回，这里没做子线程的调度，async 只是一个示意）
     * @param i 
     * @param j 
     */
    async function folding(i: number, j: number) {
        let sum = 0, cnt = 0
        for (let dx = -1; dx < 2; dx++) {
            for (let dy = -1; dy < 2; dy++) {
                if (j + dx >= 0 && j + dx < m && i + dy >= 0 && i + dy < n) {
                    sum += img[i + dy][j + dx]
                    cnt++
                }
            }
        }
        newImg[i][j] = Math.floor(sum / cnt)
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            folding(i, j)
        }
    }
    return newImg
};

/*** 此外，还可以单线程使用 二维前缀和 来进行优化，可以将 O(C*n) 中的 C == 9 优化掉 */

console.log(imageSmoother([[1,1,1],[1,0,1],[1,1,1]]))
console.log(imageSmoother([[100,200,100],[200,50,200],[100,200,100]]))