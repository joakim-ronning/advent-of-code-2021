const { getStringArrayFromFile } = require("../utils/fileLoader");

const data = getStringArrayFromFile();

const getCommon = (arr, index, first, last) => {
    let bitSum = 0;
    arr.forEach(binary => {
        bitSum += parseInt(binary.charAt(index));
    })
    const common = bitSum >= arr.length/2 ? first : last;
    return arr.filter(binary => binary.charAt(index) === common);
}

const getOxygen = (arr, index) => {
    if(arr.length == 1){
        return arr[0];
    }
    return getOxygen(getCommon(arr, index + 1, '1', '0'), index + 1)
}

const getCarbon = (arr, index) => {
    if(arr.length == 1){
        return arr[0];
    }
    return getCarbon(getCommon(arr, index + 1, '0', '1'), index + 1)
}

console.log(parseInt(getOxygen(data, -1), 2) * parseInt(getCarbon(data, -1), 2));
