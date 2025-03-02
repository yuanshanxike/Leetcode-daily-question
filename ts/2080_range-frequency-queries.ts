/**
 * 这种做法因为在数组数据量大时，创建的 Map 过多，会导致：
 * FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
 */
// class RangeFreqQuery {
//     cntArr: Map<number, number>[] = [new Map]

//     constructor(arr: number[]) {
//         const cntMap = new Map<number, number>()
//         for (const num of arr) {
//             if (cntMap.has(num)) {
//                 cntMap.set(num, cntMap.get(num)! + 1)
//             } else {
//                 cntMap.set(num, 1)
//             }
//             this.cntArr.push(new Map(cntMap))
//         }
//     }

//     query(left: number, right: number, value: number): number {
//         right++
//         if (!this.cntArr[right].has(value)) {
//             return 0
//         } else {
//             return this.cntArr[right].get(value)! - (this.cntArr[left].get(value) ?? 0)
//         }
//     }
// }

/**
 * 换个角度，我们可以记录每种元素所出现的具体位置。
 * 那么只需要一个 map 就可以记录不同元素所对应的所有出现位置。
 * 因为“出现位置数组”是从左向右遍历原数组的时候确立的，每一个“出现位置数组”都是有序的，这样就可以二分查找 left 和 right 在 “出现位置数组” 中的 index，两个 index 相减再加 1，就是需要查询区间中的元素频率。
 * 因为所有位置与数组中的元素一一对应，所以空间复杂度为 O(n).
 */
class RangeFreqQuery {
    private num2Orders: Record<number, number[]> = {}

    constructor(arr: number[]) {
        arr.forEach((num, idx) => {
            if (this.num2Orders[num] == undefined) {
                this.num2Orders[num] = [idx]
            } else {
                this.num2Orders[num].push(idx)
            }
        });
    }

    query(left: number, right: number, value: number): number {
        const idxArr = this.num2Orders[value]
        if (idxArr == undefined) {
            return 0
        } else {
            // 二分查找 left 和 right
            return RangeFreqQuery.binarySearch(right, idxArr, 'floor') - RangeFreqQuery.binarySearch(left, idxArr, 'ceil') + 1
        }
    }

    private static binarySearch(t: number, arr: number[], bst: BinarySearchType): number {
        let l = 0, r = arr.length - 1
        let ans = bst == 'floor' ? -1 : arr.length  // 二分 floor 或 ceil 的备选答案
        while (r >= l) {
            const mid = Math.floor((l + r) / 2)
            if (arr[mid] == t) {
                return mid
            } else if (arr[mid] > t) {
                if (bst =='ceil') ans = mid  // 更新 ceil
                r = mid - 1
            } else {  // arr[mid] < t
                if (bst == 'floor') ans = mid  // 更新 floor
                l = mid + 1
            }
        }
        return ans
    }
}

type BinarySearchType = 'floor' | 'ceil'


let rangeFreqQuery = new RangeFreqQuery([12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56])
console.log(rangeFreqQuery.query(1, 2, 4))
console.log(rangeFreqQuery.query(0, 11, 33))