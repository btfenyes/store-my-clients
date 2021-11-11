import { Request, Response } from 'express';
import City from '../models/city.model';

export const getAll = async (req: Request, res: Response) => {
  return await City.findAll();
};

export const create = async (req: Request, res: Response) => {
  return await City.create(req.body);
};

export const update = async (req: Request, res: Response) => {
  const city = await City.findByPk(req.params.id);
  if (!city) {
    throw new Error('CompanyType not found!');
  }

  return await city.update(req.body); 
};

export const deleteById = async (req: Request, res: Response) => {
  return !!(await City.destroy({ where: { id: req.params.id } }));
};

export const getById = async (req: Request, res: Response) => {
  return await City.findByPk(req.params.id);
};