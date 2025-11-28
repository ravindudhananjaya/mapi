import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-02-24.acacia' as any, // Cast to any to avoid type mismatch if library definitions are out of sync
});

export const createCheckoutSession = async (req: Request, res: Response): Promise<void> => {
    try {
        const { items, successUrl, cancelUrl, userEmail } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            res.status(400).json({ message: 'Items are required' });
            return;
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map((item: any) => ({
                price_data: {
                    currency: 'npr', // Or usd, depending on requirement. Assuming NPR for Nepal context or USD if Stripe doesn't support NPR directly in all cases (it does support many currencies). Let's stick to what user might want.
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100, // Amount in cents/paisa
                },
                quantity: item.quantity || 1,
            })),
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            customer_email: userEmail,
        });

        res.json({ id: session.id, url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};
