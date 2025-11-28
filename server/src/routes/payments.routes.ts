import express from 'express';
import { createCheckoutSession } from '../controllers/payments.controller';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);

export default router;
