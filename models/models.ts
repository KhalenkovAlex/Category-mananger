import { DataTypes } from 'sequelize';
import sequelize from '../db';

import { CategoryCreateParams } from '../interfaces';

interface ICategory {
    id: string,
    slug: string,
    name: string,
    description?: string,
    active: string,
}

interface CategoryWithSequelizeActions extends ICategory{
    create: ({ name }: CategoryCreateParams) => Promise<any>,
    findAll: (arg: any) => Promise<any>,
    findOne: (arg: any) => Promise<any>,
    destroy: (arg: any) => Promise<any>,
    findByPk: (arg: any) => Promise<any>,
    update: (arg: any, arg2: any) => Promise<any>,
}

export const Category: CategoryWithSequelizeActions = sequelize.define('category', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
    },
    slug: { type: DataTypes.STRING, unique: true, require: true },
    name: { type: DataTypes.STRING, require: true },
    description: { type: DataTypes.STRING, allowNull: true },
    active: { type: DataTypes.BOOLEAN, defaultValue: true }
});

export default Category;
