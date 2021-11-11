import { Router, Request, Response } from 'express';
import { request } from 'http';
import * as companyTypeController from '../controllers/companyType.controller';

const companyTypeRouter = Router();

//TODO: don't pass req and res to controller
companyTypeRouter.get('/', async (req: Request, res: Response) => {
  const companyTypes = await companyTypeController.getAll(req, res);
  return res.status(200).send(companyTypes);
});

companyTypeRouter.get(':/id', async (req: Request, res: Response) => {
  const companyType = await companyTypeController.getById(req, res);
});

companyTypeRouter.post('/', async (req: Request, res: Response) => {
  const result = await companyTypeController.create(req, res);
  return res.status(200).send(result);
});

companyTypeRouter.put('/:id', async (req: Request, res: Response) => {
  const companyType = await companyTypeController.update(req, res);
  return res.status(200).send(companyType);
})

companyTypeRouter.delete('/:id', async (req: Request, res: Response) => {
  const result = await companyTypeController.deleteById(req, res);
  return res.status(200).send(result);
});

export default companyTypeRouter;