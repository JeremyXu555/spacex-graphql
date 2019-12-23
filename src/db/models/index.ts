import {
    Model as SequelizeModel,
} from 'sequelize';

export class Model extends SequelizeModel {
    public static associate(models: {}): void{}
}

export { Launch } from "./launch";
export { Rocket } from "./rocket";
