import express from 'express';
import authRoutes from '../features/auth/auth.routes';
import referenceRoutes from "../features/reference/reference.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/reference", referenceRoutes);

export default router;
