import { Router } from 'express';
import { ADMISION } from '../data/programa.data.js';

export const admisionRouter = Router();

/** GET /api/admision — RF-06 */
admisionRouter.get('/', (_req, res) => {
  res.json(ADMISION);
});
