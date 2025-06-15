class Node{
  constructor(value, leftChild = null, rightChild = null){
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class Tree{
  constructor(arr){
    const uniqSortedArr = Array.from(new Set(arr)).sort((a, b) => a - b);
    this.root = this.buildTree(uniqSortedArr)
  }

  buildTree(arr, start = 0, end = arr.length - 1){
    if(start > end) return null;

    const mid = Math.floor((start+end+1)/2);

    return new Node(arr[mid], this.buildTree(arr, start, mid-1), this.buildTree(arr, mid+1, end));
  }

  insert(value, pos = this.root){
    if(value === pos.value){
      return;
    }

    if(value < pos.value){
      if(pos.leftChild === null){
        const newNode = new Node(value);
        pos.leftChild = newNode;
        if(!this.isBalanced()){
          this.rebalance();
        }
      } else {
        this.insert(value, pos.leftChild);
        
      }
    } else if(value > pos.value){
      if(pos.rightChild === null){
        const newNode = new Node(value);
        pos.rightChild = newNode;
        if(!this.isBalanced()){
          this.rebalance();
        }
      } else {
        this.insert(value, pos.rightChild);
      }
    }
  }

  deleteItem(value){
    const node = this.find(value);
    if(node === null) return;

    const parentNode = this.findParent(value);

    //target node is root AND root has one child at most
    if(node.value === this.root.value && (node.leftChild === null || node.rightChild === null)){
      this.root = node.leftChild === null ? node.rightChild : node.rightChild;
    }
    //target node is a leaf
    if(node.leftChild === null && node.rightChild === null){
      const whatChild = parentNode.leftChild?.value === node.value ? "leftChild" : "rightChild";
      parentNode[whatChild] = null;
    } //target node has one child
    else if (node.leftChild === null || node.rightChild === null){
      const whatChild = parentNode.leftChild?.value === node.value ? "leftChild" : "rightChild";
      const whatGrandChild = node.leftChild === null ? "rightChild" : "leftChild";

      parentNode[whatChild] = node[whatGrandChild];
    }
    //target node has both children
    if(node.leftChild !== null && node.rightChild !== null){
      let auxParent = node;
      let auxDescendant = node.rightChild;

      //get the smallest value descendant from the right subtree of target node
      while(auxDescendant.leftChild !== null){
        auxParent = auxDescendant;
        auxDescendant = auxDescendant.leftChild;
      }

      node.value = auxDescendant.value;

      if(auxParent === node){
        node.rightChild = auxDescendant.rightChild;
      } else {
        auxParent.leftChild = auxDescendant.rightChild;
      }
    }

    if(!this.isBalanced()){
      this.rebalance();
    }
  }

  find(value, pos = this.root){
    if(pos === null){
      return null;
    }
    if(pos.value === value){
      return pos;
    }

    if(value < pos.value){
      return this.find(value, pos.leftChild);
    }

    if(value > pos.value){
      return this.find(value, pos.rightChild);
    }
  }

  findParent(value, pos = this.root){
    if(pos === null || value === this.root.value){
      return null;
    }
    if(pos.leftChild?.value === value || pos.rightChild?.value === value){
      return pos;
    } else {
      if(value < pos.value){
        return this.findParent(value, pos.leftChild);
      }

      if(value > pos.value){
        return this.findParent(value, pos.rightChild);
      }
    }
  }

  levelOrder(cb){
    if(!cb){
      throw new Error("A callback is required.");
    }
    const queue = [this.root];

    while(queue.length > 0){
      const currentNode = queue.shift();
      if(currentNode.leftChild !== null){
        queue.push(currentNode.leftChild);
      }
      if(currentNode.rightChild !== null){
        queue.push(currentNode.rightChild);
      }
      cb(currentNode);
    }
  }

  preOrder(cb, node = this.root, arr = []){

    if(node === null){
      return;
    }
 
    cb ? cb(node.value) : arr.push(node.value);
    this.preOrder(cb, node.leftChild, arr);
    this.preOrder(cb, node.rightChild, arr);

    return arr;
  }
  
  inOrder(cb, node = this.root, arr = []){

    if(node === null){
      return;
    }

    this.inOrder(cb, node.leftChild, arr);
    cb ? cb(node.value) : arr.push(node.value);
    this.inOrder(cb, node.rightChild, arr);

    return arr;
  }

  postOrder(cb, node = this.root, arr = []){
    if(node === null){
      return;
    }
 
    this.postOrder(cb, node.leftChild, arr);
    this.postOrder(cb, node.rightChild, arr);
    cb ? cb(node.value) : arr.push(node.value);

    return arr;
  }

  height(value){
    const node = this.find(value);

    if(node === null){
      return null;
    }

    return this.heightHelp(node);
  }

  heightHelp(node){
    if(node === null) return 0;

    const heightLeft = this.heightHelp(node.leftChild);
    const heightRight = this.heightHelp(node.rightChild);

    return Math.max(heightLeft, heightRight) + 1;
  }

  depth(value){
    const node = this.find(value);
    if(node === null) return null;

    return this.depthHelp(value);
  }

  depthHelp(value, node = this.root, edgeCount = 0){
    if(node === null) return 0;
    if(node.value === value) return edgeCount;

    if(value < node.value){
      return this.depthHelp(value, node.leftChild, edgeCount + 1)
    } else {
      console.log("intra aici? ", node.value)
      return this.depthHelp(value, node.rightChild, edgeCount + 1)
    }

  }

  isBalanced(node = this.root){
    if(node === null){
      return true;
    }

    const heightLeft = this.heightHelp(node.leftChild);
    const heightRight = this.heightHelp(node.rightChild);
    return (
      Math.abs(heightLeft - heightRight) <= 1 &&
      this.isBalanced(node.leftChild) &&
      this.isBalanced(node.rightChild)
    );
  }

  rebalance(){
    const orderedArr = this.inOrder();
    this.root = this.buildTree(orderedArr);
  }

}




function prettyPrint(node, prefix = '', isLeft = true){
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};


const maTree = new Tree([1,2,3,4,5,6,7]);
prettyPrint(maTree.root);
console.log(maTree.isBalanced());

maTree.insert(8);
maTree.insert(9);
prettyPrint(maTree.root);
console.log(maTree.isBalanced());

console.log(maTree.inOrder())
console.log(maTree.preOrder())
console.log(maTree.postOrder())

const arr = [];
maTree.levelOrder(node => {arr.push(node.value)})
console.log(arr);

maTree.deleteItem(5);
prettyPrint(maTree.root);
