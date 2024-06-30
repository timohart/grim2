// frontend/src/components/ClassList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClassList() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/api/classes');
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <h1>Classes</h1>
      <ul>
        {classes.map((classData) => (
          <li key={classData._id}>
            {classData.class_name} - {classData.primary_stats} - {classData.secondary_stats}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClassList;