class Node{
  constructor(key, value){
    this.key = key;
    this.value = value;
  }
}

class HashMap{
  constructor(capacity){
    this.capacity = capacity;
    this.loadFactor = 0.75;
    this.currentLoad = 0;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.flag = 0;
  }

  test(){
    console.log(this.buckets);
    console.log("load: ", this.currentLoad/this.capacity);
  }

   hash(key) {
    let hashCode = 0;
        
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value){
    const hashCode = this.hash(key);

    if(this.has(key)){
      const node = this.get(key);
      node.value = value;
    } else {
      const node = new Node(key, value);

      if(this.buckets[hashCode].length === 0){
        this.currentLoad += 1;
      }
      this.buckets[hashCode].push(node);
    }
    
    if(this.currentLoad/this.capacity >= this.loadFactor && this.flag !== 1){
      this.flag = 1;
      this.resize();
    }
    // console.log("capacity: ", this.capacity);
  }

  get(key){
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];

    if(this.has(key)){
      const node = bucket.find(it => it.key === key);
      return node;
    }
    return null;
  }

  has(key){
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];

    const node = bucket.find(it => it.key === key);
    if(node) return true;
    return false;
  }

  remove(key){
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];

    if(this.has(key)){
      const index = bucket.findIndex(it => it.key === key);
      if(bucket.length === 1){
        this.currentLoad -= 1;
      }
      bucket.splice(index, 1);
      
      return true;
    }
    return false;
  }

  length(){
    let len = 0;

    this.buckets.forEach(bucket => {
      len += bucket.length;
    });

    return len;
  }

  clear(){
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.currentLoad = 0
  }

  keys(){
    const keysArr = [];

    this.buckets.forEach(bucket => {
      bucket.forEach(node => {
        keysArr.push(node.key);
      });
    });

    return keysArr;
  }

  values(){
    const valArr = [];

    this.buckets.forEach(bucket => {
      bucket.forEach(node => {
        valArr.push(node.value);
      });
    });

    return valArr;
  }

  entries(){
    const entArr = [];

    this.buckets.forEach(bucket => {
      bucket.forEach(node => {
        entArr.push([node.key, node.value]);
      });
    });

    return entArr;
  }

  resize(){
    if(this.currentLoad/this.capacity < this.loadFactor){
      return;
    }

    const oldBucketListEntries = this.entries();
    this.currentLoad = 0;
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);

    oldBucketListEntries.forEach(entry => {
      const [key, value] = entry;
      this.set(key, value);
    });
  }
}

const maMap = new HashMap(16);

maMap.set('apple', 'red');
maMap.set('banana', 'yellow');
maMap.set('carrot', 'orange');
maMap.set('dog', 'brown');
maMap.set('elephant', 'gray')
maMap.set('frog', 'green')
maMap.set('grape', 'purple')
maMap.set('hat', 'black')
maMap.set('ice cream', 'white')
maMap.set('jacket', 'blue')
maMap.set('kite', 'pink')
maMap.set('lion', 'golden')
maMap.set('cool', 'hat');
maMap.set('orange', 'boy');
maMap.set('cringe', 'deadly');
maMap.set('yo', 'ghurt');
maMap.set('joe', 'mama');
maMap.set('what', 'islove');
maMap.set('baby', 'donthurtme');
maMap.set('skidaddle', 'skidoodle');

maMap.test();
maMap.remove("lion");

console.log(maMap.has('banana'));
console.log(maMap.has('cringe'));
console.log(maMap.remove('cringe'));
maMap.set('banana', 'huge');
maMap.test();
console.log(maMap.length());
console.log(maMap.keys());
console.log(maMap.values());
console.log(maMap.entries());
maMap.clear();
maMap.test();