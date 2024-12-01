import { Request, Response } from 'express';
import mongoose from 'mongoose';
const userModel = mongoose.model('User');

interface JWTPayload {
    id: string;
}

interface User {
    _id: string;
    matches: Array<{
        _id: string;
        userId: {
            _id: string;
            firstName: string;
            dogs: {
                name: string;
                age: number;
                breed: string;
                photos?: string[];
            };
        };
        isMatched: boolean;
    }>;
}

export const createMatch = async (req: Request, res: Response): Promise<void> => {
    try {
        const currentUserId = (req.user as JWTPayload)?.id;
        const targetUserId = req.params.userId;

        // Add match to current user's matches
        await userModel.findByIdAndUpdate(currentUserId, {
            $addToSet: { matches: { userId: targetUserId } }
        });

        res.status(201).json({ message: 'Match created' });
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMatches = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req.user as JWTPayload)?.id;
        
        const user = (await userModel.findById(userId)
            .populate('matches.userId', 'firstName dogs.name dogs.photos')
            .lean()) as unknown as User;

        const matches = user?.matches.map(match => ({
            id: match._id,
            userId: match.userId._id,
            firstName: match.userId.firstName,
            dogName: match.userId.dogs.name,
            dogAge: match.userId.dogs.age,
            dogBreed: match.userId.dogs.breed,
            dogPhoto: match.userId.dogs.photos?.[0],
            isMatched: match.isMatched
        })) || [];

        res.status(200).json(matches);
    } catch (error) {
        console.error('Error getting matches:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const toggleMatch = async (req: Request, res: Response): Promise<void> => {
    try {
        const currentUserId = (req.user as JWTPayload)?.id;
        const matchId = req.params.matchId;
        const { isMatched } = req.body;

        const user = await userModel.findOneAndUpdate(
            { 
                _id: currentUserId,
                'matches._id': matchId 
            },
            { 
                $set: { 'matches.$.isMatched': isMatched }
            },
            { new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'Match not found' });
            return;
        }

        res.status(200).json({ message: 'Match updated successfully' });
    } catch (error) {
        console.error('Error toggling match:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
