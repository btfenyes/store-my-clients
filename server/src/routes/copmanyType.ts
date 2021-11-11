import { Router, Request, Response } from 'express';
import { request } from 'http';
import * as companyTypeController from '../controllers/companyType.controller';
import CompanyType from '../models/companyType.model';

const companyTypeRouter = Router();

const validateCompanyType = (companyType: CompanyType) => {
  if (!companyType.name) {
    throw new Error('A név megadása kötelező!');
  }
}

//TODO: don't pass req and res to controller
companyTypeRouter.get('/', async (req: Request, res: Response) => {
  const companyTypes = await companyTypeController.getAll(req, res);
  return res.status(200).send(companyTypes);
});

companyTypeRouter.get(':/id', async (req: Request, res: Response) => {
  const companyType = await companyTypeController.getById(req, res);
});

companyTypeRouter.post('/', async (req: Request, res: Response) => {
  const copmanyType = req.body;
  try {
    validateCompanyType(copmanyType);
    const result = await companyTypeController.create(req, res);
    return res.status(200).send(result);
  } catch (e) {
    return res.status(400).send(e);
  }
});

companyTypeRouter.put('/:id', async (req: Request, res: Response) => {
  const copmanyType = req.body;
  try {
    validateCompanyType(copmanyType);
    const result = await companyTypeController.update(req, res);
    return res.status(200).send(result);
  } catch (e) {
    return res.status(400).send(e);
  }
})

companyTypeRouter.delete('/:id', async (req: Request, res: Response) => {
  const result = await companyTypeController.deleteById(req, res);
  return res.status(200).send(result);
});

export default companyTypeRouter;