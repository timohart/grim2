// frontend/src/components/CheckedInCharacters.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CheckedInCharacters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCheckedInCharacters = async () => {
      try {
        const response = await axios.get('/api/characters?checkedIn=true');
        setCharacters(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCheckedInCharacters();
  }, []);

  return (
    <div>
      <h1>Checked-In Characters</h1>
      <ul>
        {characters.map((character) => (
          <li key={character._id}>{character.character_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CheckedInCharacters;