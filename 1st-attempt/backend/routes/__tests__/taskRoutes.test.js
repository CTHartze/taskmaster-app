const request = require('supertest');
const app = require('../../app');
const Task = require('../../models/Task');

describe('Task API', () => {
  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(),
        priority: 'medium',
      })
      .set('Authorization', `Bearer <your_jwt_token>`);  // mock token

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Task');
  });

  it('should fetch all tasks', async () => {
    const task = new Task({ title: 'Test Task', description: 'Test Description', dueDate: new Date(), priority: 'medium' });
    await task.save();

    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer <your_jwt_token>`);  // mock token

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe(task.title);
  });

  it('should not create a task without a title', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ description: 'Test Description' })
      .set('Authorization', `Bearer <your_jwt_token>`);  // mock token

    expect(response.statusCode).toBe(400);
  });
});
