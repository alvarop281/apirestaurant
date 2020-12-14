import { Request, Response, NextFunction } from 'express';

// Models
import { findUserById } from '../models/User/Repositories/user.repo';

export async function adminValidate(req:Request, res:Response, next:NextFunction){
    
    const user = await findUserById(req.userId);
    if( !user ) return res.status(404).json({ errors: "User not found" });

    if( user.type_of_user === 'buyer' ) return res.status(401).json({ errors: "Unauthorized access" });

    next();
}