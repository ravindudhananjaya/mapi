import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, email, phone, address } = req.body;

        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: {
                name,
                email,
                phone,
                address,
            },
        });

        // Ensure profile exists based on role
        if (user.role === 'PROVIDER') {
            await prisma.providerProfile.upsert({
                where: { userId: user.id },
                create: { userId: user.id },
                update: {},
            });
        } else if (user.role === 'DRIVER') {
            await prisma.driverProfile.upsert({
                where: { userId: user.id },
                create: { userId: user.id },
                update: {},
            });
        }

        res.json(user);
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            include: {
                providerProfile: true,
                driverProfile: true,
            }
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(user);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
