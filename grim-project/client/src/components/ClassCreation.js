// frontend/src/components/ClassCreation.js
import React, { useState } from 'react';
import axios from 'axios';

function ClassCreation() {
  const [classData, setClassData] = useState({
    class_name: '',
    primary_stats: '',
    secondary_stats: '',
  });

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/classes', classData);
      alert('Class created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create class');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="class_name"
        value={classData.class_name}
        onChange={handleChange}
        placeholder="Class Name"
      />
      <input
        type="text"
        name="primary_stats"
        value={classData.primary_stats}
        onChange={handleChange}
        placeholder="Primary Stats"
      />
      <input
        type="text"
        name="secondary_stats"
        value={classData.secondary_stats}
        onChange={handleChange}
        placeholder="Secondary Stats"
      />
      <button type="submit">Create Class</button>
    </form>
  );
}

export default ClassCreation;