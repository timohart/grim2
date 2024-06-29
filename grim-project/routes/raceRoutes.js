// backend/routes/raceRoutes.js
const express = require('express');
const Race = require('../models/Race');
const router = express.Router();

// Get all races
router.get('/', async (req, res) => {
  try {
    const races = await Race.find();
    res.json(races);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single race by ID
router.get('/:id', async (req, res) => {
  try {
    const race = await Race.findById(req.params.id);
    if (!race) return res.status(404).json({ message: 'Race not found' });
    res.json(race);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new race
router.post('/', async (req, res) => {
  const newRace = new Race(req.body);
  try {
    const savedRace = await newRace.save();
    res.status(201).json(savedRace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a race
router.put('/:id', async (req, res) => {
  try {
    const updatedRace = await Race.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRace) return res.status(404).json({ message: 'Race not found' });
    res.json(updatedRace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a race
router.delete('/:id', async (req, res) => {
  try {
    const deletedRace = await Race.findByIdAndDelete(req.params.id);
    if (!deletedRace) return res.status(404).json({ message: 'Race not found' });
    res.json({ message: 'Race deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
