
const models = require('../lib/models');

exports['set key value into empty model'] = function (test) {
    const model = {};
    
    models.set(model, 'name', 'Adam');
    
    test.deepEqual(model, { name: 'Adam' });
};

