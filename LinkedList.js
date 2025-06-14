class Node {
  constructor(value)
  {
    this.value = value || null;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor(){
    this.head = null;
  }

  append(value){
    if(this.head === null){
      this.head = new Node(value);
      return;
    }

    let it = this.head

    while(it.nextNode !== null){
      it = it.nextNode;
    }

    it.nextNode = new Node(value);
  }

  prepend(value){
    const temp = new Node(value);
    temp.nextNode = this.head;
    this.head = temp;
  }

  getSize(){
    let it = this.head;
    let counter = 0;

    while(it !== null){
      counter += 1;
      it = it.nextNode;
    }

    return counter;
  }

  getHead(){
    return this.head;
  }

  getTail(){
    let it = this.head;

    while(it.nextNode !== null){
      it = it.nextNode;
    }

    return it;
  }

  at(index){
    let it = this.head;

    for(let i = 0; i < index; i++){
      if(it === null){
        return "There is nothing at that index."
      }
      it = it.nextNode;
    }

    return it;
  }

  pop(){
    if(this.head === null) return "There was nothing to pop."
    if(this.head.nextNode === null){
      this.head = null;
      return;
    }

    let it = this.head;

    while(it.nextNode.nextNode !== null){
      it = it.nextNode;
    }
    const temp = it.nextNode;
    it.nextNode = null;

    return temp;
  }

  contains(value){
    let it = this.head;

    while(it !== null){
      if(it.value === value) return true;
      it = it.nextNode;
    }

    return false;
  }

  find(value){
    let it = this.head;
    let index = 0;

    while(it !== null){
      if(it.value === value) return index;

      it = it.nextNode;
      index += 1;
    }

    return null;
  }

  toString(){
    let str = ``;
    let it = this.head;

    while(it !== null){
      str += `( ${it.value} ) -> `;
      it = it.nextNode;
    }
    str += `null`;

    return str;
  }

  insertAt(value, index){
    let it = this.head;

    //get node from [index-1]
    for(let i = 0; i < index - 1; i++){
      if(it === null) return `Can not insert at that index. List size: ${this.getSize()}`
      it = it.nextNode;
    }

    const temp = new Node(value);
    //old children of [index-1] are now the children of the new node
    temp.nextNode = it.nextNode;
    //the new node is now the child of [index-1]
    it.nextNode = temp;
  }

  removeAt(index){
    let it = this.head;

    //get node from [index-1]
    for(let i = 0; i < index - 1; i++){
      if(it === null || it.nextNode === null) return `Can not remove from that index. List size: ${this.getSize()}`;
      it = it.nextNode;
    }

    it.nextNode = it.nextNode.nextNode
  }

}



const maList = new LinkedList();

maList.append(2);
maList.append(3);
maList.prepend(1);
console.log(maList.getSize());
console.log(maList.toString());
console.log(maList.getHead());
console.log(maList.getTail());
maList.append(74);
console.log(maList.at(3).value);
console.log(maList.pop());
maList.append(42);
maList.append(4);
maList.append(6);
console.log(maList.contains(42));
console.log(maList.find(42));
maList.insertAt(5,5);
console.log(maList.toString());
maList.removeAt(3);
console.log(maList.toString());