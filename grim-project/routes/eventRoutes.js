// backend/routes/eventRoutes.js
const express = require('express');
const Event = require('../models/Event');
const Character = require('../models/Charact');
const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('characters_checked_in');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('characters_checked_in');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new event
router.post('/', async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Check-in a character to an event
router.post('/:id/check-in', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const character = await Character.findById(req.body.characterId);
    if (!character) return res.status(404).json({ message: 'Character not found' });

    character.is_checked_in = true;
    event.characters_checked_in.push(character);

    await character.save();
    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check-out a character from an event
router.post('/:id/check-out', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const character = await Character.findById(req.body.characterId);
    if (!character) return res.status(404).json({ message: 'Character not found' });

    character.is_checked_in = false;
    character.copper += req.body.copper || 0;
    character.silver += req.body.silver || 0;
    character.gold += req.body.gold || 0;

    // Remove character from the event's checked-in list
    event.characters_checked_in = event.characters_checked_in.filter(
      (charId) => charId.toString() !== req.body.characterId
    );

    // Update AP earned based on the days attended
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    const daysAttended = (endDate - startDate) / (1000 * 60 * 60 * 24);
    character.ap_earned += Math.floor(daysAttended);

    await character.save();
    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
