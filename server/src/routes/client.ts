import { Router, Request, Response } from 'express';
import { request } from 'http';
import * as clientController from '../controllers/client';

const clientRouter = Router();

//TODO: don't pass req and res to controller
clientRouter.get('/', async (req: Request, res: Response) => {
  const clients = await clientController.getAll(req, res);
  return res.status(200).send(clients);
});

clientRouter.get(':/id', async (req: Request, res: Response) => {
  const client = await clientController.getById(req, res);
});

clientRouter.post('/', async (req: Request, res: Response) => {
  const result = await clientController.create(req, res);
  return res.status(200).send(result);
});

clientRouter.put('/:id', async (req: Request, res: Response) => {
  const client = await clientController.update(req, res);
  return res.status(200).send(client);
})

clientRouter.delete('/:id', async (req: Request, res: Response) => {
  const result = await clientController.deleteById(req, res);
  return res.status(200).send(result);
});

export default clientRouter;