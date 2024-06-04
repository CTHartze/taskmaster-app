import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reminder, setReminder] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      '/api/tasks',
      { title, description, reminder },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    setTitle('');
    setDescription('');
    setReminder('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTask;
