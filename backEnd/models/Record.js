const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Record = new Schema({
    name:{
        type: String
    },
    url:{
        type: String
    },
    category:{
        type: String
    }
});

module.exports = mongoose.model('Records',  Record);
