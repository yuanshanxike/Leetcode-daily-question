/**
 * 有两个等差数列：
 * ① (1 + 1 + 2 * (n - 1)) * n / 2 => n^2
 * ② (2 + 2 + 2 * (n - 1)) * n / 2 => (2n^2 + 2n) / 2 => n^2 + n => n * (n + 1)
 * 可以看出，a.如果行数相同，② 中所包含的球数一定 > ①;
 * b.如果 ① 比 ② 多一行，那么三角形中 ① 所包含的球数一定比 ② 多 ① 的行数个。
 * 每次用数量少的球来计算行数，然后用相应的行数来判断数量更多的球是能搭配着排出合法的三角形。更新能构造出来的三角形高度最大值。
 * @param red 
 * @param blue 
 */
function maxHeightOfTriangle(red: number, blue: number): number {
    if (blue > red) {
        [red, blue] = [blue, red]  // 把球数多的球作为红球
    }
    let ans = 0
    // case a, 红球是 ②，蓝球是 ①
    let row = Math.floor(Math.sqrt(blue))
    if (row * (row + 1) <= red) {  // 计算红球数量是否满足 ②
        ans = row * 2
    }
    // case b, 红球是 ①，蓝球是 ②
    row = Math.floor((-1 + Math.sqrt(1 + 4 * (blue))) / 2) 
    if ((row + 1) ** 2 <= red) {  // 计算红球数量是否满足 ①
        ans = Math.max(row * 2 + 1, ans)
    }
    return ans
};

console.log(maxHeightOfTriangle(2, 4))
console.log(maxHeightOfTriangle(2, 1))
console.log(maxHeightOfTriangle(1, 1))
console.log(maxHeightOfTriangle(10, 1))
console.log(maxHeightOfTriangle(3, 4))
console.log(maxHeightOfTriangle(9, 3))
console.log(maxHeightOfTriangle(3, 9))
console.log(maxHeightOfTriangle(3, 2))