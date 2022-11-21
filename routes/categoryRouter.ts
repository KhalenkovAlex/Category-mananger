import { Router } from 'express';

import CategoryController from '../controllers/categoryController';

const categoryRouter = Router();

categoryRouter.get('/', CategoryController.getCategoriesByFilterParams);
categoryRouter.get('/:param', CategoryController.getCategoriesByParams);
categoryRouter.post('/', CategoryController.createCategory);
categoryRouter.patch('/', CategoryController.changeCategory);
categoryRouter.delete('/:id', CategoryController.deleteCategory);

export default categoryRouter;
