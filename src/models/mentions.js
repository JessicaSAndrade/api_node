// Instancia do modulo do mongoose
const mongoose = require('mongoose');
// Instancia do schema, assim como o express, 
// para utilização e criação de um "banco"
const Schema = mongoose.Schema;

// Modelagem do schema, e export do model para o mongoose
const schema = new Schema({

    friend: {
        type: String,
        required: true,
        trim: true
    },

    mention: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Mentions', schema);