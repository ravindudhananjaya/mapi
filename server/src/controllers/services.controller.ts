import { Request, Response } from 'express';
import { PrismaClient, ServiceType } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllServices = async (req: Request, res: Response): Promise<void> => {
    try {
        const { type } = req.query;
        const where = type ? { type: type as ServiceType } : {};

        const services = await prisma.service.findMany({
            where,
        });
        res.json(services);
    } catch (error) {
        console.error('Get services error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createService = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, price, type, features } = req.body;

        const service = await prisma.service.create({
            data: {
                title,
                description,
                price,
                type,
                features,
            },
        });

        res.status(201).json(service);
    } catch (error) {
        console.error('Create service error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
