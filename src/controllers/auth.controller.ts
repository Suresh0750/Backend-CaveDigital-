import { Request, Response,NextFunction } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { HttpStatus } from "../utils/HttpStatusCode";
import { JWT_SECRET } from "../utils/constants";

// * Register   
export const register = async (req: Request, res: Response,next:NextFunction):Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(HttpStatus.Created).json({ message: "User registered successfully" });
  } catch (error) {
    next(error)
  }
};

// * Login
export const login = async (req: Request, res: Response,next:NextFunction):Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(HttpStatus.Unauthorized).json({ message: "Invalid credentials" });
            return
        }
        const token = jwt.sign({ userId: user._id }, String(JWT_SECRET()), { expiresIn: "1h" });
        res.json({ token });
        
    } catch (error) {
        next(error)
    }
};

// * Reset Password 
export const resetPassword = async (req: Request, res: Response,next:NextFunction):Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
        if (!user){  
            res.status(404).json({ message: "User not found" });
            return
        }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    await user.save();

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
    });

    await transporter.sendMail({
        to: email,
        subject: "Password Reset",
        text: `Use this token to reset your password: ${resetToken}`,
    });

    res.json({ message: "Reset token sent to email" });
  } catch (error) {
    next(error)
  }
};
