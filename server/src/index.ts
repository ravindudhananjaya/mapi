import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';
import serviceRoutes from './routes/services.routes';
import bookingRoutes from './routes/bookings.routes';
import usersRoutes from './routes/users.routes';

import analyticsRoutes from './routes/analytics.routes';
import reportsRoutes from './routes/reports.routes';
import paymentRoutes from './routes/payments.routes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/api/db-check', async (req: Request, res: Response) => {
    try {
        await prisma.$connect();
        res.json({ status: 'ok', message: 'Database connected successfully' });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ status: 'error', message: 'Failed to connect to database', error: String(error) });
    } finally {
        await prisma.$disconnect();
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
