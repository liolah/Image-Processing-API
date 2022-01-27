import supertest from 'supertest';
import path from 'path';
import fs from 'fs';
import ip from '../utilities/imageProcessing';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('Get the api root endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
  it('Get the API image processing endpoint', async () => {
    const response = await request.get('/api?image=fjord&width=300&height=300');
    fs.unlinkSync(path.resolve('assets', 'cache', 'fjord-300x300.jpg'));
    expect(response.status).toBe(200);
  });
});

describe('Test image processing functionality', () => {
  const dummyDimension = Math.floor(Math.random() * 500);
  it('Behavior if no cached image matches the request', async () => {
    const response = await ip.processImage('fjord', 'jpg', dummyDimension, dummyDimension);
    expect(response[1]).toEqual('New file has been created');
  });
  it('Behavior if a cached image matches the request', async () => {
    const response = await ip.processImage('fjord', 'jpg', dummyDimension, dummyDimension);
    expect(response[1]).toEqual('File already exists');
    fs.unlinkSync(response[0]);
  });
});
