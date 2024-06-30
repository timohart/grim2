// frontend/src/components/RaceCreation.js
import React, { useState } from 'react';
import axios from 'axios';

function RaceCreation() {
  const [raceData, setRaceData] = useState({
    race_name: '',
    starting_stats: '',
    starting_talents: '',
    starting_skills: '',
    languages: '',
  });

  const handleChange = (e) => {
    setRaceData({ ...raceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/races', raceData);
      alert('Race created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create race');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="race_name"
        value={raceData.race_name}
        onChange={handleChange}
        placeholder="Race Name"
      />
      <input
        type="text"
        name="starting_stats"
        value={raceData.starting_stats}
        onChange={handleChange}
        placeholder="Starting Stats"
      />
      <input
        type="text"
        name="starting_talents"
        value={raceData.starting_talents}
        onChange={handleChange}
        placeholder="Starting Talents"
      />
      <input
        type="text"
        name="starting_skills"
        value={raceData.starting_skills}
        onChange={handleChange}
        placeholder="Starting Skills"
      />
      <input
        type="text"
        name="languages"
        value={raceData.languages}
        onChange={handleChange}
        placeholder="Languages"
      />
      <button type="submit">Create Race</button>
    </form>
  );
}

export default RaceCreation;