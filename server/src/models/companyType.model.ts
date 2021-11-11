import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database/database';
import Client from './client.model';

interface CompanyTypeAttributes {
  id: number,
  name: string,
}

export interface CompanyTypeInput extends Optional<CompanyTypeAttributes, 'id'> {}
export interface CompanyTypeOutput extends Required<CompanyTypeAttributes> {}

class CompanyType extends Model<CompanyTypeAttributes, CompanyTypeInput> implements CompanyTypeAttributes {
  public id!: number;
  public name!: string;
}

CompanyType.init({
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

export default CompanyType;