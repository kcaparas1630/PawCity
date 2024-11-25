import { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const userModel = mongoose.model("User");

const alreadyExists = async (email: string) => {
  const exists = await userModel.exists({ email: email });
  console.log("Exists check result:", exists);
  return exists !== null;
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // checks if email already exists
    const exists = await alreadyExists(email);

    if (exists) {
      res.status(403).send("User with this email already exists");
      return;
    }

    let users = await userModel.create(req.body);
    res.status(201).send(users);
  } catch (error: any) {
    res.status(400).send("Bad Request. Missing body");
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
