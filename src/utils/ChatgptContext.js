
export const addElement = (tree, path, element) => {
  const node = tree.head
  if (node == null) {
    tree.head = {
      container: [element],
      currentlayer: 1
    }
    tree.totalHeight = 1
  } else {
    const nodeToUpdate = getNodeByPath(node, path)
    if (nodeToUpdate.container[path[path.length - 1]].next == null) {
      nodeToUpdate.container[path[path.length - 1]].next = {
        container: [element],
        currentlayer: 0
      }
    } else {
      nodeToUpdate.container[path[path.length - 1]].next.container.push(element)
    }
  }
}

export const updataElement = (tree, path, element) => {
  const node = tree.head
  if (node == null) {
    return
  }
  if (tree.totalHeight < path.length) {
    return
  }
  const nodeToUpdate = getNodeByPath(node, path)
  nodeToUpdate.container[path.length - 1] = element
}

export const getElementByPath = (node, path) => {
  let currentNode = node
  let currentElement = null
  path.forEach((index, layer) => {
    if (currentNode != null) {
      currentElement = currentNode.container[index]
      currentNode = currentElement.next
    }
  })
  return currentElement
}
export const getElemenstByPath = (node, path) => {
  const elements = []
  let currentNode = node
  let currentElement
  path.forEach((index) => {
    if (currentNode != null) {
      currentElement = currentNode.container[index]
      currentNode = currentElement.next
      elements.push({ ...currentElement, next: null })
    }
  })
  return elements
}

export const getNodeByPath = (node, path) => {
  let currentNode = null
  let currentElement = {
    next: node
  }
  path.forEach((index, layer) => {
    if (currentElement.next != null) {
      currentNode = currentElement.next
      currentElement = currentNode.container[index]
    }
  })
  return currentNode
}

export const getBasePath = (node) => {
  let currentNode = node
  const path = []
  const length = []
  while (currentNode != null) {
    path.push(0)
    length.push(currentNode.container.length)
    currentNode = currentNode.container[0].next
  }
  return { path, length }
}
export const findElementsByCondition = (node, path, matcher) => {
  return getElemenstByPath(node, path).filter(element => {
    return matcher(element)
  })
}

export const rightViewTraversal = (node) => {
  let currentNode = node
  const path = []
  const length = []
  while (currentNode != null) {
    path.push(currentNode.container.length - 1)
    length.push(currentNode.container.length)
    currentNode = currentNode.container[currentNode.container.length - 1].next
  }
  return { path, length }
}

export const rightViewTraversalByLastPath = (node, exPath) => {
  let currentNode = node
  const length = []
  exPath.forEach((index) => {
    if (currentNode != null) {
      length.push(currentNode.container.length)
      currentNode = currentNode.container[index].next
    }
  })
  const reslut = rightViewTraversal(currentNode)
  return { path: exPath.concat(reslut.path), length: length.concat(reslut.length) }
}

export const leftViewTraversalByLastPath = (node, exPath) => {
  let currentNode = node
  const length = []
  exPath.forEach((index) => {
    if (currentNode != null) {
      length.push(currentNode.container.length)
      currentNode = currentNode.container[index].next
    }
  })
  const reslut = getBasePath(currentNode)
  return { path: exPath.concat(reslut.path), length: length.concat(reslut.length) }
}
