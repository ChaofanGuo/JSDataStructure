const {gListStr2Tree, tree2GListStr} = require('./treeUtil')

/**
 * @description Tree node structure
 * @author Super Guo (Super_Work@hotmail.com)
 * @create 2020-09-01 17:00:00
 */
class TreeNode {
  /**
   * Create a Tree node
   * @param {Object | String | Number} val
   * @param {TreeNode[]} children
   */
  constructor(val= undefined, children = []) {
    this.val = val === undefined ? undefined : val
    this.children = children ? children : []
  }

  /**
   * Insert a TreeNode to current TreeNode as a child at specified position
   * @param {Number} index Insert position, -1 is the end of the child list
   * @param {TreeNode} treeNode
   */
  insertChild(index, ...treeNode) {
    if (index <= -1) {
      this.children.push(...treeNode)
    } else {
      let end = this.children.slice(index)
      this.children = this.children.slice(0, index)
      this.children.push(...treeNode, ...end)
    }
  }
}

/**
 * @description Tree data structure
 * @author Super Guo (Super_Work@hotmail.com)
 * @create 2020-09-01 17:00:00
 */
class Tree {
  /**
   * Generate tree by Generalize List type string
   * eg. let tree = new Tree('1(2,3(6,7,8),4,5(9,10))')
   * @param {String} gListStr {a Generalize List type str}
   */
  constructor(gListStr) {
    this.root = null
    if (gListStr) {
      this.root = gListStr2Tree(gListStr, TreeNode)
    }
  }

  /**
   * Return Tree's Generalize list str
   * @returns {string}
   */
  toString() {
    return tree2GListStr(this.root)
  }

  /**
   * Return a TreeNode Array of Depth First traversal
   * @returns {[TreeNode]}
   */
  depthFirstArray() {
    let stack = [this.root],
      result = []

    while(stack.length > 0) {
      let node = stack.pop()
      // result.push(node ? node.val : null)
      result.push(node)
      if (node !== null && node.children.length > 0) {
        stack.push(...Object.create(node.children).reverse().filter(item => item !== null && item.val !== null))
      }
    }

    return result
  }

  /**
   * Return a TreeNode Array of Breadth First traversal
   * @returns {[TreeNode]}
   */
  breadthFirstArray() {
    let queue = [this.root],
      result = []

    while(queue.length > 0) {
      let node = queue.shift()
      // result.push(node ? node.val : null)
      result.push(node)
      if (node !== null && node.children.length > 0) {
        queue.push(...node.children)
      }
    }

    return result
  }

  /**
   * Return a TreeNode Array of Preorder traversal
   * @returns {TreeNode[]}
   */
  preOrder() {
    return this.depthFirstArray()
  }

  /**
   * Return a TreeNode Array of Postorder traversal
   * @returns {[]}
   */
  postOrder() {
    let stack = [{node: this.root, visited: false}],
      result = []

    while(stack.length > 0) {
      let item = stack.pop()
      if (item.visited || item.node.children.length === 0) {
        result.push(item.node)
      } else if (item.node.children.length > 0) {
        stack.push({node: item.node, visited: true})
        stack.push(...Object.create(item.node.children).reverse().filter(item => item !== null && item.val !== null).map(item => {return {node: item, visited: false}}))
      }
    }

    return result
  }
}

module.exports = {
  TreeNode,
  Tree
}
