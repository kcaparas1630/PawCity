import { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import multer from 'multer';
import path from 'path';

dotenv.config();

const userModel = mongoose.model("User");

const alreadyExists = async (email: string) => {
  const exists = await userModel.exists({ email: email });
  console.log("Exists check result:", exists);
  return exists !== null;
};



const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.status(400).send('Password must match');
      return;
    }

    const exists = await alreadyExists(email);

    if (exists) {
      res.status(403).send("User with this email already exists");
      return;
    }

    // Add profile picture path to user data if file was uploaded
    const userData = {
      ...req.body,
      profilePicture: req.file ? `/uploads/profile-pictures/${req.file.filename}` : undefined
    };

    let user = await userModel.create(userData);
    
    // Transform the response to ensure photos are in the correct format
    const transformedUser = user.toJSON();
    if (transformedUser.dogs && transformedUser.dogs.photos) {
      transformedUser.dogs.photos = transformedUser.dogs.photos.map(
        (photo: any) => photo.toString()
      );
    }
    
    res.status(201).send(transformedUser);
  } catch (error: any) {
    res.status(400).send(error.message || "Bad Request. Missing body");
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
      if (!process.env.JWT_SECRET) {
          res.status(500).send("Server configuration error");
          return;
      }

      const { email, password } = req.body;
      
      // Find user by email
      const user = await userModel.findOne({ email });
      
      if (!user) {
          res.status(401).send("Invalid email or password");
          return;
      }

      const isValidPassword = await user.verifyPassword(password);
      
      if (!isValidPassword) {
          res.status(401).send("Invalid email or password");
          return;
      }

      const token = jwt.sign(
          { 
              sub: user._id,
              email: user.email 
          },
          process.env.JWT_SECRET,
          { expiresIn: "20m" }
      );
      
      res.status(200).json({ token });
  } catch (error) {
      res.status(400).send("Bad Request. Couldn't generate token.");
  }
};

export { registerUser, loginUser };
