import { Router } from 'express';
import { updateUser, getUserProfile } from '../controllers/users.controller';

const router = Router();

router.patch('/:id', updateUser);
router.get('/:id', getUserProfile);

export default router;
