import React, { useState } from 'react';
import axios from 'axios';

function CharacterCreation() {
  const [characterData, setCharacterData] = useState({
    character_name: '',
    player_id: '',
    race_id: '',
    class_id: '',
    copper: 0,
    silver: 0,
    gold: 0,
    pdfFilePath: null,
  });

  const handleChange = (e) => {
    setCharacterData({ ...characterData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCharacterData({ ...characterData, pdfFilePath: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in characterData) {
      formData.append(key, characterData[key]);
    }
    try {
      await axios.post('/api/characters', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Character created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create character');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="character_name"
        value={characterData.character_name}
        onChange={handleChange}
        placeholder="Character Name"
      />
      <input
        type="text"
        name="player_id"
        value={characterData.player_id}
        onChange={handleChange}
        placeholder="Player ID"
      />
      <input
        type="text"
        name="race_id"
        value={characterData.race_id}
        onChange={handleChange}
        placeholder="Race ID"
      />
      <input
        type="text"
        name="class_id"
        value={characterData.class_id}
        onChange={handleChange}
        placeholder="Class ID"
      />
      <input
        type="number"
        name="copper"
        value={characterData.copper}
        onChange={handleChange}
        placeholder="Copper"
      />
      <input
        type="number"
        name="silver"
        value={characterData.silver}
        onChange={handleChange}
        placeholder="Silver"
      />
      <input
        type="number"
        name="gold"
        value={characterData.gold}
        onChange={handleChange}
        placeholder="Gold"
      />
      <input
        type="file"
        name="pdfFilePath"
        onChange={handleFileChange}
        placeholder="Upload PDF"
      />
      <button type="submit">Create Character</button>
    </form>
  );
}

export default CharacterCreation;