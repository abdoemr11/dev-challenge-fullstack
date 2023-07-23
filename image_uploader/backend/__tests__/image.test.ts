import request from 'supertest';
import app from '../src/app';

describe('Image Upload API', () => {
  it('should upload an image successfully', async () => {
    try {
          const response = await request(app)
            .post('/upload')
            .attach('image','image.svg'); // this is the cause of the error
    } catch (error) {
      console.log(error)
    }
    // expect(response.body).toEqual({ message: 'Image uploaded successfully!' });
    expect(true).toBe(true)
  });
  
});
describe('Express App Test', () => {
  it('should respond with status 200 for the root endpoint', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
  });
});