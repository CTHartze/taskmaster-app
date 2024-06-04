const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { sortBy, filterByCategory, filterByTags } = req.query;
    let query = { user: req.user.id };

    if (filterByCategory) {
      query.category = filterByCategory;
    }

    if (filterByTags) {
      query.tags = { $in: filterByTags.split(',') };
    }

    let tasks = await Task.find(query);

    if (sortBy) {
      tasks = tasks.sort((a, b) => {
        if (sortBy === 'dueDate') {
          return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sortBy === 'priority') {
          const priorities = { low: 1, medium: 2, high: 3 };
          return priorities[a.priority] - priorities[b.priority];
        }
      });
    }

    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
