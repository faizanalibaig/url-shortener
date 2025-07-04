import { Router } from 'express';
import {
  create,
  redirect,
  getStats,
  deleteUrl,
  update,
  retrieve,
} from './shortener.controller.js';

const router = Router();

router.post('/create', create);
router.get('/stats/:shortUrl', getStats);
router.get('/:shortUrl', redirect);
router.delete('/:shortUrl', deleteUrl);
router.patch('/:shortUrl', update);
router.post('/update/:shortUrl', retrieve);

export { router };
