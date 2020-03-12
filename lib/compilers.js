
function Compiler() {
    let code = '$model = $model || {};\nlet $result = "";\nwith ($model) {\n';
    
    this.text = function (text) {
        code += '$result += ' + JSON.stringify(text) + ';\n';
        
        return this;
    };
    
    this.expression = function (expr) {
        code += '$result += ' + expr + ';\n';
        
        return this;
    };
    
    this.compile = function () {
        code += '}\nreturn $result;\n';
        
        return new Function('$model', code);
    };
}

function createCompiler() {
    return new Compiler();
}

module.exports = {
    compiler: createCompiler
};