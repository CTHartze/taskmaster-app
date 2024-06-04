const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const protect = require('./middleware/authMiddleware');
const cron = require('node-cron');
const Task = require('./models/Task');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', protect, taskRoutes);

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const tasks = await Task.find({ reminder: { $lte: now }, completed: false });
  tasks.forEach(task => {
    // Send notification (e.g., email or other method)
    console.log(`Reminder for task: ${task.title}`);
  });
});

mongoose.connect('mongodb+srv://cayden:IsmailMahomed@cluster0.s9awzko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(5000, () => console.log('Server running on port 5000'));
