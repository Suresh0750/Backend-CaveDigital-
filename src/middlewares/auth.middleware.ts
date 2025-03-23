import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../utils/HttpStatusCode";
import { AuthenticatedRequest } from "../utils/customRequest";


export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction):void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
     res.status(HttpStatus.Unauthorized).json({success: false, message: "Access denied" }); 
     return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.userId = decoded.userId;
    next(); // ✅ Call next() if successful
  } catch {
     res.status(HttpStatus.Unauthorized).json({success: false, message: "Invalid token" }); 
     return
  }
};
