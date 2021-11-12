import { Router, Request, Response } from 'express';
import * as clientController from '../controllers/client.controller';

const clientRouter = Router();

clientRouter.get('/', async (req: Request, res: Response) => {
  const clients = await clientController.getAll(req, res);
  return res.status(200).send(clients);
});

clientRouter.post('/', async (req: Request, res: Response) => {
  try {
    const result = await clientController.create(req, res);
    return res.status(200).send(result);
  } catch (e) {
    console.log(e);
    return res.status(400).send((e as Error).message);
  }
});

clientRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const result = await clientController.update(req, res);
    return res.status(200).send(result);
  } catch (e) {
    console.log(e);
    return res.status(400).send((e as Error).message);
  }
})

clientRouter.delete('/:id', async (req: Request, res: Response) => {
  const result = await clientController.deleteById(req, res);
  return res.status(200).send(result);
});

export default clientRouter;