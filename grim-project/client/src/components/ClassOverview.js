// frontend/src/components/ClassOverview.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ClassOverview() {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await axios.get(`/api/classes/${id}`);
        setClassData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClass();
  }, [id]);

  if (!classData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{classData.class_name}</h1>
      <p>Primary Stats: {classData.primary_stats}</p>
      <p>Secondary Stats: {classData.secondary_stats}</p>
    </div>
  );
}

export default ClassOverview;