import { Router } from 'express';
import allRoutes from './routes';

const router = Router();

router.use('/api/v1', allRoutes);

export default router;
