import express from 'express';
import { getBanner, updateBanner } from '../controllers/banner.js';

const router = express.Router();

router.get('/', getBanner);
router.patch('/:id', updateBanner)

export default router;