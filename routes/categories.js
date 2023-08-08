import express from 'express';
import { getCategories, updateCategories } from '../controllers/categories.js';

const router = express.Router();

router.get('/', getCategories);
router.patch('/:id', updateCategories)

export default router;