import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database/database';
import City from './city.model';
import CompanyType from './companyType.model';

interface ClientAttributes {
  id: number,
  name: string,
  taxNumber?: string,
  companyRegistrationNumber?: string,
  address?: string,
  phone?: string,
  bankAccount?: string,
  comment?: string,
  CityId?: number,
  CompanyTypeId?: number,
}

export interface ClientInput extends Optional<ClientAttributes, 'id'> {}
export interface ClientOutput extends Required<ClientAttributes> {}

class Client extends Model<ClientAttributes, ClientInput> implements ClientAttributes {
  public id!: number;
  public name!: string;
  public taxNumber!: string;
  public companyRegistrationNumber!: string;
  public address!: string;
  public phone!: string;
  public bankAccount!: string;
  public comment!: string;
  public CityId!: number;
  public CompanyTypeId!: number;
}

Client.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }, 
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taxNumber: {
    type: DataTypes.STRING,
  },
  companyRegistrationNumber: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  bankAccount: {
    type: DataTypes.STRING,
  },
  comment: {
    type: DataTypes.STRING,
  },
  CityId: {
    type: DataTypes.INTEGER,
  },
  CompanyTypeId: {
    type: DataTypes.INTEGER,
  }
}, {
  sequelize,
  timestamps: true,
  paranoid: true,
});

Client.belongsTo(CompanyType);
Client.belongsTo(City);

export default Client;