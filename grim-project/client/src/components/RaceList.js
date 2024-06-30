// frontend/src/components/RaceList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RaceList() {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await axios.get('/api/races');
        setRaces(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRaces();
  }, []);

  return (
    <div>
      <h1>Races</h1>
      <ul>
        {races.map((race) => (
          <li key={race._id}>{race.race_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default RaceList;