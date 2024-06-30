// frontend/src/components/EventOverview.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EventOverview() {
  const { id } = useParams();
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

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>{event.event_name}</h1>
      <p>Start Date: {new Date(event.start_date).toLocaleDateString()}</p>
      <p>End Date: {new Date(event.end_date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <h2>Checked-In Characters</h2>
      <ul>
        {event.characters_checked_in.map((char) => (
          <li key={char._id}>{char.character_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default EventOverview;