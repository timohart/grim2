// frontend/src/components/EventCheckIn.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EventCheckIn() {
  const { id } = useParams();
  const [characterId, setCharacterId] = useState('');
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

  const handleCheckIn = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/events/${id}/check-in`, { characterId });
      alert('Character checked in successfully!');
      setCharacterId('');
      const response = await axios.get(`/api/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to check in character');
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>Check-In to {event.event_name}</h1>
      <form onSubmit={handleCheckIn}>
        <input
          type="text"
          value={characterId}
          onChange={(e) => setCharacterId(e.target.value)}
          placeholder="Character ID"
        />
        <button type="submit">Check-In</button>
      </form>
      <h2>Checked-In Characters</h2>
      <ul>
        {event.characters_checked_in.map((char) => (
          <li key={char._id}>{char.character_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default EventCheckIn;