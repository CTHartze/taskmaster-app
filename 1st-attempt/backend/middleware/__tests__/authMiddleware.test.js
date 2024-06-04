const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../models/User');
const protect = require('../authMiddleware');

const mockRequest = (headers) => ({ headers });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe('Auth Middleware', () => {
  it('should call next if token is valid', async () => {
    const user = new User({ username: 'John', email: 'john@example.com', password: '123456' });
    await user.save();
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret'); // mock token

    const req = mockRequest({ authorization: `Bearer ${token}` });
    const res = mockResponse();
    await protect(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(req.user._id).toBe(user._id);
  });

  it('should return 401 if no token is provided', async () => {
    const req = mockRequest({});
    const res = mockResponse();
    await protect(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized, no token' });
  });

  it('should return 401 if token is invalid', async () => {
    const req = mockRequest({ authorization: 'Bearer invalidtoken' });
    const res = mockResponse();
    await protect(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized' });
  });
});
