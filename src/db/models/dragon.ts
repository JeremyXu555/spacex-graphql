import {
    DataTypes,
    Sequelize,
} from "sequelize";

import { Model } from ".";

interface JSON_FIELD_HEAT_SHIELD {
    "material": string,
    "size_meters": number,
    "temp_degrees": number,
    "dev_partner": string
}

export class Dragon extends Model {
    public id!: number;
    public name: string;
    public type: string;
    public heat_shield: JSON_FIELD_HEAT_SHIELD;

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
            name: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            type: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            heat_shield:{
                type: DataTypes.JSONB,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: 'Dragon',
            underscored: true,
        });
    }
}
