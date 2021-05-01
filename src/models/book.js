const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({

    title: String,
    description: String,
    autor: String,
    anio: String,
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('books',BookSchema);