
const compilers = require('../lib/compilers');

exports['compile simple text'] = function (test) {
    const compiler = compilers.compiler();
    
    const fn = compiler.text("hello, ")
        .text("world")
        .compile();
        
    test.equal(typeof fn, "function");
    
    test.equal(fn(), "hello, world");
};

exports['compile text and expression'] = function (test) {
    const compiler = compilers.compiler();
    
    const fn = compiler.text("hello, ")
        .expression("name")
        .compile();
        
    test.equal(typeof fn, "function");
    
    test.equal(fn({ name: 'Adam' }), "hello, Adam");
};


