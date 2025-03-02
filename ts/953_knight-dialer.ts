/**
 * 可以直接利用题目中的“示例2”中数的第一位到第二位作为映射表；
 * 表示 knight 从每一个位置可以直接到达的下一个位置。
 * 每次可以把尾号相同的号码放入到一个集合中，然后下一位的号码是再从该位置出发可到达的尾号，把 from 位置的数量累加到 to 位置的集合中。
 * 最后“拨到”第 n 次时统计 0 ~ 9 位置中所有数量的和即为答案。
 * @param n 
 */
function knightDialer(n: number): number {
    const map: Record<number, number[]> = {   // knight 在拨号盘上跳跃到下一步的映射表（根据“示例2”得到）
        0: [4, 6],
        1: [6, 8],
        2: [7, 9],
        3: [4, 8],
        4: [0, 3, 9],
        6: [0, 1, 7],
        7: [2, 6],
        8: [1, 3],
        9: [2, 4]
    }
    const mod = 1e9 + 7
    let tailArr = Array(10).fill(1)  // 初始时，每个位置都是可能的起始位置
    let tempTailArr = Array(10).fill(0)
    for (let t = 1; t < n; t++) {
        for (let i = 0; i <= 9; i++) {
            if (map[i]) {
                for (const to of map[i]) {
                    tempTailArr[to] = (tempTailArr[to] + tailArr[i]) % mod
                }
            }
        }
        [tailArr, tempTailArr] = [tempTailArr, tailArr]
        tempTailArr.fill(0)
    }
    return tailArr.reduce((sum, num) => (sum + num) % mod, 0)
};

console.log(knightDialer(1))
console.log(knightDialer(2))
console.log(knightDialer(3131))