// frontend/src/components/EventCreation.js
import React, { useState } from 'react';
import axios from 'axios';

function EventCreation() {
  const [eventData, setEventData] = useState({
    event_name: '',
    start_date: '',
    end_date: '',
    location: '',
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/events', eventData);
      alert('Event created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="event_name"
        value={eventData.event_name}
        onChange={handleChange}
        placeholder="Event Name"
      />
      <input
        type="date"
        name="start_date"
        value={eventData.start_date}
        onChange={handleChange}
        placeholder="Start Date"
      />
      <input
        type="date"
        name="end_date"
        value={eventData.end_date}
        onChange={handleChange}
        placeholder="End Date"
      />
      <input
        type="text"
        name="location"
        value={eventData.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <button type="submit">Create Event</button>
    </form>
  );
}

export default EventCreation;