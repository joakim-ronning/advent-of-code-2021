const { getStringArrayFromFile } = require("../utils/fileLoader");
const Helper = require("./helper");

const data = getStringArrayFromFile();

const points = Helper.getPoints(data);

let result = 1;
while(Helper.step(points) !== points.length) result++;
console.log(result);
