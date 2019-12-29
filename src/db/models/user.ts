import {
    DataTypes,
    Sequelize,
} from "sequelize";

import { Model } from ".";

export class User extends Model {
    public id!: number;
    public email: string;
    public password: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public static init({}, { sequelize }: { sequelize: Sequelize }):void {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            email: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            password: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'User',
            underscored: true,
        });
    }
}
