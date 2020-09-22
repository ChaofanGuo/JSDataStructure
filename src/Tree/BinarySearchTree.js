const {BinaryTree, BinaryTreeNode} = require('./BinaryTree')

class BinarySearchTree extends BinaryTree{
  constructor() {
    super(undefined)
  }

  insert(val) {
    let node = new BinaryTreeNode(val),
      current = this.root
    while(current.children.length > 0) {
      if (node.val > current.val) {
        if (!current.right) {
          current.setRight(node)
          break
        }
        current = current.right
      } else if (node.val < current.val) {
        if (!current.left) {
          current.setLeft(node)
          break
        }
        current = current.left
      }
    }
  }

  search(val) {
    let current = this.root
    while(current.children.length > 0) {
      if (val === current.val) {
        return true
      } else if (val < current.val) {
        current = current.left
      } else {
        current = current.right
      }
    }

    return false
  }

  remove(val) {
    let node = null,
      parent = this.root
    let current = this.root
    while(current.children.length > 0) {
      if (val === current.val) {
        node = current
        break
      } else if (val < current.val) {
        parent = current
        current = current.left
      } else {
        parent = current
        current = current.right
      }
    }

    if (!node) {
      return null
    }
  }
}
