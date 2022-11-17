import { Router } from 'express';

import CategoryController from '../controllers/categoryController';

const categoryRouter = Router();

categoryRouter.post('/', CategoryController.createCategory);
categoryRouter.patch('/', CategoryController.changeCategory);
categoryRouter.delete('/:id', CategoryController.deleteCategory);
categoryRouter.get('/getByParams', CategoryController.getCategoriesByParams);
categoryRouter.get('/getByFilterParams', CategoryController.getCategoriesByFilterParams);

export default categoryRouter;
