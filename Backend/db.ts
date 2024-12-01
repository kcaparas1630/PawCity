import mongoose, { mongo } from "mongoose";
import './src/models/UserSchema';
import './src/models/DogSchema';
import dotenv from 'dotenv';

dotenv.config();

const dbUri: string = process.env.DBURI!;

if (!dbUri) {
    console.error('DBURI is not defined. Please check your .env file.');
    process.exit(1);
}


async function connectDB() {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(dbUri);
        console.log('Successfully connected to PawCity database');

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('Mongoose connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
export default connectDB;
