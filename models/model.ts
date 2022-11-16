import sequelize from '../db';
const { DataTypes } = require('sequelize');

interface UserParams {
    name: string
}
interface IUser {
    id: string,
    name: string,
    create: ( {name}: UserParams ) => Promise<any>;
    findAll: () => Promise<any>;
}

export const User: IUser = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING }
});

export default {
    User
};
