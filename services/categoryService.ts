import { Category } from '../models/models';
import { literal, Op, Sequelize } from 'sequelize';

import { CategoryCreateParams } from '../interfaces';

interface updatedCategoryData {
    id: string,
    slug?: string,
    name?: string,
    description?: string,
    active?: boolean,
}

interface SearchParams {
    slug?: string,
    id?: string,
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

    async getCategoriesByParams(searchParams: SearchParams) {
        const { slug, id = '' } = searchParams;

        return await Category.findAll({
            where: {
                [Op.or]:
                    [
                        { id },
                        { slug: {[Op.like]: literal(`\'%${ slug }%\'`)}}
                    ]
                }
            }
        );
    };

    async findByOneParam(value: string, filed: string, offset: number, order: object, pageSize: number) {
        return await Category.findAll({ where:
            {
                [filed]: {
                    [Op.like]: Sequelize.literal(`\'%${ value }%\'`)
                }
            },
            offset,
            limit: pageSize,
            order: [order]
        });
    };

    async findByActive(active: boolean, offset: number, order: object, pageSize: number) {
        return await Category.findAll({
            where: { active },
            offset,
            limit: pageSize,
            order: [order]
        });
    };

    async findByTwoParams(name: string, description: string, offset: number, order: object, pageSize: number) {
        return await Category.findAll({
            where: {
                [Op.or]:
                [
                    { name: {[Op.like]: literal(`\'%${ name }%\'`)}},
                    { description: {[Op.like]: literal(`\'%${ description }%\'`)}}
                ]
            },
            offset,
            limit: pageSize,
            order: [order]
        });
    };

    async findByFilter(
        name: string,
        description: string,
        slug: string,
        active: boolean,
        search: string,
        pageSize: number,
        page: number,
        sort: string,
    ) {
        const offset: number = (() => {
            if (page < 1) return 0;
            return ((page - 1) * pageSize);
        })();
        const order: string[] = (() => {
            if (!(
                    sort.includes('id')
                    || sort.includes('slug')
                    || sort.includes('name')
                    || sort.includes('description')
                    || sort.includes('active')
                    || sort.includes('updatedAt')
                )) return ['createdAt', 'DESC'];
            if (sort.at(0) === '-') return [sort.substring(1), 'DESC'];

            return [sort, 'ASC'];
        })();

        if (search) return this.findByTwoParams(search, search, offset, order, pageSize);

        if (name && description) return this.findByTwoParams(name, description, offset, order, pageSize)

        if (name) return this.findByOneParam(name, 'name', offset,order, pageSize);

        if (description) return this.findByOneParam(description, 'description', offset, order, pageSize);

        // If field 'active' contains true or false
        if (active !== undefined) return this.findByActive(active, offset, order, pageSize);
    };
}

export default new CategoryService();
