
const compilers = require('./compilers');
const lexers = require('./lexers');
const TokenType = lexers.TokenType;

function compileText(text) {
    const compiler = compilers.compiler();
    const lexer = lexers.lexer(text);
    
    let token;
    
    while (token = lexer.next()) 
        if (token.type === TokenType.Text)
            compiler.text(token.value);
        else if (token.type === TokenType.Code)
            compiler.code(token.value);
        else if (token.type === TokenType.Expression)
            compiler.expression(token.value);
        
    return compiler.compile();
}

module.exports = {
    compile: compileText
};