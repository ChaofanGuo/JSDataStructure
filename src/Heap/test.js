const {Heap} = require('./Heap')
const {MaxHeap} = require('./MaxHeap')
const {MinHeap} = require('./MinHeap')

let heap = new Heap((a, b) => a - b),
  maxHeap = new MaxHeap(),
  minHeap = new MinHeap()
// let arr = [97,55,12,36,68,23,13,74,81,54,58,27,44,25,41,61,73,93,40,75,46,6,72,91,18,30,65,14,5,53,89,80,48,82,90,85,24,16,45,76,94,59,38,21,69,71,77,51,96,1,67,4,19,57,95,11,34,78,35,10,3,22,87,7,98,32,2,42,63,100,60,84,31,50,99,79,37,39,33,86,17,62,92,8,47,15,20,52,64,88,9,43,56,28,29,66,26,83,49,70]
let arr = []
let data = new Array(100).fill(0).map((item, index) => index + 1)
for (let i = 0; i < 100; i++) {
  arr.push(data.splice(Math.floor(Math.random() * data.length), 1)[0])
}

console.log(JSON.stringify(arr))

for (let num of arr) {
  heap.insert(num)
  minHeap.insert(num)
  maxHeap.insert(num)
}

async function sleep(span) {
  return new Promise(resolve => {
    setTimeout(resolve, span)
  })
}

async function test(heap) {
  let res = 100
  for (let i = 0; i < 100; i++) {
    console.log(heap.pop())
    await sleep(500)
  }
}

async function main() {
  await test(heap)
  await test(minHeap)
  await test(maxHeap)
}

main()
