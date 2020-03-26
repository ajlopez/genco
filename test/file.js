
const genco = require('..');

const path = require('path');
const fs = require('fs');

exports['process simple file'] = function (test) {
    const filename = path.join(__dirname, 'files', 'hello.txt');
    const result = genco.file({ name: 'Adam' }, filename);
    
    test.ok(result);
    test.equal(result, 'hello, Adam');
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

