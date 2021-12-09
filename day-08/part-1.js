const { getStringArrayFromFile } = require("../utils/fileLoader");
const Helper = require("./helper");

const data = getStringArrayFromFile();

const outputsList = Helper.getOutputs(data);

console.log([].concat(...outputsList).filter(output => [2,3,4,7].includes(output.length)).length);
