import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import routes from './routes/index';
import errorHandler from './shared/middlewares/errorHandler';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.send('Welcome to mindwave connect');
});
app.use('/api/v1', routes);

// error handler
app.use(errorHandler as ErrorRequestHandler);

export default app;
