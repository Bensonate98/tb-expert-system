import { createLogger, format, transports } from 'winston';
import { NODE_ENV } from './env';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [new transports.File({ filename: 'logs/app.log' })],
});

if (NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

export default logger;
