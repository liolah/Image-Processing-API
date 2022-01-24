import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;
const msg = `Welcome to my simple image processing API!
To test the API functionality, use the following URL format:
/api?image=(image name)&width=(width)&height=(height)
Available image names:
encenadaport
fjord
icelandwaterfall
palmtunnel
santamonica`;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send(msg);
});

app.get('/api', (req, res) => {
  const name = req.query.image as string;
  const width = parseInt(req.query.width as string) as number;
  const height = parseInt(req.query.height as string) as number;
  if (!fs.existsSync(path.join(__dirname, '../assets/cache', `${name}-${width}x${height}.jpg`))) {
    resizeImage(name, width, height);
    console.log('resized image created');
  } else {
    res.sendFile(`${name}-${width}x${height}.jpg`, {
      root: path.join(__dirname, '../assets/cache'),
    });
  }
});

const resizeImage = (name: string, width: number, height: number): void => {
  sharp(`assets/original/${name}.jpg`).resize(width, height).toFile(`assets/cache/${name}-${width}x${height}.jpg`);
};
