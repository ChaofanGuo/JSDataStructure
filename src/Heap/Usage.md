# Heap
Heap contains three different structures.
- Custom Heap
- Maximum Heap 
- Minimum Heap

## Custom Heap
Basic Heap data structure, which you can input Object as value, and judge position by custom Compare Function.
 ```javascript
const {Heap} = require('super-data-structures/Heap')
let heap = new Heap((a, b) => a.val - b.val)
heap.insert({key: 1, val: 20})
heap.insert({key: 2, val: 15})
heap.insert({key: 3, val: 10})
//    1
//  /   \
// 2     3
// previous tree's node is item.key
```
> Compare function is like Array.sort() function's input compare function.
> If you want item A at the top then return value greater than 0.
> If you want item B at the top then return value less than 0.

## Maximum Heap
Maximum Heap is only take Number as value.
