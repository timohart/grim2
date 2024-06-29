// backend/routes/classRoutes.js
const express = require('express');
const Class = require('../models/Clas');
const router = express.Router();

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single class by ID
router.get('/:id', async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);
    if (!classData) return res.status(404).json({ message: 'Class not found' });
    res.json(classData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new class
router.post('/', async (req, res) => {
  const newClass = new Class(req.body);
  try {
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a class
router.put('/:id', async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) return res.status(404).json({ message: 'Class not found' });
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a class
router.delete('/:id', async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) return res.status(404).json({ message: 'Class not found' });
    res.json({ message: 'Class deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
