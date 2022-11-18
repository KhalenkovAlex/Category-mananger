import categoryService from '../services/categoryService';

import { Category } from '../models/models';

import { CategoryCreateParams, ICategory } from '../interfaces';

interface CategoryPatchParams {
    id: string,
    slug?: string,
    name?: string,
    active?: boolean,
}

interface SearchByIdOrSlugParams {
    slug?: string,
    id?: string,
}
type FaultResponse = { message: string };
type SuccessResponse = ICategory[];

type DeleteCategoryResponse = FaultResponse | SuccessResponse;

interface filterParams {
    name: string,
    description: string,
    slug: string,
    active: boolean,
    search: string,
    pageSize: number,
    page: number,
    sort: string
}

class CategoryController {
    async createCategory(req: { body: CategoryCreateParams }, res: any) {
        const params: CategoryCreateParams = req.body;
        try {
            if (!params.slug || !params.name || params.active === undefined) {
                return res.status(400).json({ message: 'Unable to create new Category, please check your data' });
            }
            const newCategory = await categoryService.createNew(params);

            return res.json(newCategory);
        } catch (e) {
            return res.status(400).json({ message:`Request failed, reason: ${e} ` });
        }
    };

    async changeCategory(req: { body: CategoryPatchParams }, res: any) {
        const updatedCategoryData: CategoryPatchParams = req.body;
        const updatedCategory = await categoryService.changeCategory(updatedCategoryData);

        if (!updatedCategory) {
          return res.status(404).json({ message: 'Unable to update this Category, please check your data' });
        }

        return res.json({ message: 'Category was successfully updated' });
    };

    async deleteCategory(req: { params: { id: string }}, res: any) {
        const { id } = req.params;
        try {
            const { name } = await Category.findByPk(id);
            const result = await categoryService.delete(id, name);

            return res.json(result);
        } catch (e) {
            return res.status(404).json({ message: 'Category with this id not found' })
        }
    };

    async getCategoriesByParams(req: { query: SearchByIdOrSlugParams }, res: any) {
        const searchParams = req.query;
        const category = await categoryService.getCategoriesByParams(searchParams);

        if (!category.length) {
            return res.status(404).json({ message: 'Category by this params not found' });
        }

        return res.json(category);
    };

    async getCategoriesByFilterParams(req: { body: filterParams }, res: any) {
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

        const result = await categoryService.findByFilter(name, description, slug, active, search, pageSize, page, sort);

        return res.json(result);
    };
}

export default new CategoryController();
