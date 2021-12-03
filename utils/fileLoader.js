const fs = require('fs');

const getFile = (uri) => {
    return fs.readFileSync(uri = "./input.txt", 'utf-8', (err, data) => {
        if(!err){
            return data;
        }else{
            return false;
        };
    });
};

const getStringArrayFromFile = (uri) => {
    const data = getFile(uri);
    return data.split("\n");
}

const getNumberArrayFromFile = (uri) => {
    const data = getArrayFromFile(uri);
    return data.map(x => parseInt(x));
}

module.exports = {
    getStringArrayFromFile,
    getNumberArrayFromFile,
}