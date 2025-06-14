function fibs(n){
  if(n === 1) return [0];
  if(n === 2) return [0, 1];
  if(n < 1) return "There was nothing to return.";

  const arr = [0, 1];
  for(let i = 2; i < n; i++){
    arr.push(arr[i-1] + arr[i-2]);
  }
  return arr;
}

function fibsRec(n, arr=[0,1]){
  if(arr.length >= n){
    return arr.slice(0,n)
  }

  return fibsRec(n, [...arr, arr[arr.length - 1] + arr[arr.length - 2]]);
}

console.log(fibsRec(8))
