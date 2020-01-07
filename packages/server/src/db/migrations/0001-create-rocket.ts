import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable(
        'Rockets',
        {
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
            boosters: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            stages: {
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
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        }
    );
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('Rockets');
};
