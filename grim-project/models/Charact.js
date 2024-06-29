// backend/models/Character.js
const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  character_name: { type: String, required: true },
  player_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  race_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Race', required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  ap_earned: { type: Number, default: 10 },
  copper: { type: Number, default: 0 },
  silver: { type: Number, default: 0 },
  gold: { type: Number, default: 0 },
  pdfFilePath: { type: String, default: null },
  is_checked_in: { type: Boolean, default: false },
});

const Character = mongoose.model('Character', characterSchema);
module.exports = Character;
