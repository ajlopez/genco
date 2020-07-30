
const compilers = require('./compilers');
const lexers = require('./lexers');
const TokenType = lexers.TokenType;

const fs = require('fs');

function compileText(text) {
    const compiler = compilers.compiler();
    const lexer = lexers.lexer(text);
    
    for (let token = lexer.next(); token; token = lexer.next()) 
        if (token.type === TokenType.Text)
            compiler.text(token.value);
        else if (token.type === TokenType.Code)
            compiler.code(token.value);
        else if (token.type === TokenType.Expression)
            compiler.expression(token.value);
        
    return compiler.compile();
}

function processModelText(model, text) {
    return compileText(text)(model);
}

function processModelFile(model, filename, filename2) {
    const text = fs.readFileSync(filename).toString();
    
    const result = processModelText(model, text);
    
    if (!filename2)
        return result;
    
    fs.writeFileSync(filename2, result);
}

module.exports = {
    compile: compileText,
    process: processModelText,
    file: processModelFile
};

