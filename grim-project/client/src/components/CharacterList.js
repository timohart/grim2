// frontend/src/components/CharacterList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CharacterList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('/api/characters');
        setCharacters(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div>
      <h1>Characters</h1>
      <ul>
        {characters.map((character) => (
          <li key={character._id}>
            {character.character_name} - {character.race_id} - {character.class_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterList;