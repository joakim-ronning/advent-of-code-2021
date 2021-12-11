const { getStringArrayFromFile } = require("../utils/fileLoader");
const Helper = require("./helper");

const data = getStringArrayFromFile();

const points = Helper.getPoints(data);

const result = new Array(100).fill(0).map(n => Helper.step(points)).reduce((a,b) => a + b, 0);
console.log(result);
