const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    league: Boolean, //radio
    yearFounded: {type: Number, required: true},
    wsWins: {type: Number, required: true},
    img: {type: String, required: true},
})

const  teams = mongoose.model('teams', teamSchema);
module.exports = teams;