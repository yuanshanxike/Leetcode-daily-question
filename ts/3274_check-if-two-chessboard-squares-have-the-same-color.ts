/**
 * 观察棋盘，奇数行的黑色格子在奇数列，偶数行的黑色格子在偶数列，利用这一性质快速求出所给格子对应的颜色。
 * @param coordinate1 
 * @param coordinate2 
 */
function checkTwoChessboards(coordinate1: string, coordinate2: string): boolean {
    return (+coordinate1[1] % 2 !== (coordinate1[0].charCodeAt(0) - 'a'.charCodeAt(0)) % 2)
        == (+coordinate2[1] % 2 !== (coordinate2[0].charCodeAt(0) - 'a'.charCodeAt(0)) % 2)
};

console.log(checkTwoChessboards('a1', 'c3'))
console.log(checkTwoChessboards('a1', 'h3'))