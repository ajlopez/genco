
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

