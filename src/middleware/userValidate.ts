import { Request, Response, NextFunction } from 'express';

// Models
import { findUserById } from '../models/User/Repositories/user.repo';

export async function userValidate(req:Request, res:Response, next:NextFunction){
    
    const user = await findUserById(req.userId);
    if( !user ) return res.status(404).json({ errors: "User not found" });

    next();
}