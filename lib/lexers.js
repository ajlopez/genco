
const TokenType = {
    Text: 1,
    Expression: 2,
    Code: 3
};

function Lexer(text) {
    const tlength = text.length;
    let position = 0;
    
    this.next = function () {
        if (position >= tlength)
            return null;
        
        if (text.substring(position, position + 2) === '${')
            return nextExpression();
        
        if (text.substring(position, position + 2) === '<#')
            return nextCode();
        
        const b = text.indexOf('${', position);
        const b2 = text.indexOf('<#', position);
        
        if (b > position && b2 > position) {
            const b3 = Math.min(b, b2);
            
            const token = {
                type: TokenType.Text,
                value: text.substring(position, b3)
            };
            
            position = b3;
            
            return token;
        }
        
        if (b > position) {
            const token = {
                type: TokenType.Text,
                value: text.substring(position, b)
            };
            
            position = b;
            
            return token;
        }

        if (b2 > position) {
            const token = {
                type: TokenType.Text,
                value: text.substring(position, b2)
            };
            
            position = b2;
            
            return token;
        }

        const token = {
            type: TokenType.Text,
            value: text.substring(position)
        };
        
        position = tlength;
        
        return token;
    };
    
    function nextExpression() {
        const e = text.indexOf('}', position + 2);
        
        const token = {
            type: TokenType.Expression,
            value: text.substring(position + 2, e)
        };
        
        position = e + 1;
        
        return token;
    }
    
    function nextCode() {
        const ending = text.indexOf('#>', position + 2);
        
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

