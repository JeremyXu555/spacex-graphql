import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable(
        'Dragons',
        {
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
            heat_shield:{
                type: DataTypes.JSONB,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
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
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('Dragons');
};
