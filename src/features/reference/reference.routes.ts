import express from 'express';
import ReferenceController from './reference.controller';
import { container } from 'tsyringe';

const router = express();

const controller = container.resolve(ReferenceController);

router.get('/courses', controller.fetchCourses);
router.get('/institution', controller.fetchCourses);

export default router;
