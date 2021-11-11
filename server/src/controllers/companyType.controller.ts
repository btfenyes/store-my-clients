import { Request, Response } from 'express';
import CompanyType from '../models/companyType.model';

export const getAll = async (req: Request, res: Response) => {
  return await CompanyType.findAll();
};

export const create = async (req: Request, res: Response) => {
  return await CompanyType.create(req.body);
};

export const update = async (req: Request, res: Response) => {
  const companyType = await CompanyType.findByPk(req.body.id);
  if (!companyType) {
    throw new Error('CompanyType not found!');
  }

  return await companyType.update(req.body); 
};

export const deleteById = async (req: Request, res: Response) => {
  return !!(await CompanyType.destroy({ where: { id: req.body.id } }));
};

export const getById = async (req: Request, res: Response) => {
  return await CompanyType.findByPk(req.body.id);
};