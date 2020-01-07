import { Sequelize } from 'sequelize';
import { config as originalConfig, Config } from './config/config';
import * as models from './db/models';

export default function initialize(config: Config = originalConfig): Sequelize {
    const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
    );

    for (const model of Object.values(models)) {
        model.init({}, { sequelize });
    }
    for (const model of Object.values(models)) {
        if ('associate' in model)
            model.associate(models);
    }

    return sequelize;
}
