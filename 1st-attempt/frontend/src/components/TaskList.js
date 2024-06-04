import React, { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { Container, Card, CardContent, Typography, Select, MenuItem, TextField } from '@material-ui/core';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filterByCategory, setFilterByCategory] = useState('');
  const [filterByTags, setFilterByTags] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get('/api/tasks', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      params: { sortBy, filterByCategory, filterByTags }
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [sortBy, filterByCategory, filterByTags]);

  return (
    <Container>
      <h2>Task List</h2>
      <div>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <MenuItem value="">None</MenuItem>
          <MenuItem value="dueDate">Due Date</MenuItem>
          <MenuItem value="priority">Priority</MenuItem>
        </Select>
        <TextField
          label="Filter by Category"
          value={filterByCategory}
          onChange={(e) => setFilterByCategory(e.target.value)}
        />
        <TextField
          label="Filter by Tags"
          value={filterByTags}
          onChange={(e) => setFilterByTags(e.target.value)}
        />
      </div>
      {tasks.map((task) => (
        <Card key={task._id}>
          <CardContent>
            <Typography variant="h5">{task.title}</Typography>
            <Typography>{task.description}</Typography>
            <Typography>Due: {new Date(task.dueDate).toLocaleDateString()}</Typography>
            <Typography>Priority: {task.priority}</Typography>
            <Typography>Category: {task.category}</Typography>
            <Typography>Tags: {task.tags.join(', ')}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default TaskList;
