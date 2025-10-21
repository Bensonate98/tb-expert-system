import { AuthUser } from '../shared/types/auth';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
