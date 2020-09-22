const {leetCodeArray2BinaryTree} = require('./treeUtil')
const {Tree} = require('./Tree')

let arr = [1, null, 2, 3, 4, 5, null, null, 6, 7, null, 8, null, 9, 10, null, null, 11, null, 12, null, 13, null, null, 14]
let binaryArr = [1, 2, 3, 4, null, 5, 6, null, 7]
let str = '1(2,3(6,7(11(14))),4(8(12)),5(9(13),10))'

arr = [1,2,null,3,null,4,null,null,5]
let tree = leetCodeArray2BinaryTree(arr)
console.log(tree)
