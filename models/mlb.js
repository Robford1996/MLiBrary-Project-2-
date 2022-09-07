const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({

})

const  teams = mongoose.model('teams', teamSchema);
module.exports = teams;