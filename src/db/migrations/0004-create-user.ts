import {QueryInterface, DataTypes} from "sequelize";
import * as uuid4 from 'uuid/v4'

export const up = async (queryInterface: QueryInterface): Promise<void>  => {
    await queryInterface.createTable(
        'Users',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: uuid4(),
            },
            email: {
                type: new DataTypes.STRING(128),
                allowNull: false,
                unique: true,
            },
            password: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            confirmed:
            {
                type: DataTypes.BOOLEAN,
                defaultValue: false
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
}
