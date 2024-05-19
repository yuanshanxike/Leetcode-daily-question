function getWinner(arr: number[], k: number): number {
    let lastWinner = arr[0]
    let winTimes = 0
    for (let i = 1; i < arr.length; i++) {
        let winner = Math.max(lastWinner, arr[i])
        if (winner == lastWinner) winTimes++
        else winTimes = 1
        lastWinner = winner
        if (winTimes == k) break
    }
    return lastWinner
};

console.log(getWinner([2,1,3,5,4,6,7], 2))
console.log(getWinner([3,2,1], 10))
console.log(getWinner([1,9,8,2,3,7,6,4,5], 7))
console.log(getWinner([1,11,22,33,44,55,66,77,88,99], 1000000000))
console.log(getWinner([1,25,35,42,68,70], 1))