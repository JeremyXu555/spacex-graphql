import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable(
        'Launches',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            rocket_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Rockets',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
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
    await queryInterface.addIndex('Launches', ['rocket_id']);
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('Launches');
};
