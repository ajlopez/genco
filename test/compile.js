
const genco = require('..');

exports['compile simple text'] = function (test) {
    const result = genco.compile('hello, world');
    
    test.ok(result);
    test.equal(typeof result, 'function');
    test.equal(result(), 'hello, world');
};

exports['compile text and expression'] = function (test) {
    const result = genco.compile('hello, ${name}');
    
    test.ok(result);
    test.equal(typeof result, 'function');
    test.equal(result({ name: 'Adam' }), 'hello, Adam');
};

exports['compile text and code'] = function (test) {
    const result = genco.compile('hello, <# for (let k = 1; k <= 4; k++) {#>${k}<# } #>');
    
    test.ok(result);
    test.equal(typeof result, 'function');
    test.equal(result({ name: 'Adam' }), 'hello, 1234');
};

exports['compile text and code skipping new line at end of code'] = function (test) {
    const result = genco.compile('hello, <# for (let k = 1; k <= 4; k++) {#>\r\n${k}<# } #>');
    
    test.ok(result);
    test.equal(typeof result, 'function');
    test.equal(result({ name: 'Adam' }), 'hello, 1234');
};

