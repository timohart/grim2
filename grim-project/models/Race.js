// backend/models/Race.js
const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
  race_name: { type: String, required: true },
  description: { type: String, default: '' },
});

const Race = mongoose.model('Race', raceSchema);
module.exports = Race;
