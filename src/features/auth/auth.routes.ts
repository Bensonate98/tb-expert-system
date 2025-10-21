import express from 'express';
import validateRequest from '../../shared/middlewares/validate';
import { loginSchema, refreshTokenSchema, signupSchema, verifyEmailSchema } from './auth.validation';
import { container } from 'tsyringe';
import AuthController from './auth.controller';
const router = express();

const controller = container.resolve(AuthController);

router.post('/signup', validateRequest(signupSchema), controller.registerUser);
router.post('/verify-email', validateRequest(verifyEmailSchema), controller.verifyEmail);
router.post('/login', validateRequest(loginSchema), controller.loginUser);
router.post('/refresh-token', validateRequest(refreshTokenSchema), controller.refreshToken);
// router.post(
//   '/verify-email',
//   validateRequest(verifyEmailSchema),
//   verifyUserEmail
// );

export default router;
