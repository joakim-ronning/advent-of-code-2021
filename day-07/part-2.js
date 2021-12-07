const { getStringArrayFromFile } = require("../utils/fileLoader");
const Helper = require("./helper");

const data = getStringArrayFromFile()[0].split(",").map(n => parseInt(n));

console.log(Helper.getCompoundedResults(data).reduce((a,b) => a < b ? a : b, Number.MAX_SAFE_INTEGER));
