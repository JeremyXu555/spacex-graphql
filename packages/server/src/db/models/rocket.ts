import {
    DataTypes,
    Sequelize,
} from "sequelize";

import { Model, Launch } from ".";

export class Rocket extends Model {
    public id!: number;
    public active!: boolean;
    public launch_ids!: number[];
    public stages: number;
    public boosters: number;
    public cost_per_launch: string;
    public success_rate_pct: number;
    public first_flight: string;
    public country: string;
    public company: string;

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
            launch_ids: {
                type: new DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: false,
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            stages: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            boosters: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            cost_per_launch:{
                type: new DataTypes.STRING(128),
                allowNull: true,
            },
            success_rate_pct:{
                type: DataTypes.INTEGER,
                allowNull: true,
            }, 
            first_flight: {
                type: new DataTypes.STRING(128),
                allowNull: true,
            },
            country: {
                type: new DataTypes.STRING(128),
                allowNull: true,
            },
            company:{
                type: new DataTypes.STRING(128),
                allowNull: true
            },                      
        }, {
            sequelize,
            modelName: 'Rocket',
            underscored: true,
            // defaultScope: {
            //     order: [['order', 'ASC'], ['createdAt', 'DESC']],
            // },
        });
    }

}
