/**
 * Shift target item up to heaping inputted heap Array by inputted compare function
 * @param {[]} heap Heap Array
 * @param {Number} index Target item index of heap array
 * @param {Function} compareFun Compare function, like Array.sort() function, (a, b) => {return 1 - Infinite | -1 - -Infinite | 0}
 */
function shiftUp(heap, index, compareFun) {
  let parent = Math.floor(index / 2),
    item = heap[index]
  while (parent > 0 && compareFun(item, heap[parent]) < 0) {
    // operation item is not parent
    // operation item should be front of it's parent
    heap[index] = heap[parent]
    index = parent
    parent = Math.floor(index / 2)
  }
  heap[index] = item
}

/**
 * Shift top item down to heaping inputted heap Array by inputted compare function
 * @param {[]} heap Heap Array
 * @param {Number} index Target item index of heap array
 * @param {Function} compareFun Compare function, like Array.sort() function, (a, b) => {return 1 - Infinite | -1 - -Infinite | 0}
 */
function shiftDown(heap, index, compareFun) {
  let len = heap.length,
    item = heap[index],
    left = index * 2, // index * 2
    right = index * 2 + 1 // index * 2 + 1

  if (left < len && right >= len) {
    // when updated item has left child but don't has right child
    // set right to left, prevent runtime error for below if test
    right = left
  }

  while (index < len && left < len && right < len && (compareFun(item, heap[left]) > 0 || compareFun(item, heap[right]) > 0)) {
    // index & left & right should be a valid array index
    // operation item should after one of is child
    if (compareFun(heap[left], heap[right]) <= 0) {
      // left child should in front of right child
      heap[index] = heap[left]
      index = left
      left = index * 2
      right = index * 2 + 1
    } else {
      // right child should in front of left chilid
      heap[index] = heap[right]
      index = right
      left = index * 2
      right = index * 2 + 1
    }

    if (left < len && right >= len) {
      right = left
    }
  }

  heap[index] = item
}

module.exports = {
  shiftDown,
  shiftUp
}
