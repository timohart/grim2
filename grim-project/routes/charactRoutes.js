// backend/routes/characterRoutes.js
const express = require('express');
const Character = require('../models/Charact');
const router = express.Router();

// Get all characters
router.get('/', async (req, res) => {
  try {
    const characters = await Character.find().populate('player_id race_id class_id');
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single character by ID
router.get('/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id).populate('player_id race_id class_id');
    if (!character) return res.status(404).json({ message: 'Character not found' });
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new character
router.post('/', async (req, res) => {
  const newCharacter = new Character(req.body);
  try {
    const savedCharacter = await newCharacter.save();
    res.status(201).json(savedCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a character
router.put('/:id', async (req, res) => {
  try {
    const updatedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCharacter) return res.status(404).json({ message: 'Character not found' });
    res.json(updatedCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a character
router.delete('/:id', async (req, res) => {
  try {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
    if (!deletedCharacter) return res.status(404).json({ message: 'Character not found' });
    res.json({ message: 'Character deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all checked-in characters
router.get('/checked-in', async (req, res) => {
  try {
    const checkedInCharacters = await Character.find({ is_checked_in: true }).populate('player_id race_id class_id');
    res.status(200).json(checkedInCharacters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
