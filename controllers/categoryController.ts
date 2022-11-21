import categoryService from '../services/categoryService';

import { Category } from '../models/models';

import {
    CategoryCreateParams,
    SearchParam,
    TypedCategoryResponse,
    TypedResponse
} from '../interfaces';

interface CategoryPatchParams {
    body: {
        id: string,
        slug?: string,
        name?: string,
        active?: boolean,
    }
}

interface FilterParams {
    body: {
        name: string,
        description: string,
        slug: string,
        active: boolean,
        search: string,
        pageSize: number,
        page: number,
        sort: string,
    }
}

class CategoryController {
    async createCategory(req: { body: CategoryCreateParams }, res: TypedResponse<TypedCategoryResponse>) {
        const params: CategoryCreateParams = req.body;
        try {
            if (!params.slug || !params.name || params.active === undefined) {
                return res.status(400).json({ message: 'Unable to create new Category, please check data' });
            }
            const newCategory = await categoryService.createNew(params);

            return res.json(newCategory);
        } catch (e) {
            return res.status(400).json({ message: `Request failed, reason: ${e}` });
        }
    };

    async changeCategory(req: CategoryPatchParams, res: TypedResponse<TypedCategoryResponse>) {
        const updatedCategoryData = req.body;
        const updatedCategory = await categoryService.changeCategory(updatedCategoryData);

        if (!updatedCategory) {
          return res.status(404).json({ message: 'Unable to update this Category, please check data' });
        }

        return res.json({ message: 'Category was successfully updated' });
    };

    async deleteCategory(req: { params: { id: string }}, res: TypedResponse<TypedCategoryResponse>) {
        const { id } = req.params;
        try {
            const { name } = await Category.findByPk(id);
            const result = await categoryService.delete(id, name);

            return res.json(result);
        } catch (e) {
            return res.status(404).json({ message: `Category with this 'id' not found` });
        }
    };

    async getCategoriesByParams(req: SearchParam, res: TypedResponse<TypedCategoryResponse>) {
        const searchParam = req.params.param;
        const category = await categoryService.getCategoriesByParams(searchParam);

        return res.json(category);
    };

    async getCategoriesByFilterParams(req: FilterParams, res: TypedResponse<TypedCategoryResponse>) {
        const {
            name,
            description,
            slug,
            active,
            search,
            pageSize = 2,
            page = 1,
            sort = '-createdAt'
        } = req.body;
        const isParamsReceived = !name && !description && !slug && active === undefined && !search;

        if (isParamsReceived) return res.status(404).json({ message: 'No params for filtering' });

        const result = await categoryService.findByFilter(
            name,
            description,
            slug,
            active,
            search,
            pageSize,
            page,
            sort
        );

        return res.json(result);
    };
}

export default new CategoryController();
