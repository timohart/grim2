// frontend/src/components/PlayerCreation.js
import React, { useState } from 'react';
import axios from 'axios';

function PlayerCreation() {
  const [playerData, setPlayerData] = useState({
    player_name: '',
    email: '',
  });

  const handleChange = (e) => {
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/players', playerData);
      alert('Player created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create player');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="player_name"
        value={playerData.player_name}
        onChange={handleChange}
        placeholder="Player Name"
      />
      <input
        type="email"
        name="email"
        value={playerData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Create Player</button>
    </form>
  );
}

export default PlayerCreation;