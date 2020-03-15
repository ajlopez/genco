
const lexers = require('../lib/lexers');
const TokenType = lexers.TokenType;

exports['get simple text'] = function (test) {
    const lexer = lexers.lexer("hello, world");
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.type, TokenType.Text);
    test.equal(token.value, "hello, world");
    
    test.equal(lexer.next(), null);
};

exports['get text and expression'] = function (test) {
    const lexer = lexers.lexer("hello, ${name}");
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.type, TokenType.Text);
    test.equal(token.value, "hello, ");
    
    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.type, TokenType.Expression);
    test.equal(token2.value, "name");
    
    test.equal(lexer.next(), null);
};

exports['get text, code and expression'] = function (test) {
    const lexer = lexers.lexer("hello<# for (let k = 0; k < 10; k++) { #>, ${name[k]}<# } #>");
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.type, TokenType.Text);
    test.equal(token.value, "hello");
    
    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.type, TokenType.Code);
    test.equal(token2.value, " for (let k = 0; k < 10; k++) { ");
    
    const token3 = lexer.next();
    
    test.ok(token3);
    test.equal(token3.type, TokenType.Text);
    test.equal(token3.value, ", ");
    
    const token4 = lexer.next();
    
    test.ok(token4);
    test.equal(token4.type, TokenType.Expression);
    test.equal(token4.value, "name[k]");
    
    const token5 = lexer.next();
    
    test.ok(token5);
    test.equal(token5.type, TokenType.Code);
    test.equal(token5.value, " } ");

    test.equal(lexer.next(), null);
};

