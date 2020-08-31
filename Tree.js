class TreeNode {
  constructor(val, children) {
    this.val = val === void 0 ? void 0 : val
    this.children = children ? children : []
  }

  insertChild(treeNode, index) {
    if (index === void 0) {
      this.children.push(treeNode)
    } else if (index === 0) {
      this.children.unshift(treeNode)
    } else {
      let end = this.children.slice(index)
      this.children = this.children.slice(0, index)
      this.children.push(treeNode, ...end)
    }
  }

  prePendChild(treeNode) {
    this.children.unshift(treeNode)
  }
}

class BiTreeNode extends TreeNode {
  constructor(val, left, right) {
    super(val, [left, right].filter(item => item))
  }

  get left() {
    return this.children[0] ? this.children[0] : null
  }

  setLeft(biTreeNode) {
    this.children[0] = biTreeNode
  }

  get right() {
    return this.children[1] ? this.children[1] : null
  }

  setRight(biTreeNode) {
    this.children[1] = biTreeNode
  }
}

class Tree {
  constructor(str) {
    this.root = null
    if (str) {
      this.root = parenStr2Tree(str)
    }
  }

  toString() {
    return tree2ParenStr(this.root)
  }
}

class BiTree {

}

function tree2ParenStr(root) {
  let stack = [{node: root, parent: null}],
    preItem = {node: root, parent: null},
    result = ''

  while(stack.length > 0) {
    let item = stack.pop(),
      node = item.node

    if (node === null) continue

    if (node.val) {
      result += node.val
    }
    if (node.children.length > 0) {
      result += '('
    }

    stack.push(...Object.create(node.children).reverse().map(item => { return {node: item, parent: node} }))

    if (item.parent === preItem.parent) {
      result += ','
    } else {
      result += ')'
    }

    preItem = item
  }

  /*
  if (root === null) return ''

  let childStr = ''
  result = root.val ? root.val : ''
  for(let child of root.children) {
    childStr += ',' + tree2ParenStr(child)
  }
  if (childStr !== '') {
    result += `(${childStr.substr(1)})`
  }
   */

  return result
}

function parenStr2Tree(str) {
  let stack = [new TreeNode()],
    preBTNode = null,
    value = ''
  for(let i = 0; i < str.length; i ++) {
    let c = str[i]
    if (c === '(') {
      if (value !== '') {
        preBTNode = new TreeNode(value)
        stack[stack.length - 1].children.push(preBTNode)
        value = ''
      }
      stack.push(preBTNode)
    } else if (c === ')') {
      if (value !== '') {
        preBTNode = new TreeNode(value)
        stack[stack.length - 1].children.push(preBTNode)
        value = ''
      }
      stack.pop()
    } else if (c === ',') {
      // 处理二叉树左节点为空的情况
      if (str[i - 1] === ',' || str[i - 1] === '(') {
        stack[stack.length - 1].children.push(null)
      } else if (str[i - 1] !== ')') {
        preBTNode = new TreeNode(value)
        stack[stack.length - 1].children.push(preBTNode)
        value = ''
      }
    } else {
      value += c
    }
  }

  return stack[0].children[0] === undefined ? null : stack[0].children[0]
}

let treeStr = '1(2,3(6,7,8),4,5(9,10))'
let biTreeStr = 'A(B(D(,GOD)),C(E,F))'
let root = parenStr2Tree(treeStr)
let biRoot = parenStr2Tree(biTreeStr)
console.log(tree2ParenStr(root))
console.log(treeStr)
console.log(tree2ParenStr(biRoot))
console.log(biTreeStr)
// debugger
