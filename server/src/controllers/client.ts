import { Request, Response } from 'express';
import Client from '../models/client.model';

export const getAll = async (req: Request, res: Response) => {
  return await Client.findAll();
};

export const create = async (req: Request, res: Response) => {
  return await Client.create(req.body);
};

export const update = async (req: Request, res: Response) => {
  const client = await Client.findByPk(req.body.id);
  if (!client) {
    throw new Error('Client not found!');
  }

  return await client.update(req.body); 
};

export const deleteById = async (req: Request, res: Response) => {
  return !!(await Client.destroy({ where: { id: req.body.id } }));
};

export const getById = async (req: Request, res: Response) => {
  return await Client.findByPk(req.body.id);
};