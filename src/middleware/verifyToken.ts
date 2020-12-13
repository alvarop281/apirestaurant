import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload{
    _id: string,
    iat: number,
    exp: number
}

export function verifyToken(req: Request, res: Response, next: NextFunction){
    
    const token = req.header('auth-token');
    
    if(!token) return res.status(401).json({ error: 'Access denied'});

    try{
        const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'TOKEN_SECRET') as IPayload;
        req.userId = payload._id;
    } catch { };   

    next();
}