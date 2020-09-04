/**
 * Parse gList type string to Tree
 * @param {String} str GList type tree definer
 * @param nodeClass Tree node class
 * @returns {null|TreeNode|BinaryTreeNode}
 */
function gListStr2Tree(str, nodeClass) {
  if (str.length === 0) return null

  let stack = [new nodeClass()],
    preBTNode = null,
    value = ''
  for (let i = 0; i < str.length; i++) {
    let c = str[i]
    if (c === '(') {
      if (value !== '') {
        preBTNode = new nodeClass(value)
        stack[stack.length - 1].children.push(preBTNode)
        value = ''
      }
      stack.push(preBTNode)
    } else if (c === ')') {
      if (value !== '') {
        preBTNode = new nodeClass(value)
        stack[stack.length - 1].children.push(preBTNode)
        value = ''
      }
      stack.pop()
    } else if (c === ',') {
      // 处理二叉树左节点为空的情况
      if (str[i - 1] === ',' || str[i - 1] === '(') {
        stack[stack.length - 1].children.push(null)
      } else if (str[i - 1] !== ')') {
        preBTNode = new nodeClass(value)
        stack[stack.length - 1].children.push(preBTNode)
        value = ''
      }
    } else {
      value += c
    }
  }

  return stack[0].children[0] === undefined ? null : stack[0].children[0]
}

/**
 * Parse Tree to gList string
 * @param {TreeNode|BinaryTreeNode} root Tree root node
 * @returns {string}
 */
function tree2GListStr(root) {
  let nodeStack = [{node: root, processed: false}],
    strStack = [],
    temp = ''

  while(nodeStack.length > 0) {
    let top = nodeStack.pop()
    if (top.node === null) {
      temp = ','
    } else if (top.processed) {
      // 当前栈顶节点已处理过，取出栈中保存的子节点的广义表字符串，并添加到当前temp字符串之前
      let pre = strStack.pop()
      pre = pre === undefined ? '' : pre.substr(1)
      temp = `,${pre === '' ? '' : pre + ','}${top.node.val}(${temp.substr(1)})`
    } else {
      if (top.node.children.length > 0) {
        // 当前栈顶节点包含子节点，将子节点逆序入栈，并将标记置为已处理防止子节点重复入栈
        // 将之前处理的temp字符串入栈保存
        top.processed = true
        nodeStack.push(top)
        nodeStack.push(...Object.create(top.node.children).reverse().map(item => {return {node: item, processed: false}}))
        strStack.push(temp[0] === ',' ? temp : ',' + temp)
        temp = ''
      } else {
        // 当前栈顶为叶子节点，保存当前节点数据到temp字符串
        temp += `,${top.node.val}`
      }
    }
  }

  return temp.substr(1)
}

/**
 * Parse LeetCode array type data to gList string
 * @param {Array} arr LeetCode array tree data
 * @returns {Tree}
 */
function leetCodeArr2Tree(arr) {
  let refined = [],
    temp = []
  for(let item of arr) {
    if (item === null) {
      refined.push(temp)
      refined.push(null)
      temp = []
    } else {
      temp.push(item)
    }
  }
  if (temp.length > 0) {
    refined.push(temp)
  }
  let {TreeNode, Tree} = require('./Tree')
  return refinedArr2Tree(refined, TreeNode, Tree)
}

/**
 * Parse LeetCode array type data to Binary Tree
 * @param {Array} arr LeetCode array tree data
 * @returns {BinaryTree}
 */
function leetCode2BinaryTree(arr) {
  let refined = [],
    temp = []
  for(let i = 0; i < arr.length; i ++) {
    let item = arr[i]
    if (i % 2 === 0) {
      temp.push(item)
      refined.push(temp)
      refined.push(null)
      temp = []
    } else {
      temp.push(item)
    }
  }
  if (temp.length > 0) {
    refined.push(temp)
  }
  let {BinaryTreeNode, BinaryTree} = require('./BinaryTree')
  return refinedArr2Tree(refined, BinaryTreeNode, BinaryTree)
}

/**
 * Process refined LeetCode array type tree data to gList string
 * @param {Array} arr LeetCode array type tree data
 * @param {Class} nodeClass Tree node type
 * @param {Class} treeClass Tree type
 */
function refinedArr2Tree(arr, nodeClass, treeClass) {
  let queue = [new nodeClass()],
    root = queue[0]
  for (let val of arr) {
    if (val === null) {
      queue.shift()
    } else {
      let first = queue[0],
        temp = val.map(item => item === null ? null : new nodeClass(item))
      first.insertChild(-1, ...temp)
      queue.push(...temp)
    }
  }

  // return tree2GListStr(root.children[0])
  let tree = new treeClass()
  tree.root = root.children[0]
  return tree
}

module.exports = {
  gListStr2Tree,
  tree2GListStr,
  leetCodeArr2Tree,
  leetCode2BinaryTree
}
