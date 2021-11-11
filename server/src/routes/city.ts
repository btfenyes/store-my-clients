import { Router, Request, Response } from 'express';
import * as cityController from '../controllers/city.controller';
import City from '../models/city.model';

const cityRouter = Router();

const validateCity = (city: City) => {
  if (!city.name) {
    throw new Error('A név megadása kötelező!');
  }
};

//TODO: don't pass req and res to controller
cityRouter.get('/', async (req: Request, res: Response) => {
  const citys = await cityController.getAll(req, res);
  return res.status(200).send(citys);
});

cityRouter.get(':/id', async (req: Request, res: Response) => {
  const city = await cityController.getById(req, res);
});

cityRouter.post('/', async (req: Request, res: Response) => {
  const city = req.body;
  try {
    validateCity(city);
    const result = await cityController.create(req, res);
    return res.status(200).send(result);
  } catch (e) {
    return res.status(400).send(e);
  }
});

cityRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const city = req.body;
    validateCity(city);
    const result = await cityController.update(req, res);
    return res.status(200).send(result);
  } catch (e) {
    return res.status(400).send(e);
  }
})

cityRouter.delete('/:id', async (req: Request, res: Response) => {
  const result = await cityController.deleteById(req, res);
  return res.status(200).send(result);
});

export default cityRouter;