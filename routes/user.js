import express from 'express';
import { getUsers, checkUser, authUser, createUser, updateUser, sendEmail } from '../controllers/user.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/check', checkUser);
router.post('/login', authUser);
router.post('/create', createUser);
router.post('/sendEmail', sendEmail);
router.patch('/:id', updateUser)

export default router;