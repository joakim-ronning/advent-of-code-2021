const getResult = (arr) => {
    let counter = 0;
    for (let i=1; i<arr.length; i++){
        counter += arr[i] > arr[i-1] ? 1 : 0
    }
    return counter;
}

module.exports = {getResult,}