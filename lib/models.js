

function setKeyValue(model, key, value) {
    const p = key.indexOf('.', 1);
    
    if (p >= 1) {
        const subkey = key.substring(0, p);
        
        if (!model[subkey])
            model[subkey] = {};
        
        setKeyValue(model[subkey], key.substring(p + 1), value);
        
        return;
    }
    
    model[key] = value;
}

module.exports = {
    set: setKeyValue
};



