const { getStringArrayFromFile } = require("../utils/fileLoader");
const Helper = require("./helper");


const data = getStringArrayFromFile()[0].split(",").map(n => parseInt(n));

let amounts = [0,0,0,0,0,0,0,0,0];

data.forEach(fish => amounts[fish] = amounts[fish] + 1);

for(let i=0; i<256; i++) {
    amounts = Helper.countBatch(amounts);
}

console.log(amounts.reduce((a,b) => a+b, 0));
