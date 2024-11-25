import { Request, Response } from 'express';
import mongoose from 'mongoose';
const userModel = mongoose.model('User');

const getUsers = async (req: Request, res: Response) => {
    try {
        let users = await userModel.find( {} , '', {sort: { _id: -1 }}).exec();
        res.status(200).send(users);
    } catch (error: any) {
        res.status(400).send('Bad Request');
    }
}

export default getUsers;
