import {
    DataTypes,
    Sequelize,
} from "sequelize";

import { Model } from ".";
import { v4 } from "uuid";

export class User extends Model {
    public id!: string;
    public email: string;
    public password: string;
    public confirmed: boolean;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public static init({ }, { sequelize }: { sequelize: Sequelize }): void {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: v4(),
            },
            email: {
                type: new DataTypes.STRING(128),
                allowNull: false,
                unique: true,
            },
            password: {
                type: new DataTypes.STRING(128),
                allowNull: true,
            },
            confirmed:
            {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }, {
            sequelize,
            modelName: 'User',
            underscored: true,
        });
    }
}
