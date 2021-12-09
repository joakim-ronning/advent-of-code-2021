const { sign } = require("crypto");
const { getStringArrayFromFile } = require("../utils/fileLoader");
const Helper = require("./helper");

const data = getStringArrayFromFile();

const decodedInputs = data.map(input => Helper.getPatternOutputObject(input));

const result = decodedInputs.map(dInput => {
    const signalDigitMap = Helper.getSignalDigitMap(dInput.patterns);
    const outputs = dInput.output.map(out => out.split('').sort().join(''));
    const digitOutputs = outputs.map(n => signalDigitMap.get(n));
    parseInt(''.concat(...digitOutputs));
    return parseInt(outputs.map(out => signalDigitMap.get(out) + '').join(''));
}).reduce((a,b) => a+b,0);

console.log(result);