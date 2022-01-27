import express from 'express';
import path from 'path';
import ip from './api/imageProcessing';

const routes = express.Router();

routes.use("/", ip);

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.sendFile(path.resolve('public', 'index.html'));
});

export default routes;