const {Heap} = require('./Heap')

/**
 * A Minimum Heap. Extends Heap class
 */
class MinHeap extends Heap {
  constructor() {
    super((a, b) => a - b);
  }
}

module.exports = {
  MinHeap
}
