import { Request, Response } from 'express';
import { PrismaClient, BookingStatus } from '@prisma/client';

const prisma = new PrismaClient();

// In a real app, we would get userId from the authenticated token
// For now, we'll accept userId in the body for simplicity or extract from header if middleware was fully set up
// I'll assume we pass userId in body for this iteration, or implement a middleware later

export const createBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, serviceId, date, notes } = req.body;

        const booking = await prisma.booking.create({
            data: {
                userId: Number(userId),
                serviceId: Number(serviceId),
                date: new Date(date),
                notes,
                status: 'PENDING',
            },
            include: {
                service: true,
                user: true,
            },
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getBookings = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, providerUserId, driverUserId, status } = req.query;

        const where: any = {};
        if (userId) where.userId = Number(userId);
        if (status) where.status = status as BookingStatus;

        // If providerUserId is passed, we need to find the provider profile first
        if (providerUserId) {
            const providerProfile = await prisma.providerProfile.findUnique({
                where: { userId: Number(providerUserId) }
            });

            if (providerProfile) {
                where.providerId = providerProfile.id;
            } else {
                res.json([]);
                return;
            }
        }

        // If driverUserId is passed, we need to find the driver profile first
        if (driverUserId) {
            const driverProfile = await prisma.driverProfile.findUnique({
                where: { userId: Number(driverUserId) }
            });

            if (driverProfile) {
                where.driverId = driverProfile.id;
            } else {
                res.json([]);
                return;
            }
        }

        const bookings = await prisma.booking.findMany({
            where,
            include: {
                service: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        address: true,
                        phone: true,
                    }
                },
                provider: {
                    include: {
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                driver: {
                    include: {
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                date: 'desc',
            },
        });

        res.json(bookings);
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status, providerId, driverId } = req.body;

        const data: any = {};
        if (status) data.status = status as BookingStatus;
        if (providerId) data.providerId = Number(providerId);
        if (driverId) data.driverId = Number(driverId);

        const booking = await prisma.booking.update({
            where: { id: Number(id) },
            data,
        });

        res.json(booking);
    } catch (error) {
        console.error('Update booking error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
