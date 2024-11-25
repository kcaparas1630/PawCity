import mongoose, { Schema } from 'mongoose';

const DogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    bio: {
        type: String
    },
    quirks: { type: [String] },
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }] // Reference photo
});

DogSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id; }
});

export default DogSchema;
