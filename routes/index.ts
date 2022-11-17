import { Router } from 'express';
import categoryRouter from './categoryRouter';

const router = Router();

router.use('/category', categoryRouter);

export default router;
