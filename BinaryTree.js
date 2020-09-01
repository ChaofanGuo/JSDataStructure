const {gListStr2Tree} = require('./treeUtil')
const {TreeNode, Tree} = require('./Tree')

/**
 * @description Binary Tree node structure extends TreeNode
 * @author Super Guo (Super_Work@hotmail.com)
 * @create 2020-09-01 17:00:00
 */
class BinaryTreeNode extends TreeNode {
  /**
   * Create a Binary Tree node
   * e.g. let binaryTree = new BinaryTree('1(2(4(,7)),3(5,6))')
   * @param {Object | Number | String} val Value
   * @param {BinaryTreeNode} left Left child
   * @param {BinaryTreeNode} right Right child
   */
  constructor(val, left, right) {
    let children = []
    left ? children.push(left) : children.push(null)
    right ? children.push(right) : void 0
    super(val, children)
  }

  /**
   * get current Tree node's left child
   * @returns {TreeNode}
   */
  get left() {
    return this.children[0]
  }

  /**
   * Set left child of current Tree node
   * @param {BinaryTreeNode} biTreeNode
   */
  setLeft(biTreeNode) {
    this.children[0] = biTreeNode
  }

  /**
   * Get current Tree node's right child
   * @returns {TreeNode}
   */
  get right() {
    return this.children[1]
  }

  /**
   * Set right child of current Tree node
   * @param {BinaryTreeNode} biTreeNode
   */
  setRight(biTreeNode) {
    this.children[1] = biTreeNode
  }
}

/**
 * @description Tree data structure extends Tree
 * @author Super Guo (Super_Work@hotmail.com)
 * @create 2020-09-01 17:00:00
 */
class BinaryTree extends Tree{
  constructor(gListStr) {
    super(undefined)
    if (gListStr) {
      this.root = gListStr2Tree(gListStr, BinaryTreeNode)
      // this.root = gListStr instanceof String ? gListStr2Tree(gListStr, BinaryTreeNode) :
      //   gListStr instanceof Array ? arr2BinaryTree(gListStr) : null
    }
  }

  /**
   * Return a TreeNode Array of Inorder traversal
   * @returns {TreeNode[]}
   */
  inOrder() {
    let stack = [{node: this.root, visited: false}],
      result = []

    while(stack.length > 0) {
      let item = stack.pop()
      const {right, children, left} = item.node;
      if (item.visited || children.length === 0) {
        result.push(item.node)
      } else if (children.length > 0){
        right !== null && stack.push({node: right, visited: false})
        stack.push({node: item.node, visited: true})
        left !== null && stack.push({node: left, visited: false})
      }
    }

    return result
  }
}

module.exports = {
  BinaryTreeNode,
  BinaryTree
}
