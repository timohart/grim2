// backend/models/Class.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  class_name: { type: String, required: true },
  description: { type: String, default: '' },
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;
