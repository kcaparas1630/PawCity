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


const  alreadyExists = async (email: string) => {
    const exists = await userModel.exists({email: email})
    console.log('Exists check result:', exists);
    return exists !== null;
}

const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        // checks if email already exists
         const exists = await alreadyExists(email);
        
        if (exists) {
            res.status(403).send('User with this email already exists');
            return;
        }

        let users = await userModel.create(req.body);
        res.status(201).send(users);
    } catch (error: any) {
        res.status(400).send('Bad Request. Missing body');
    }
}
export { getUsers, registerUser };
