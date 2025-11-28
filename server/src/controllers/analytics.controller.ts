import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
        // 1. Revenue Calculation
        const bookings = await prisma.booking.findMany({
            include: { service: true }
        });

        let totalRevenue = 0;
        const revenueByPlan: Record<string, number> = {};
        const serviceUsage: Record<string, number> = {};

        bookings.forEach(booking => {
            if (booking.service) {
                // Price is Decimal, convert to number
                const price = booking.service.price.toNumber();

                totalRevenue += price;

                // Revenue by Plan (Service Title)
                if (revenueByPlan[booking.service.title]) {
                    revenueByPlan[booking.service.title] += price;
                } else {
                    revenueByPlan[booking.service.title] = price;
                }

                // Service Usage
                if (serviceUsage[booking.service.title]) {
                    serviceUsage[booking.service.title]++;
                } else {
                    serviceUsage[booking.service.title] = 1;
                }
            }
        });

        // Format Revenue by Plan for Frontend
        const revenueByPlanData = Object.keys(revenueByPlan).map(plan => ({
            name: plan,
            value: Math.round((revenueByPlan[plan] / totalRevenue) * 100) || 0,
            amount: `NPR ${(revenueByPlan[plan] / 1000).toFixed(1)}K`,
            color: 'bg-blue-500' // Dynamic colors can be handled in frontend or here
        }));

        // Format Service Usage for Frontend
        const totalBookings = bookings.length;
        const serviceUsageData = Object.keys(serviceUsage).map(service => ({
            name: service,
            value: Math.round((serviceUsage[service] / totalBookings) * 100) || 0,
            color: 'bg-orange-500'
        }));

        // 2. System Health (Mocked for now)
        const systemHealth = [
            { name: 'Server Load', value: 42, status: 'Healthy', color: 'text-green-600' },
            { name: 'Database Usage', value: 68, status: 'Moderate', color: 'text-yellow-600' },
            { name: 'Memory Usage', value: 35, status: 'Healthy', color: 'text-green-600' },
        ];

        // 3. Recommendations (Mocked logic based on data)
        const recommendations = [
            { type: 'growth', message: 'Promote "Premium Care" plan to increase revenue margin.', impact: 'High', color: 'text-purple-600', bg: 'bg-purple-100' },
            { type: 'staffing', message: 'Hire more drivers for evening shifts.', impact: 'Medium', color: 'text-orange-600', bg: 'bg-orange-100' },
            { type: 'system', message: 'Optimize database queries.', impact: 'Low', color: 'text-blue-600', bg: 'bg-blue-100' },
        ];

        res.json({
            revenueByPlan: revenueByPlanData,
            serviceUsage: serviceUsageData,
            systemHealth,
            recommendations,
            totalRevenue,
            totalBookings
        });

    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
