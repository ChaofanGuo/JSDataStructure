const {gListStr2Tree} = require('./treeUtil')

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
  constructor(val, children = []) {
    this.val = val === undefined ? undefined : val
    this.children = children ? children : []
  }

  /**
   * Insert a TreeNode to current TreeNode as a child at specified position
   * @param {TreeNode} treeNode
   * @param {Number} index {Insert position, default is the end of the child list}
   */
  insertChild(treeNode, index = undefined) {
    if (index === undefined) {
      this.children.push(treeNode)
    } else if (index === 0) {
      this.children.unshift(treeNode)
    } else {
      let end = this.children.slice(index)
      this.children = this.children.slice(0, index)
      this.children.push(treeNode, ...end)
    }
  }

  /**
   * Insert a TreeNode to current TreeNode as a child at first place of children array
   * @param {TreeNode} treeNode
   */
  prePendChild(treeNode) {
    this.children.unshift(treeNode)
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
      // this.root = gListStr instanceof String ? gListStr2Tree(gListStr, TreeNode) :
      //             gListStr instanceof Array ? arr2Tree(gListStr) : null
    }
  }

  /**
   * Return Tree's Generalize list str
   * @returns {string}
   */
  toString() {
    let nodeStack = [{node: this.root, processed: false}],
      strQueue = [],
      temp = ''

    while (nodeStack.length > 0) {
      let top = nodeStack[nodeStack.length - 1]
      if (top.node === null) {
        temp += `,`
        nodeStack.pop()
      } else if (top.node.children.length > 0) {
        if (!top.processed) {
          if (temp !== '') {
            strQueue.push(temp)
            temp = ''
          }
          nodeStack.push(...Object.create(top.node.children).reverse().map(item => {
            return {node: item, processed: false}
          }))
          top.processed = true
        } else {
          nodeStack.pop()
          if (temp === '') {
            while (strQueue.length > 0) {
              temp += strQueue.shift()
            }
            strQueue.push(`,${top.node.val}(${temp.substr(1)})`)
            temp = ''
          } else {
            strQueue.push(`,${top.node.val}(${temp.substr(1)})`)
          }
          temp = ''
        }
      } else {
        nodeStack.pop()
        temp += `,${top.node.val}`
      }
    }

    return strQueue.shift().substr(1)
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
