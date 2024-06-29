// backend/models/Player.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  f_name: { type: String, required: true },
  l_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_num: { type: String, required: true },
  starting_ap: { type: Number, default: 10 },
  registration_date: { type: Date, default: Date.now },
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
