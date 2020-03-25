
const genco = require('..');
const path = require('path');

exports['process simple file'] = function (test) {
    const filename = path.join(__dirname, 'files', 'hello.txt');
    const result = genco.file({ name: 'Adam' }, filename);
    
    test.ok(result);
    test.equal(result, 'hello, Adam');
};

