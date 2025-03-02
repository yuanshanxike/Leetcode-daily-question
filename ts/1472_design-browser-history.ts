class BrowserHistory {
    private history: string[]
    private current: number

    constructor(homepage: string) {
        this.history = [homepage]
        this.current = 0
    }

    visit(url: string): void {
        this.history.splice(this.current + 1)  // 清空前进记录
        this.history.push(url)
        this.current++
    }

    back(steps: number): string {
        this.current = Math.max(0, this.current - steps)
        return this.history[this.current]
    }

    forward(steps: number): string {
        this.current = Math.min(this.history.length - 1, this.current + steps)
        return this.history[this.current]
    }
}