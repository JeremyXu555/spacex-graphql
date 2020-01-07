import * as path from 'path';
import * as Umzug from 'umzug';
import { Sequelize } from 'sequelize';

import { config } from '../config/config';

export default function UmzugInstance(type: 'migrations' | 'seeders'):
Umzug.Umzug {
    const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
    );

    return new Umzug(
        {
            storage: 'sequelize',
            storageOptions: {
                sequelize,
                tableName: `Sequelize_${type}`,
            },
            logging: false,
            migrations: {
                params: [sequelize.getQueryInterface(), sequelize],
                path: path.join(__dirname, '..', 'db', type),
                pattern: /^\d+[\w-]+\.[jt]s$/,
            },
        }
    );
}
