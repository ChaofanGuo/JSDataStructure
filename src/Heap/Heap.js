const {shiftUp, shiftDown} = require('./heapUtil')

let HEAPROOT = Symbol('Heap Root')

/**
 * Basic Heap class, maximum or minimum is controlled by input Compare Function
 */
class Heap {
  /**
   * Create a Heap
   * @param {Function} compareFun Custom compare function, like: (a, b) => {return 1 - Infinite | -1 - -Infinite | 0}
   */
  constructor(compareFun) {
    this.heap = []
    heap.push(HEAPROOT)
    this.compareFun = compareFun
  }

  /**
   * Insert a new item to the heap
   * @param {Object} item
   */
  insert(item) {
    this.heap.push(item)
    shiftUp(this.heap, this.heap.length - 1, this.compareFun)
  }

  /**
   * Update a exists item
   * @param {Number} index Target item index
   * @param {Object} val New item
   */
  update(index, val) {
    if (!this.heap[index] || this.heap[index] === HEAPROOT) {
      // if target item is not exists or target item is HEAPROOT item
      // insert item to current heap
      this.insert(val)
    } else {
      this.heap[index] = val
      let parent = Math.floor(index / 2),
        left = index * 2,
        right = left + 1,
        len = this.heap.length
      if (right >= len && left < len) {
        // when updated item has left child but don't has right child
        // set right to left, prevent runtime error for below first if branch
        right = left
      }
      if (parent === 0 || this.compareFun(val, this.heap[left]) > 0 || this.compareFun(val, this.heap[right]) > 0) {
        // updated val is root or val should be after than it's left or right child
        // shift current node down
        shiftDown(this.heap, index, this.compareFun)
      } else if (left >= len || right >= len || this.compareFun(val, this.heap[parent]) < 0) {
        // updated val is a leaf or val should be front of it's parent
        // shift current node up
        shiftUp(this.heap, index, this.compareFun)
      }
    }
  }

  /**
   * Get item's index in the heap
   * @param {Object} target Target item
   * @param {Function} equalFun Custom equal function
   * @returns {number} Target item's index in heap
   */
  indexOf(target, equalFun) {
    for (let i = 1; i < this.heap.length; i++) {
      if (equalFun(target, this.heap[i])) {
        return i
      }
    }
    return -1
  }

  /**
   * Get & remove top item of the heap, then heaping rest data
   * @returns {Object|null}
   */
  pop() {
    let top = this.heap[1]
    if (top === undefined) {
      return null
    }
    this.heap[1] = this.heap[this.heap.length - 1]
    this.heap.pop()
    shiftDown(this.heap, 1, this.compareFun)
    return top
  }

  /**
   * Get & remove specific item of the heap, then heaping rest data
   * @param {Number} index Target index
   * @returns {object | null}
   */
  removeAtIndex(index) {
    let item = this.heap[index]
    if (item === undefined) {
      return null
    }

    this.heap[index] = this.heap[this.heap.length - 1]
    this.heap.pop()

    let parent = Math.floor(index / 2),
      left = index * 2,
      right = left + 1

    if (this.compareFun(item, this.heap[parent]) < 0) {
      shiftUp(this.heap, index, this.compareFun)
    } else if (this.compareFun(item, this.heap[left]) > 0 || this.compareFun(item, this.heap[right]) > 0) {
      shiftDown(this.heap, index, this.compareFun)
    }

    return item
  }

  /**
   * Get top item of current heap
   * @returns {Object}
   */
  top() {
    return this.heap[1]
  }
}

module.exports = {
  Heap
}
