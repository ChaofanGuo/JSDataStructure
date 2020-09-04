let tree = require('./Tree/Tree')
let binaryTree = require('./Tree/BinaryTree')
let {leetCodeArr2Tree, leetCode2BinaryTree} = require('./Tree/treeUtil')
let LeetCodeArrayTree = {leetCodeArr2Tree, leetCode2BinaryTree}

module.exports = {
  Tree: tree.Tree,
  BinaryTree: binaryTree.BinaryTree,
  LeetCodeArrayTree
}
