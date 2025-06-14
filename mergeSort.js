function merge(arrA, arrB){
  const mergedArr = [];

  while(arrA.length > 0 && arrB.length > 0){
    if(arrA[0] > arrB[0]){
      mergedArr.push(arrB[0]);
      arrB.shift()
    } else {
      mergedArr.push(arrA[0]);
      arrA.shift()
    }
  }

  while(arrA.length > 0 ){
    mergedArr.push(arrA[0]);
    arrA.shift()
  }

  while(arrB.length > 0 ){
    mergedArr.push(arrB[0]);
    arrB.shift()
  }

  return mergedArr;
}

function mergeSort(arr){

  if(arr.length <= 1) return arr;

  const arrA = mergeSort(arr.slice(0, arr.length/2));
  const arrB = mergeSort(arr.slice(arr.length/2))

  return merge(arrA, arrB);
}

let a = [2,5,7,3,1,5,4]
let b = [0,3,-4,-5.5,2.1,14,1404,8]

console.log(mergeSort(a));
console.log(mergeSort(b));

