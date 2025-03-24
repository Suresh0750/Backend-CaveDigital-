import { Request, Response,NextFunction } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../utils/HttpStatusCode";
import { JWT_SECRET } from "../utils/constants";

// * Register   
export const register = async (req: Request, res: Response,next:NextFunction):Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(HttpStatus.BadRequest).json({ success: false, message: "User already exists" });
        return
    } 

    const user = await User.create({ name, email, password: hashedPassword });
    

    res.status(HttpStatus.Created).json({success: true, message: "User registered successfully",user });
  } catch (error) {
    next( error)
  }
};

// * Login
export const login = async (req: Request, res: Response,next:NextFunction):Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, user?.password || "");
        console.log(isPasswordValid,"isPasswordValid")
        if (!user || !isPasswordValid) {
            res.status(HttpStatus.Unauthorized).json({success: false, message: "Invalid credentials" });
            return
        }
        const token = jwt.sign({ userId: user._id }, String(JWT_SECRET()), { expiresIn: "1h" });
        res.status(HttpStatus.Success).json({ success: true, message: "User logged in successfully", token });
        
    } catch (error) {
        next(error)
    }
};
