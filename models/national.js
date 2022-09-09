const mongoose = require('mongoose');

const nationalSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    eliminated: {type: Boolean, required: true},
    yearFounded: {type: Number, required: true},
    wsWins: {type: Number, required: true},
    img: {type: String, required: true},
})

const  National = mongoose.model('National', nationalSchema);
module.exports = National;