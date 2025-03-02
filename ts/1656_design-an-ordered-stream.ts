class OrderedStream {
    private readonly orderArr: string[]
    private ptr = 0

    constructor(n: number) {
        this.orderArr = Array(n).fill(null)        
    }

    insert(idKey: number, value: string): string[] {
        const i = idKey - 1
        this.orderArr[i] = value
        if (this.ptr == i) {
            while (this.ptr < this.orderArr.length && this.orderArr[this.ptr] !== null) {
                this.ptr++
            }
            return this.orderArr.slice(i, this.ptr)
        }
        return []
    }
}