// backend/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  event_name: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  location: { type: String, required: true },
  characters_checked_in: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
