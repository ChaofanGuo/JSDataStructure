function gListStr2Tree(str, nodeType) {
  if (str.length === 0) return null

  let stack = [new nodeType()],
    preBTNode = null,
    value = ''
  for (let i = 0; i < str.length; i++) {
    let c = str[i]
    if (c === '(') {
      if (value !== '') {
        preBTNode = new nodeType(value)
        stack[stack.length - 1].children.push(preBTNode)
        value = ''
      }
      stack.push(preBTNode)
    } else if (c === ')') {
      if (value !== '') {
        preBTNode = new nodeType(value)
        stack[stack.length - 1].children.push(preBTNode)
        value = ''
      }
      stack.pop()
    } else if (c === ',') {
      // 处理二叉树左节点为空的情况
      if (str[i - 1] === ',' || str[i - 1] === '(') {
        stack[stack.length - 1].children.push(null)
      } else if (str[i - 1] !== ')') {
        preBTNode = new nodeType(value)
        stack[stack.length - 1].children.push(preBTNode)
        value = ''
      }
    } else {
      value += c
    }
  }

  return stack[0].children[0] === undefined ? null : stack[0].children[0]
}

// for LeetCode test case
function arr2Tree(arr) {
  let queue = [new TreeNode()],
    root = queue[0]
  for(let val of arr) {
    if (val === null) {
      queue.shift()
    } else {
      let first = queue[0],
        node = new TreeNode(val)
      first.insertChild(node)
      queue.push(node)
    }
  }

  return root.children[0]
}

// for LeetCode test case
function arr2BinaryTree(arr) {
  let queue = [new BinaryTreeNode(arr[0])],
    root = queue[0],
    level = 0

  for(let i = 1; i < arr.length; i ++) {
    let first = queue[0]
    let node = arr[i] === null ? null : new BinaryTreeNode(arr[i])
    if (first.left === undefined) {
      first.setLeft(node)
      node !== null && queue.push(node)
    } else if (first.right === undefined) {
      first.setRight(node)
      node !== null && queue.push(node)
      queue.shift()
    }
  }

  return root
}

module.exports = {
  gListStr2Tree
}
