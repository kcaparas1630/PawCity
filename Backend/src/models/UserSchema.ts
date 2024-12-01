import mongoose, { Schema } from 'mongoose';
import argon2 from 'argon2';
import DogSchema from './DogSchema';
import LocationSchema from './LocationSchema';

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
        minLength: 8,
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
        type: LocationSchema,
        required: true
    },
    dogs: {
        type: DogSchema,
        required: true,
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    matches: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        isMatched: { type: Boolean, default: false }
    }],
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
});

UserSchema.methods.verifyPassword = 
    async function(plainTextPassword:string) {
        const dbHashedPassword = this.password;
        try {
            return await argon2.verify(dbHashedPassword, plainTextPassword);
        } catch (err: any) {
            console.log('Error verifying password' + err);
        }
    }

const User = mongoose.model('User', UserSchema, 'Users');

export default User;
