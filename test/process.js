
const genco = require('..');

exports['process simple text'] = function (test) {
    const result = genco.process({}, 'hello, world');
    
    test.ok(result);
    test.equal(result, 'hello, world');
};

exports['process text and expression'] = function (test) {
    const result = genco.process({ name: 'Adam' }, 'hello, ${name}');
    
    test.ok(result);
    test.equal(result, 'hello, Adam');
};

exports['process text and code'] = function (test) {
    const result = genco.process({}, 'hello, <# for (let k = 1; k <= 4; k++) {#>${k}<# } #>');
    
    test.ok(result);
    test.equal(result, 'hello, 1234');
};

