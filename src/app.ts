import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.send('Welcome to TB Predictor');
});

// error handler
app.use(errorHandler as ErrorRequestHandler);

export default app;
