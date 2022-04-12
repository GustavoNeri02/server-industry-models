const mongoose = require('mongoose');


const PararaioSchema = mongoose.Schema({
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

module.exports = mongoose.model('Pararaio', PararaioSchema);