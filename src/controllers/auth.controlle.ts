import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Interface
import { IUser } from '../models/User/Entities/user.model';

// Model
import { createUser,
         findUserById,
         findUserByEmail } from '../models/User/Repositories/user.repo';


export async function sigin( req: Request, res: Response ){
    // Save request data
    const newUser: IUser = req.body;
    newUser['password'] = bcrypt.hashSync(req.body.password.toString(), 10);

    // Create a user
    const user: IUser = await createUser(newUser);

    // Token generate
    const token: string = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'TOKEN_SECRET', {
        expiresIn: 60 * 60 * 24 * 31
    });

    user.password = "";

    // Success response
    return res.json({
        message: 'User Created',
        user,
        token
    });
}


export async function profile( req: Request, res: Response ): Promise<Response>{

    // Model
    const user = await findUserById(req.userId);

    if(!user) return res.status(404).json({ errors: "No user found!" });

    // Success response
    return res.json(user);
}


export async function login(req: Request, res: Response){
    const email = req.body.email;

    // Model
    const user = await findUserByEmail(email);

    if( !user ) return res.status(400).json({ errors: "Invalid email and password!" });

    // Compare password
    const passCredential = user['password'];
    const isValid: boolean = await bcrypt.compare(req.body.password, passCredential)
    if(!isValid) return res.status(400).json({ errors: "Invalid email and password!" }); 

    // Create and return token
    const token: string = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET|| 'TOKEN_SECRET', {
        expiresIn: 60 * 60 * 24 * 31
    });

    user['password'] = "";

    // Success response
    return res.json({
        user,
        token
    });

}