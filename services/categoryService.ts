import { Category } from '../models/models';
import { Op } from 'sequelize';

import { CategoryCreateParams } from '../interfaces';

interface updatedCategoryData {
    id: string,
    slug?: string,
    name?: string,
    description?: string,
    active?: boolean,
}

class CategoryService {
    async createNew(params: CategoryCreateParams) {
        try {
            return await Category.create(params);
        } catch (e) {
            return { message: 'Unable to create new Category, please check your data' };
        }
    };

    async changeCategory(params: updatedCategoryData) {
            const { id } = params;
             const res = await Category.update({ ...params }, { where: { id }});
             return res[0];
    };

    async delete(id : string, categoryName: string) {
        await Category.destroy({ where: { id }});
        return { message: `Category ${categoryName} was successfully deleted` };
    };

    async getCategoriesByParams(searchParams: any) {
        const { slug = '', id = '' } = searchParams;

        return await Category.findAll({
            where: {
                [Op.or]: [{ slug }, { id }]
            }}
        );
    };

}
export default new CategoryService();
