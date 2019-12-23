import {
    DataTypes,
    Sequelize,
} from "sequelize";

import { Model, Rocket } from ".";

export class Launch extends Model {
    public id!: number;
    public flight_number!: string;
    public launch_year!: number;
    public mission_name!: string;
    public launch_success!: boolean;

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
            flight_number: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            launch_year: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            mission_name:{
                type: new DataTypes.STRING(128),
                allowNull: false
            },
            launch_success:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },            
        }, {
            sequelize,
            modelName: 'Launch',
            underscored: true,
            // defaultScope: {
            //     order: [['order', 'ASC'], ['createdAt', 'DESC']],
            // },
        });
    }

    public static associate(
        models: {
            Rocket: typeof Rocket;
            Launch: typeof Launch;
        },
    ):void {
        models.Launch.belongsTo(models.Rocket, {
            foreignKey: {
                name: 'rocket_id',
                allowNull: false,
            },
            as: 'Rocket',
            onUpdate: 'cascade',
            onDelete: 'cascade',
        });
    }
}
