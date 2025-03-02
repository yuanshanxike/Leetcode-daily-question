class Allocator {
    private memory: number[]

    constructor(n: number) {
        this.memory = new Array(n).fill(0)
    }

    allocate(size: number, mID: number): number {
        let freeSize = 0

        for (let i = 0; i < this.memory.length; i++) {
            if (this.memory[i] === 0) {
                freeSize++
                if (freeSize === size) {
                    for (let j = i; j > i - size; j--) {
                        this.memory[j] = mID
                    }
                    return i - size + 1
                }
            } else {
                freeSize = 0
            }
        }
        return -1
    }

    freeMemory(mID: number): number {
        let count = 0
        for (let i = 0; i < this.memory.length; i++) {
            if (this.memory[i] === mID) {
                this.memory[i] = 0
                count++
            }
        }
        return count
    }
}