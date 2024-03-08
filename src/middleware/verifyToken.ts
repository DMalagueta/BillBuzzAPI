// src/middleware/verifyToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
      userId?: string;
    }
  }
  
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Expecting "Bearer <token>"

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as any; // Use `as any` temporarily
        req.userId = decoded._id; // Attach the user ID to the request object
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};