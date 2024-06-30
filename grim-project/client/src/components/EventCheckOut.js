// frontend/src/components/EventCheckOut.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EventCheckOut() {
  const { id } = useParams();
  const [characterId, setCharacterId] = useState('');
  const [copper, setCopper] = useState(0);
  const [silver, setSilver] = useState(0);
  const [gold, setGold] = useState(0);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleCheckOut = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/events/${id}/check-out`, {
        characterId,
        copper,
        silver,
        gold,
      });
      alert('Character checked out successfully!');
      setCharacterId('');
      setCopper(0);
      setSilver(0);
      setGold(0);
      const response = await axios.get(`/api/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to check out character');
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>Check-Out from {event.event_name}</h1>
      <form onSubmit={handleCheckOut}>
        <input
          type="text"
          value={characterId}
          onChange={(e) => setCharacterId(e.target.value)}
          placeholder="Character ID"
        />
        <input
          type="number"
          value={copper}
          onChange={(e) => setCopper(e.target.value)}
          placeholder="Copper"
        />
        <input
          type="number"
          value={silver}
          onChange={(e) => setSilver(e.target.value)}
          placeholder="Silver"
        />
        <input
          type="number"
          value={gold}
          onChange={(e) => setGold(e.target.value)}
          placeholder="Gold"
        />
        <button type="submit">Check-Out</button>
      </form>
      <h2>Checked-Out Characters</h2>
      <ul>
        {event.characters_checked_in.map((char) => (
          <li key={char._id}>{char.character_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default EventCheckOut;