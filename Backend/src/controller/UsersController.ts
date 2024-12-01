import { Request, Response } from 'express';
import mongoose from 'mongoose';
const userModel = mongoose.model('User');

interface JWTPayload {
    id: string;
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userModel.find({})
            .select('-password')
            .sort({ _id: -1 })
            .lean()
            .exec();
        
        if (!users || users.length === 0) {
            res.status(200).json([]);
            return;
        }

        res.status(200).json(users);
    } catch (error: any) {
        console.error('Error in getUsers:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req.user as JWTPayload)?.id;

        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const user = await userModel.findById(userId)
            .select('-password')
            .lean()
            .exec();
        
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error: any) {
        console.error('Error in getCurrentUser:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export default {
    getUsers,
    getCurrentUser
};
