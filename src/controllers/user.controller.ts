import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { IUser } from '../models/User/Entities/user.model';

// Models
import { findUserByDni, updateAUser } from '../models/User/Repositories/user.repo';

export async function updateUser( req: Request, res: Response ){
    const updateUser: IUser = req.body;
    const userId = req.userId;

    if( updateUser.password ) {
        updateUser.password = bcrypt.hashSync(req.body.password.toString(), 10);
    }

    if( updateUser.dni ){ 
        const verifyDni = await findUserByDni( updateUser.dni );
        if( verifyDni ) return res.status(400).json({ message: 'Dni was used'});
    }
    
    await updateAUser( userId, updateUser );

    return res.json({ message: 'User Updated'});
}