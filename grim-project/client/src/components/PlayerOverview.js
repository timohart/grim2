// frontend/src/components/PlayerOverview.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PlayerOverview() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(`/api/players/${id}`);
        setPlayer(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayer();
  }, [id]);

  if (!player) return <div>Loading...</div>;

  return (
    <div>
      <h1>{player.player_name}</h1>
      <p>Email: {player.email}</p>
      <h2>Characters</h2>
      <ul>
        {player.characters.map((character) => (
          <li key={character._id}>{character.character_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerOverview;