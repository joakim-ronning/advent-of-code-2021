
const getResult = (data, match, stepCalculator) => data.map(n => Math.abs(n-match)).map(n => stepCalculator(n)).reduce((a,b) => a + b, 0);


const getResults = (data, stepCalculator) => {
    const checkedNumbers = [];
    const results = [];
    data.forEach(match => {
        if(checkedNumbers.includes(match)){
            return;
        }
        results.push(getResult(data, match, stepCalculator));
        checkedNumbers.push(match);
    })

    return results;
}

const getSimpleResults = (data) => {
    return getResults(data, (n => n));
}

const getCompoundedResults = (data) => {
    return getResults(data, (n => n * (n + 1) / 2));
}

module.exports = { getSimpleResults, getCompoundedResults };




