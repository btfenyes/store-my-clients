import { Request, Response } from 'express';
import Client from '../models/client.model';
import City from '../models/city.model';
import CompanyType from '../models/companyType.model';

interface UserRequest {
  City?: string;
  CompanyType?: string;
}

const validate = (client: Client & UserRequest) => {
  if (!client.name) {
    throw new Error('A név megadása kötelező!');
  }

  if (!client.CityId && !client.City) {
    throw new Error('A település megadása kötelező!');
  }
};

const handleNewCity = async (client: Client & UserRequest) => {
  if (!client.City) {
    return client;
  }

  let city = await City.findOne({ where: { name: client.City } });
  if (!city) {
    city = await City.create({ name: client.City });
  }
  
  client.CityId = city.id;
  return client;
};

const handleNewCompanyType = async (client: Client & UserRequest) => {
  if (!client.CompanyType) {
    return client;
  }

  let companyType = await CompanyType.findOne({ where: { name: client.CompanyType } });
  console.log(companyType)
  if (!companyType) {
    companyType = await CompanyType.create({ name: client.CompanyType });
  }
  
  client.CompanyTypeId = companyType.id;
  return client;
};

export const getAll = async (req: Request, res: Response) => {
  return await Client.findAll({include: [City, CompanyType]});
};

export const create = async (req: Request, res: Response) => {
  let client = req.body;
  validate(client);
  client = await handleNewCity(client);
  client = await handleNewCompanyType(client);
  return await Client.create(client);
};

export const update = async (req: Request, res: Response) => {
  let client = req.body;
  console.log(client)
  validate(client);
  client = await handleNewCity(client);
  client = await handleNewCompanyType(client);
  console.log(client)
  return await Client.update(client, { where: { id: +req.params.id } }); 
};

export const deleteById = async (req: Request, res: Response) => {
  return !!(await Client.destroy({ where: { id: req.params.id } }));
};

export const getById = async (req: Request, res: Response) => {
  return await Client.findByPk(req.params.id, {include: [City, CompanyType]});
};