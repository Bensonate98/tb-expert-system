import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import routes from './routes/index';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.send('Welcome to TB Predictor');
});
app.use(routes);

// error handler
app.use(errorHandler as ErrorRequestHandler);

export default app;
