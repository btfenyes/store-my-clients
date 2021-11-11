import { Router, Request, Response } from 'express';
import * as cityController from '../controllers/city.controller';

const cityRouter = Router();

//TODO: don't pass req and res to controller
cityRouter.get('/', async (req: Request, res: Response) => {
  const citys = await cityController.getAll(req, res);
  return res.status(200).send(citys);
});

cityRouter.get(':/id', async (req: Request, res: Response) => {
  const city = await cityController.getById(req, res);
});

cityRouter.post('/', async (req: Request, res: Response) => {
  const result = await cityController.create(req, res);
  return res.status(200).send(result);
});

cityRouter.put('/:id', async (req: Request, res: Response) => {
  const city = await cityController.update(req, res);
  return res.status(200).send(city);
})

cityRouter.delete('/:id', async (req: Request, res: Response) => {
  const result = await cityController.deleteById(req, res);
  return res.status(200).send(result);
});

export default cityRouter;