
const genco = require('..');

const path = require('path');
const fs = require('fs');

exports['process simple file with expression'] = function (test) {
    const filename = path.join(__dirname, 'files', 'hello.txt');
    const result = genco.file({ name: 'Adam' }, filename);
    
    test.ok(result);
    test.equal(result, 'hello, Adam');
};

exports['process simple file with code'] = function (test) {
    const filename = path.join(__dirname, 'files', 'for.txt');
    const result = genco.file({ n: 6 }, filename);
    
    test.ok(result);
    test.equal(result, '012345');
};

exports['process simple file creating a file'] = function (test) {
    const filename = path.join(__dirname, 'files', 'hello.txt');
    const filename2 = path.join(__dirname, 'result', 'hello.txt');
    
    try {
        fs.statSysnc(filename2);
        fs.unlinkSync(filename2);
    }
    catch (ex) {
    }
    
    genco.file({ name: 'Adam' }, filename, filename2);
    
    const result = fs.readFileSync(filename2).toString();
    
    test.ok(result);
    test.equal(result, 'hello, Adam');
};

