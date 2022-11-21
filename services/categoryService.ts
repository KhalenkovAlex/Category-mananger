import { literal, Op, Sequelize } from 'sequelize';

import { Category } from '../models/models';

import { CategoryCreateParams, SearchParam } from '../interfaces';

interface updateCategoryData {
    id: string,
    slug?: string,
    name?: string,
    description?: string,
    active?: boolean,
}

type TrimmedParam = string | undefined;

class CategoryService {
    async createNew(params: CategoryCreateParams) {
        try {
            return await Category.create(params);
        } catch (e) {
            return { message: 'Unable to create new Category, please check your data' };
        }
    };

    async changeCategory(params: updateCategoryData) {
        const { id } = params;
        try {
            const res = await Category.update({ ...params }, { where: { id }});
            return res[0];
        } catch (e) {
            return null;
        }
    };

    async delete(id : string, categoryName: string) {
        try {
            await Category.destroy({ where: { id }});
            return { message: `Category ${categoryName} was successfully deleted` };
        } catch (e) {
            return { message: `Category deletion failed` };
        }
    };

    async getCategoriesByParams(searchParam: string) {
        try {
            const rule = {
                [Op.or]:
                [
                    { id: searchParam },
                    { slug: {[Op.like]: literal(`\'%${ searchParam }%\'`)}}
                ]
            };

            return await Category.findAll({ where: rule });
        } catch (e) {
            return null;
        }
    };

    async findByRule(
        offset: number,
        order: object,
        pageSize: number,
        rule: object
    ) {
        try {
            return await Category.findAll({
                where: rule,
                offset,
                limit: pageSize,
                order: [order]
            });
        } catch (e) {
            return { message: 'Category by this params not found' };
        }
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
        const trimmedName: TrimmedParam = name ? name.trim() : undefined;
        const trimmedDescription: TrimmedParam = description ? description.trim() : undefined;
        const trimmedSearch: TrimmedParam = search ? search.trim() : undefined;
        if (search && search.trim() !== '') {
            const rule = {
                [Op.or]:
                [
                    { name: {[Op.like]: literal(`\'%${ trimmedSearch }%\'`)}},
                    { description: {[Op.like]: literal(`\'%${ trimmedSearch }%\'`)}}
                ]
            };

            return this.findByRule(offset, order, pageSize, rule);
        }

        if ((name && description) && (name.trim() !== '' && description.trim() !== '')) {
            const rule = {
                [Op.or]:
                [
                    { name: {[Op.like]: literal(`\'%${ trimmedName }%\'`)}},
                    { description: {[Op.like]: literal(`\'%${ trimmedDescription }%\'`)}}
                ]
            };

            return this.findByRule(offset, order, pageSize, rule);
        }

        if (name && name.trim() !== '') {
            const rule = { name: {[Op.like]: Sequelize.literal(`\'%${ trimmedName }%\'`)}};
            return this.findByRule(offset,order, pageSize, rule);
        }

        if (description && description.trim() !== '') {
            const rule = { description: {[Op.like]: Sequelize.literal(`\'%${ trimmedDescription }%\'`)}};
            return this.findByRule(offset, order, pageSize, rule);
        }

        // If field 'active' contains true or false
        if (active !== undefined) {
            return this.findByRule(offset, order, pageSize, { active });
        }

        return await Category.findAll({ offset, limit: pageSize, order: [ order ]});
    };
}

export default new CategoryService();
