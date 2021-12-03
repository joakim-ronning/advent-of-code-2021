const { getNumberArrayFromFile } = require("../utils/fileLoader");
const { getResult } = require("./helper");

const arr = getNumberArrayFromFile();
const arr2 = [];

for (let i=1; i<arr.length-1; i++){
    arr2.push(parseInt(arr[i-1])+parseInt(arr[i])+parseInt(arr[i+1]))
}

console.log(getResult(arr2));
