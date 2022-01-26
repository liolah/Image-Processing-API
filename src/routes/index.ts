import express from 'express';
import path from 'path';
import ip from './api/imageProcessing';

const routes = express.Router();

routes.use("/", ip);

routes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

export default routes;