const mongoose = require('mongoose');
const User = require('../User');

describe('User Model Test', () => {
  it('create & save user successfully', async () => {
    const userData = { username: 'John', email: 'john@example.com', password: '123456' };
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
  });

  it('create user without required field should fail', async () => {
    const userWithoutRequiredField = new User({ username: 'John' });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });
});
