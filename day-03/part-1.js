const { getStringArrayFromFile } = require("../utils/fileLoader");

const data = getStringArrayFromFile();
const bitSumArray = new Array(data[0].length).fill(0);

data.forEach(binary => {
    for(let i=0; i<binary.length; i++){
        bitSumArray[i] += parseInt(binary.charAt(i));
    }
})

let gamma = "";
let epsilon = "";

bitSumArray.forEach(total => {
    const value = total>data.length/2;
    gamma += value ? 1 : 0;
    epsilon += value ? 0 : 1;
})

console.log(parseInt(gamma, 2)*parseInt(epsilon, 2));
