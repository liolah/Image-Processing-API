import express from 'express';
import routes from './routes/index';

const app = express();
const port = 5050;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/", routes);

