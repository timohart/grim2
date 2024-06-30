// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Character = require('./models/Charact');
const Player = require('./models/Player');
const Class = require('./models/Clas');
const Race = require('./models/Race');
const Event = require('./models/Event');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'your_mongodb_uri_here';

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check connection
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
// Characters
app.get('/api/characters', async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/characters', async (req, res) => {
  const character = new Character({
    character_name: req.body.character_name,
    class: req.body.class,
    race: req.body.race,
    player: req.body.player,
    level: req.body.level,
    checked_in: req.body.checked_in,
    cp_earned: req.body.cp_earned,
    copper: req.body.copper,
    silver: req.body.silver,
    gold: req.body.gold,
  });

  try {
    const newCharacter = await character.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/characters/:id', getCharacter, (req, res) => {
  res.json(res.character);
});

app.patch('/api/characters/:id', getCharacter, async (req, res) => {
  if (req.body.character_name != null) {
    res.character.character_name = req.body.character_name;
  }
  if (req.body.class != null) {
    res.character.class = req.body.class;
  }
  if (req.body.race != null) {
    res.character.race = req.body.race;
  }
  if (req.body.player != null) {
    res.character.player = req.body.player;
  }
  if (req.body.level != null) {
    res.character.level = req.body.level;
  }
  if (req.body.checked_in != null) {
    res.character.checked_in = req.body.checked_in;
  }
  if (req.body.cp_earned != null) {
    res.character.cp_earned = req.body.cp_earned;
  }
  if (req.body.copper != null) {
    res.character.copper = req.body.copper;
  }
  if (req.body.silver != null) {
    res.character.silver = req.body.silver;
  }
  if (req.body.gold != null) {
    res.character.gold = req.body.gold;
  }
  try {
    const updatedCharacter = await res.character.save();
    res.json(updatedCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/characters/:id', getCharacter, async (req, res) => {
  try {
    await res.character.remove();
    res.json({ message: 'Character deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getCharacter(req, res, next) {
  let character;
  try {
    character = await Character.findById(req.params.id);
    if (character == null) {
      return res.status(404).json({ message: 'Cannot find character' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.character = character;
  next();
}

// Players
app.get('/api/players', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/players', async (req, res) => {
  const player = new Player({
    player_name: req.body.player_name,
    email: req.body.email,
  });

  try {
    const newPlayer = await player.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/players/:id', getPlayer, (req, res) => {
  res.json(res.player);
});

app.patch('/api/players/:id', getPlayer, async (req, res) => {
  if (req.body.player_name != null) {
    res.player.player_name = req.body.player_name;
  }
  if (req.body.email != null) {
    res.player.email = req.body.email;
  }
  try {
    const updatedPlayer = await res.player.save();
    res.json(updatedPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/players/:id', getPlayer, async (req, res) => {
  try {
    await res.player.remove();
    res.json({ message: 'Player deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getPlayer(req, res, next) {
  let player;
  try {
    player = await Player.findById(req.params.id);
    if (player == null) {
      return res.status(404).json({ message: 'Cannot find player' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.player = player;
  next();
}

// Classes
app.get('/api/classes', async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/classes', async (req, res) => {
  const classObj = new Class({
    class_name: req.body.class_name,
    primary_stats: req.body.primary_stats,
    secondary_stats: req.body.secondary_stats,
  });

  try {
    const newClass = await classObj.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/classes/:id', getClass, (req, res) => {
  res.json(res.classObj);
});

app.patch('/api/classes/:id', getClass, async (req, res) => {
  if (req.body.class_name != null) {
    res.classObj.class_name = req.body.class_name;
  }
  if (req.body.primary_stats != null) {
    res.classObj.primary_stats = req.body.primary_stats;
  }
  if (req.body.secondary_stats != null) {
    res.classObj.secondary_stats = req.body.secondary_stats;
  }
  try {
    const updatedClass = await res.classObj.save();
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/classes/:id', getClass, async (req, res) => {
  try {
    await res.classObj.remove();
    res.json({ message: 'Class deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getClass(req, res, next) {
  let classObj;
  try {
    classObj = await Class.findById(req.params.id);
    if (classObj == null) {
      return res.status(404).json({ message: 'Cannot find class' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.classObj = classObj;
  next();
}

// Races
app.get('/api/races', async (req, res) => {
  try {
    const races = await Race.find();
    res.json(races);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/races', async (req, res) => {
  const race = new Race({
    race_name: req.body.race_name,
    starting_stats: req.body.starting_stats,
    starting_talents: req.body.starting_talents,
    starting_skills: req.body.starting_skills,
    languages: req.body.languages,
  });

  try {
    const newRace = await race.save();
    res.status(201).json(newRace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/races/:id', getRace, (req, res) => {
  res.json(res.race);
});

app.patch('/api/races/:id', getRace, async (req, res) => {
  if (req.body.race_name != null) {
    res.race.race_name = req.body.race_name;
  }
  if (req.body.starting_stats != null) {
    res.race.starting_stats = req.body.starting_stats;
  }
  if (req.body.starting_talents != null) {
    res.race.starting_talents = req.body.starting_talents;
  }
  if (req.body.starting_skills != null) {
    res.race.starting_skills = req.body.starting_skills;
  }
  if (req.body.languages != null) {
    res.race.languages = req.body.languages;
  }
  try {
    const updatedRace = await res.race.save();
    res.json(updatedRace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/races/:id', getRace, async (req, res) => {
  try {
    await res.race.remove();
    res.json({ message: 'Race deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getRace(req, res, next) {
  let race;
  try {
    race = await Race.findById(req.params.id);
    if (race == null) {
      return res.status(404).json({ message: 'Cannot find race' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.race = race;
  next();
}

// Events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/events', async (req, res) => {
  const event = new Event({
    event_name: req.body.event_name,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    location: req.body.location,
    characters_checked_in: req.body.characters_checked_in,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/events/:id', getEvent, (req, res) => {
  res.json(res.event);
});

app.patch('/api/events/:id', getEvent, async (req, res) => {
  if (req.body.event_name != null) {
    res.event.event_name = req.body.event_name;
  }
  if (req.body.start_date != null) {
    res.event.start_date = req.body.start_date;
  }
  if (req.body.end_date != null) {
    res.event.end_date = req.body.end_date;
  }
  if (req.body.location != null) {
    res.event.location = req.body.location;
  }
  if (req.body.characters_checked_in != null) {
    res.event.characters_checked_in = req.body.characters_checked_in;
  }
  try {
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/events/:id', getEvent, async (req, res) => {
  try {
    await res.event.remove();
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getEvent(req, res, next) {
  let event;
  try {
    event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: 'Cannot find event' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.event = event;
  next();
}

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
