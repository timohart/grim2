// frontend/src/components/RaceOverview.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RaceOverview() {
  const { id } = useParams();
  const [race, setRace] = useState(null);

  useEffect(() => {
    const fetchRace = async () => {
      try {
        const response = await axios.get(`/api/races/${id}`);
        setRace(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRace();
  }, [id]);

  if (!race) return <div>Loading...</div>;

  return (
    <div>
      <h1>{race.race_name}</h1>
<p>Starting Stats: {race.starting_stats}</p>
<p>Starting Talents: {race.starting_talents}</p>
<p>Starting Skills: {race.starting_skills}</p>
<p>Languages: {race.languages}</p>
</div>
);
}

export default RaceOverview;