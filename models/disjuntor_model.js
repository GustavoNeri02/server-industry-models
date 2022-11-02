const mongoose = require('mongoose');


const DisjuntorSchema = mongoose.Schema({
    azimute: {
        type: String,
        require: true
    },
    info: {
        type: Map,
        require: true
    },
    subStation: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const modelName = 'Disjuntor';

module.exports = mongoose.model('Disjuntor', DisjuntorSchema);
if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, DisjuntorSchema);
}