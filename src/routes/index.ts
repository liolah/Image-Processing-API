import express from 'express';
import ip from './api/imageProcessing';

const routes = express.Router();

routes.use("/", ip);

const msg = `<h1>
  Welcome to my simple image processing API!
</h1>
<div>
  To test the API functionality, use the following URL format: <br>
  /api?image="image name"&width="width"&height="height" <br>
Available image names: 
<ul>
  <li>encenadaport</li>
  <li>fjord</li>
  <li>icelandwaterfall</li>
  <li>palmtunnel</li>
  <li>santamonica</li>
</ul>
</div>`;

routes.get('/', (req, res) => {
  res.send(msg);
});

export default routes;