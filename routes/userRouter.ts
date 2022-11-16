import { Router } from 'express';

import UserController from '../controllers/userController';

const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.post('/', UserController.createUser);
userRouter.get('/:id',);

export default userRouter;
