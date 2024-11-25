import mongoose, { Schema } from 'mongoose';
import DogSchema from './DogSchema';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 128,
        // 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number
        match: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>\?])/
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    dogs: {
        type: [DogSchema], // Array of Dogs
        required: true,
        validate: [(array: any[]) => array.length > 0, 'At least one dog is required']
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
});

UserSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id; }
});

const User = mongoose.model('User', UserSchema, 'Users');

export default User;
