import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction):void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
     res.status(401).json({ message: "Access denied" }); 
     return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.userId = decoded.userId;
    next(); // ✅ Call next() if successful
  } catch {
     res.status(401).json({ message: "Invalid token" }); 
     return
  }
};
