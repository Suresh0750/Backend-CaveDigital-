import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("error",err?.message);
  res.status(err.status || 500).json({sucess:false, message: err?.message || "Internal Server Error" });
};
