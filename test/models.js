
const models = require('../lib/models');

exports['set key value into empty model'] = function (test) {
    const model = {};
    
    models.set(model, 'name', 'Adam');
    
    test.deepEqual(model, { name: 'Adam' });
};

exports['set key value into non-empty model'] = function (test) {
    const model = { name: 'Adam' };
    
    models.set(model, 'age', 800);
    
    test.deepEqual(model, { name: 'Adam', age: 800 });
};

