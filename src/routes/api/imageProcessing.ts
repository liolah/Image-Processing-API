import express from 'express';
import ip from '../../utilities/imageProcessing';

const imageRouter = express.Router();

imageRouter.get('/api', (req: express.Request, res: express.Response): void => {
  const inputImage = req.query.image as string;
  const format = (req.query.format as string) || 'jpg'; // Format is optional, if no format entered default to .jpg
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  ip.processImage(inputImage, format, height, width)
    .then((image) => {
      res.sendFile(image[0]);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

export default imageRouter;
