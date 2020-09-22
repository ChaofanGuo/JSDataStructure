const {Heap} = require('./Heap')

/**
 * A Maximum Heap. Extends Heap class
 */
class MaxHeap extends Heap{
  constructor() {
    super((a, b) => b - a);
  }
}

module.exports = {
  MaxHeap
}
