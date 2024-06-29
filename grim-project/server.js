// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import Routes
const characterRoutes = require('./routes/charactRoutes');
const classRoutes = require('./routes/clasRoutes');
const eventRoutes = require('./routes/eventRoutes');
const playerRoutes = require('./routes/playerRoutes');
const raceRoutes = require('./routes/raceRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/characters', characterRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/races', raceRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/your-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
