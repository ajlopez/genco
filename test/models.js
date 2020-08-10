
const models = require('../lib/models');

exports['set key value into empty model'] = function (test) {
    const model = {};
    
    models.set(model, 'name', 'Adam');
    
    test.deepEqual(model, { name: 'Adam' });
};

exports['replace value'] = function (test) {
    const model = { 'name': 'Set' };
    
    models.set(model, 'name', 'Adam');
    
    test.deepEqual(model, { name: 'Adam' });
};

exports['set key value into non-empty model'] = function (test) {
    const model = { name: 'Adam' };
    
    models.set(model, 'age', 800);
    
    test.deepEqual(model, { name: 'Adam', age: 800 });
};

exports['set composite key value into model'] = function (test) {
    const model = { name: 'Adam' };
    
    models.set(model, 'wife.name', 'Eve');
    
    test.deepEqual(model, { name: 'Adam', wife: { name: 'Eve' } });
};

