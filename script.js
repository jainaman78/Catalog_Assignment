const fs = require('fs');

function decodeBaseValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points, k) {
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let li = 1;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j].x;
                li *= -xj / (xi - xj);
            }
        }

        constantTerm += yi * li;
    }

    return constantTerm;
}

function findSecretConstant(jsonData) {
    let n = jsonData.keys.n;
    let k = jsonData.keys.k;

    let points = [];

    Object.keys(jsonData).forEach(key => {
        if (key !== 'keys') {
            let base = parseInt(jsonData[key].base);
            let value = jsonData[key].value;
            let x = parseInt(key);  
            let y = decodeBaseValue(base, value); 
            points.push({ x, y });
        }
    });

    points.sort((a, b) => a.x - b.x); 

    return lagrangeInterpolation(points, k);
}

function output(testCases) {
    testCases.forEach((testCase, index) => {
        let result = findSecretConstant(testCase);
        console.log(`The c for test case ${index + 1} is: ${result}`);
    });
}

const Case1 = JSON.parse(fs.readFileSync('testcase1.json', 'utf8'));
const Case2 = JSON.parse(fs.readFileSync('testcase2.json', 'utf8'));

const testCases = [Case1, Case2];

output(testCases);
