import mongoose, { Schema } from "mongoose";

const DogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
  },
  quirks: { type: String },
  photos: [{ 
    type: String,
    required: false
  }],
});

DogSchema.set("toJSON", {
  versionKey: false,
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    if (ret.photos) {
      ret.photos = ret.photos.map((filename: any) => 
        filename.toString()
      );
    }
  },
});

export default DogSchema;
