import mongoose, { Schema } from 'mongoose';
import argon2 from 'argon2';
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
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
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

UserSchema.pre('save', async function() {
    // hash and salt password
    try {
        const hash = await argon2.hash(this.password, {
            type: argon2.argon2id
        });
        this.password = hash;
    } catch (err: any) {
        console.log('Error in hashing password' + err);
    }
})

const User = mongoose.model('User', UserSchema, 'Users');

export default User;
