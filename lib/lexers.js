
const TokenType = {
    Text: 1,
    Expression: 2,
    Code: 3
};

const beginCode = '<#';
const endCode = '#>';
const beginExpression = '${';
const endExpression = '}';

function Lexer(text) {
    const tlength = text.length;
    let position = 0;
    
    this.next = function () {
        if (position >= tlength)
            return null;
        
        if (text.substring(position, position + beginExpression.length) === beginExpression)
            return nextExpression();
        
        if (text.substring(position, position + beginCode.length) === beginCode)
            return nextCode();
        
        return nextText();
    };
    
    function nextText() {
        const b = text.indexOf(beginExpression, position);
        const b2 = text.indexOf(beginCode, position);
        
        let ending;
        
        if (b > position && b2 > position)
            ending = Math.min(b, b2);
        else if (b > position)
            ending = b;
        else if (b2 > position)
            ending = b2;
        else
            ending = tlength;
        
        const token = {
            type: TokenType.Text,
            value: text.substring(position, ending)
        };
            
        position = ending;
        
        return token;
    }
    
    function nextExpression() {
        const ending = text.indexOf(endExpression, position + 2);
        
        const token = {
            type: TokenType.Expression,
            value: text.substring(position + 2, ending)
        };
        
        position = ending + 1;
        
        return token;
    }
    
    function nextCode() {
        const ending = text.indexOf(endCode, position + 2);
        
        const token = {
            type: TokenType.Code,
            value: text.substring(position + 2, ending)
        };
        
        position = ending + 2;
        
        if (text[position] === '\r')
            position++;
        if (text[position] === '\n')
            position++;
        
        return token;
    }
}

function createLexer(text) {
    return new Lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
};

