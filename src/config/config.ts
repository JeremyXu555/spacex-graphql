import { Dialect } from 'sequelize';

const timezone = process.env.TZ || 'UTC';
process.env.TZ = timezone;

export interface Config {
    database: string;
    username: string;
    password: string;
    host: string;
    dialect: Dialect;
    // logging: boolean;
    port: number;
    timezone?: string;
    quoteIdentifiers: false;
    
}

// export const config: Config = {
//     username: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DB,
//     host: process.env.POSTGRES_HOST,
//     port: parseInt(process.env.POSTGRES_PORT),
//     dialect: 'postgres',
//     logging: ['verbose', 'debug', 'silly', 'trace']
//         .includes(process.env.LOG_LEVEL!),
//     ...process.env.NODE_ENV === 'production'
//         ? { pool: { max: 10, idle: 30 } }
//         : {},
//     timezone,
// };

export const config: Config = {
    username: 'postgres',
    password: '',
    database: 'spacex',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    timezone,
    quoteIdentifiers: false,
};
