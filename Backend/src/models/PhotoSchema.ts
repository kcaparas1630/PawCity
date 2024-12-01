import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  filename: String,
  path: String,
});

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;
