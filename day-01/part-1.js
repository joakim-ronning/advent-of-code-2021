const { getNumberArrayFromFile } = require("../utils/fileLoader");
const { getResult } = require("./helper");

const arr = getNumberArrayFromFile()

console.log(getResult(arr));
