/**
 * 
 * @param dataArray {any[]} 要加入的節點陣列
 * @returns 
 * @example
 * const queue = createQueue([1,2,3])
 */
export function createQueue<T>(dataArray: T[] = []): Queue<T> {
    if (dataArray.length === 0) {
        return new Queue()
    } else {
        return new Queue(dataArray)
    }
}
export class Queue<T> {
    #firstData:T |undefined = undefined
    #lastData:T |undefined = undefined
    #queueMap = new Map<T,T | undefined>()
    constructor(dataArray: T[] = []) {
        if (dataArray.length >= 1) {
            this.#firstData = dataArray[0]
            this.#lastData = dataArray[0]
            for (const item of dataArray.slice(1)) {
                this.#queueMap.set(this.#lastData, item)
                this.#lastData = item
            }
            this.#queueMap.set(this.#lastData, undefined)
        }
    }
    /**
     * 增加Child Data
     * @param {T[]} dataArray Child Data
     * @return 是否有增加Data
     * @example
     * const queue = new Queue([1,2,3])
     * queue.addData(4) // true
     * queue.addData(1) // false
     */
    addData(...dataArray: T[]) {
        if (dataArray.length === 0) {
            return false
        }
        const firstCount = this.#queueMap.size
        if (this.#firstData === undefined) {
            this.#firstData = dataArray[0]
            this.#lastData = dataArray[0]
        }
        for (const item of dataArray) {
            if (this.#queueMap.has(item)) {
                continue
            } else {
                if (this.#lastData !== undefined) {
                    this.#queueMap.set(this.#lastData, item)
                }
                this.#lastData = item
            }
        }
        if (this.#lastData !== undefined) {
            this.#queueMap.set(this.#lastData, undefined)
        }
        const secondCount = this.#queueMap.size
        return firstCount !== secondCount
    }
    /**
     * 取得下一個Data
     * @return {T | undefined } 下一個Data
     * @example
     * const queue = new Queue([1,2,3])
     * queue.nextData() // 1
     * queue.nextData() // 2
     */
    nextData(): T | undefined {
        const result = this.#firstData
        if (result !== undefined) {
            this.#firstData = this.#queueMap.get(result)
            this.#queueMap.delete(result)
        }
        return result
    }
    /**
     * 刪除Data
     * @return 是否有刪除Data
     * @example
     * const queue = new Queue([1,2,3])
     * queue.getSize() // 3
     * queue.getFirstData() // 1
     * queue.delect(1)
     * queue.getSize() // 2
     * queue.getFirstData() // 2
     */
    delectData(data: T) {
        if (data === this.#firstData) {
            this.nextData()
            return true
        } else if (this.#queueMap.has(data)) {
            let lostLinkData1 = undefined
            for (const [key, value] of this.#queueMap) {
                if (value === data) {
                    lostLinkData1 = key
                }
            }
            const lostLinkData2 = this.#queueMap.get(data)
            if (lostLinkData1 !== undefined) {
                this.#queueMap.set(lostLinkData1, lostLinkData2)
            }
            if (data === this.#lastData) {
                this.#lastData = lostLinkData1
            }
            this.#queueMap.delete(data)
            return true
        } else {
            return false
        }
    }
    /**
     * 取得Data數量
     * @return Data數量
     * @example
     * const queue = new Queue([1,2,3])
     * queue.getSize() // 3
     */
    getSize() {
        return this.#queueMap.size
    }
    /**
     * 加入另一個 Queue
     * @return 是否有增加Data
     * @example
     * const queue1 = new Queue([1,2,3])
     * const queue2 = new Queue([4,5,6])
     * queue1.getSize() // 3
     * queue1.addQueue(queue2) // true
     * queue1.getSize() // 6
     */
    addQueue(queue: Queue<T>) {
        if (!(queue?.getSize() !== 0)) {
            return false
        }
        const newQueue = queue.getQueueMap()
        const firstCount = this.#queueMap.size
        if ((this.#lastData !== queue.getFirstData()) && (this.#lastData !== undefined)) {
            this.#queueMap.set(this.#lastData, queue.getFirstData())
        }
        for (const [key, value] of newQueue.entries()) {
            if (this.#queueMap.has(key)) {
                continue
            } else {
                this.#queueMap.set(key, value)
                this.#lastData = key
            }
        }
        const secondCount = this.#queueMap.size
        return firstCount !== secondCount
    }
    /**
     * 清除 Queue
     * @example
     * const queue = new Queue([1,2,3])
     * queue.getSize() // 3
     * queue.getFirstData() // 1
     * queue.getLastData() // 3
     * queue1.clearQueue()
     * queue1.getSize() // 0
     * queue.getFirstData() // undefined
     * queue.getLastData() // undefined
     */
    clearQueue() {
        this.#firstData = undefined
        this.#lastData = undefined
        this.#queueMap.clear()
    }
    /**
     * 取得下一個Data，參考generators
     * @return {{value: T , done: false } | {value: undefined , done: true }} 下一個Data
     * @example
     * const queue = new Queue([1,2,3])
     * queue.next() // {value: 1, done: false}
     * queue.next() // 2
     * queue.next() // 2
     */
    next(): {value: T, done: false } | {value: undefined, done: true } {
        const value = this.#firstData
        const done = this.#queueMap.size === 0
        if (value !== undefined) {
            this.#firstData = this.#queueMap.get(value)
            this.#queueMap.delete(value)
        }
        if (value !== undefined && !done) {
            return {value, done}
        } else {
            return {value: undefined, done: true}
        }
    }
    *[Symbol.iterator](){
        let value = this.#firstData
        while (value !== undefined) {
            yield value
            this.#firstData = this.#queueMap.get(value)
            this.#queueMap.delete(value)
            value = this.#firstData
        }
        this.clearQueue()
    }
    getFirstData(): T | undefined {
        return this.#firstData
    }
    getLastData(): T | undefined {
        return this.#lastData
    }
    getQueueMap() {
        return this.#queueMap
    }
}