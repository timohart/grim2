// frontend/src/components/CharacterOverview.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CharacterOverview() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`/api/characters/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) return <div>Loading...</div>;

  return (
    <div>
      <h1>{character.character_name}</h1>
      <p>Player: {character.player_id}</p>
      <p>Race: {character.race_id}</p>
      <p>Class: {character.class_id}</p>
      <p>AP Earned: {character.ap_earned}</p>
      <p>CP Earned: {character.cp_earned}</p>
      <p>Copper: {character.copper}</p>
      <p>Silver: {character.silver}</p>
      <p>Gold: {character.gold}</p>
      <a href={character.pdfFilePath} target="_blank" rel="noopener noreferrer">
        View Character Sheet
      </a>
    </div>
  );
}

export default CharacterOverview;