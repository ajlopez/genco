
const TokenType = {
    Text: 1,
    Expression: 2,
    Code: 3
};

function Lexer(text) {
    const l = text.length;
    let p = 0;
    
    this.next = function () {
        if (p >= l)
            return null;
        
        const b = text.indexOf('${', p);
        const b2 = text.indexOf('<#', p);
        
        if (b === p) {
            const e = text.indexOf('}', p + 2);
            
            const token = {
                type: TokenType.Expression,
                value: text.substring(b + 2, e)
            };
            
            p = e + 1;
            
            return token;
        }
        
        if (b2 === p) {
            const e = text.indexOf('#>', p + 2);
            
            const token = {
                type: TokenType.Code,
                value: text.substring(b2 + 2, e)
            };
            
            p = e + 2;
            
            return token;
        }
        
        if (b > p && b2 > p) {
            const b3 = Math.min(b, b2);
            
            const token = {
                type: TokenType.Text,
                value: text.substring(p, b3)
            };
            
            p = b3;
            
            return token;
        }
        
        if (b > p) {
            const token = {
                type: TokenType.Text,
                value: text.substring(p, b)
            };
            
            p = b;
            
            return token;
        }

        if (b2 > p) {
            const token = {
                type: TokenType.Text,
                value: text.substring(p, b2)
            };
            
            p = b2;
            
            return token;
        }

        const token = {
            type: TokenType.Text,
            value: text.substring(p)
        };
        
        p = l;
        
        return token;
    };
}

function createLexer(text) {
    return new Lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
};

