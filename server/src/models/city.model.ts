import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database/database';
import Client from './client.model';

interface CityAttributes {
  id: number,
  name: string,
}

export interface CityInput extends Optional<CityAttributes, 'id'> {}
export interface CityOutput extends Required<CityAttributes> {}

class City extends Model<CityAttributes, CityInput> implements CityAttributes {
  public id!: number;
  public name!: string;
}

City.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }, 
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: false,
  paranoid: false,
});

export default City;