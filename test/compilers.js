
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

exports['compile code and text'] = function (test) {
    const compiler = compilers.compiler();
    
    const fn = compiler
        .code("for (let k = 0; k < n; k++) {")
        .text("hello")
        .code("}")
        .compile();
        
    test.equal(typeof fn, "function");
    
    test.equal(fn({ n: 3 }), "hellohellohello");
};

