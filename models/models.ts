import { DataTypes } from 'sequelize';
import sequelize from '../db';

export const Category = sequelize.define('category', {
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
